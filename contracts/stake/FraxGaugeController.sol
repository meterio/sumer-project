// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.19;

struct Point {
  uint256 bias;
  uint256 slope;
}

struct CorrectedPoint {
  uint256 bias;
  uint256 slope;
  uint256 lock_end;
  uint256 fxs_amount;
}

struct VotedSlope {
  uint256 slope;
  uint256 power;
  uint256 end;
}

struct LockedBalance {
  int128 amount;
  uint256 end;
}

interface VotingEscrow {
  function balanceOf(address addr) external view returns (uint256);

  function locked__end(address addr) external view returns (uint256);

  function locked(address addr) external view returns (LockedBalance memory);
}

contract FraxGaugeController {
  uint256 public constant WEEK = 7 days;
  uint256 public constant WEIGHT_VOTE_DELAY = 10 * 86400;
  uint256 public constant MULTIPLIER = 10 ** 18;

  event CommitOwnership(address admin);
  event ApplyOwnership(address admin);
  event AddType(string name, int128 type_id);
  event NewTypeWeight(int128 type_id, uint256 time, uint256 weight, uint256 total_weight);
  event NewGaugeWeight(address gauge_address, uint256 time, uint256 weight, uint256 total_weight);
  event VoteForGauge(uint256 time, address user, address gauge_addr, uint256 weight);
  event NewGauge(address addr, int128 gauge_type, uint256 weight);

  address public admin;
  address public future_admin;
  address public token;
  address public voting_escrow;

  int128 public n_gauge_types = 1;
  int128 public n_gauges;
  uint256 public time_total;
  uint256 public global_emission_rate = 1e18;

  address[1000000000] public gauges;
  uint256[1000000000] public time_sum;
  uint256[1000000000] public time_type_weight;

  mapping(address => int128) public gauge_types_;
  mapping(address => uint256) public vote_user_power;
  mapping(address => uint256) public time_weight;
  mapping(uint256 => uint256) public points_total;
  mapping(int128 => string) public gauge_type_names;
  mapping(address => mapping(uint256 => uint256)) public changes_weight;
  mapping(address => mapping(address => uint256)) public last_user_vote;
  mapping(int128 => mapping(uint256 => uint256)) public changes_sum;
  mapping(int128 => mapping(uint256 => uint256)) public points_type_weight;
  mapping(address => mapping(uint256 => Point)) public points_weight;
  mapping(int128 => mapping(uint256 => Point)) public points_sum;
  mapping(address => mapping(address => VotedSlope)) public vote_user_slopes;

  constructor(address _token, address _voting_escrow) {
    require(_token != address(0), '!_token');
    require(_voting_escrow != address(0), '!_voting_escrow');

    admin = msg.sender;
    token = _token;
    voting_escrow = _voting_escrow;
    time_total = (block.timestamp / WEEK) * WEEK;
  }

  modifier onlyAdmin() {
    require(admin == msg.sender, 'only admin');
    _;
  }

  function commit_transfer_ownership(address addr) external onlyAdmin {
    future_admin = addr;
    emit CommitOwnership(addr);
  }

  function apply_transfer_ownership() external onlyAdmin {
    address _admin = future_admin;
    require(_admin != address(0), '!future_admin');
    admin = _admin;
    emit ApplyOwnership(admin);
  }

  function _get_corrected_info(address addr) internal view returns (CorrectedPoint memory) {
    address escrow = voting_escrow;
    uint256 veSumer_balance = VotingEscrow(escrow).balanceOf(addr);
    LockedBalance memory locked_balance = VotingEscrow(escrow).locked(addr);
    uint256 locked_end = locked_balance.end;
    uint256 locked_sumer = uint128(locked_balance.amount);

    uint256 corrected_slope;
    if (locked_end > block.timestamp) {
      corrected_slope = veSumer_balance / (locked_end - block.timestamp);
    }

    return
      CorrectedPoint({bias: veSumer_balance, slope: corrected_slope, lock_end: locked_end, fxs_amount: locked_sumer});
  }

  function get_corrected_info(address addr) external view returns (CorrectedPoint memory) {
    return _get_corrected_info(addr);
  }

  function gauge_types(address _addr) external view returns (int128) {
    int128 gauge_type = gauge_types_[_addr];
    require(gauge_type != 0, '!gauge_type');
    return gauge_type - 1;
  }

  function _get_type_weight(int128 gauge_type) internal returns (uint256) {
    uint256 t = time_type_weight[uint128(gauge_type)];
    if (t > 0) {
      uint256 w = points_type_weight[gauge_type][t];
      for (uint256 i; i < 500; ++i) {
        if (t > block.timestamp) break;
        t += WEEK;
        points_type_weight[gauge_type][t] = w;
        if (t > block.timestamp) {
          time_type_weight[uint128(gauge_type)] = t;
        }
      }
      return w;
    } else {
      return 0;
    }
  }

  function _get_sum(int128 gauge_type) internal returns (uint256) {
    uint256 t = time_sum[uint128(gauge_type)];
    if (t > 0) {
      Point memory pt = points_sum[gauge_type][t];
      for (uint256 i; i < 500; ++i) {
        if (t > block.timestamp) break;
        t += WEEK;
        uint256 d_bias = pt.slope * WEEK;
        if (pt.bias > d_bias) {
          pt.bias -= d_bias;
          uint256 d_slope = changes_sum[gauge_type][t];
          pt.slope -= d_slope;
        } else {
          pt.bias = 0;
          pt.slope = 0;
        }
        points_sum[gauge_type][t] = pt;
        if (t > block.timestamp) {
          time_sum[uint128(gauge_type)] = t;
        }
      }
      return pt.bias;
    } else {
      return 0;
    }
  }

  function _get_total() internal returns (uint256) {
    uint256 t = time_total;
    int128 _n_gauge_types = n_gauge_types;

    if (t > block.timestamp) {
      t -= WEEK;
    }
    uint256 pt = points_total[t];

    for (int128 gauge_type; gauge_type < 100; ++gauge_type) {
      if (gauge_type == _n_gauge_types) break;
      _get_sum(gauge_type);
      _get_type_weight(gauge_type);
    }
    for (uint256 i; i < 500; ++i) {
      if (t > block.timestamp) break;
      t += WEEK;
      pt = 0;
      for (int128 gauge_type; gauge_type < 100; ++gauge_type) {
        if (gauge_type == _n_gauge_types) break;
        uint256 type_sum = points_sum[gauge_type][t].bias;
        uint256 type_weight = points_type_weight[gauge_type][t];
        pt += type_sum * type_weight;
      }
      points_total[t] = pt;
      if (t > block.timestamp) time_total = t;
    }
    return pt;
  }

  function _get_weight(address gauge_addr) internal returns (uint256) {
    uint256 t = time_weight[gauge_addr];
    if (t > 0) {
      Point memory pt = points_weight[gauge_addr][t];
      for (uint256 i; i < 500; ++i) {
        if (t > block.timestamp) break;
        t += WEEK;
        uint256 d_bias = pt.slope * WEEK;
        if (pt.bias > d_bias) {
          pt.bias -= d_bias;
          uint256 d_slope = changes_weight[gauge_addr][t];
          pt.slope -= d_slope;
        } else {
          pt.bias = 0;
          pt.slope = 0;
        }
        points_weight[gauge_addr][t] = pt;
        if (t > block.timestamp) time_weight[gauge_addr] = t;
      }
      return pt.bias;
    } else {
      return 0;
    }
  }

  function add_gauge(address addr, int128 gauge_type, uint256 weight) external onlyAdmin {
    require(weight >= 0, '!weight');
    require(gauge_type >= 0 && gauge_type < n_gauge_types, '!gauge_type');
    require(gauge_types_[addr] == 0, '!gauge_types');

    int128 n = n_gauges;
    n_gauges = n + 1;
    gauges[uint128(n)] = addr;

    gauge_types_[addr] = gauge_type + 1;
    uint256 next_time = ((block.timestamp + WEEK) / WEEK) * WEEK;

    if (weight > 0) {
      uint256 _type_weight = _get_type_weight(gauge_type);
      uint256 _old_sum = _get_sum(gauge_type);
      uint256 _old_total = _get_total();

      points_sum[gauge_type][next_time].bias = weight + _old_sum;
      time_sum[uint128(gauge_type)] = next_time;
      points_total[next_time] = _old_total + _type_weight * weight;
      time_total = next_time;
      points_weight[addr][next_time].bias = weight;
    }
    if (time_sum[uint128(gauge_type)] == 0) {
      time_sum[uint128(gauge_type)] = next_time;
    }
    time_weight[addr] = next_time;
    emit NewGauge(addr, gauge_type, weight);
  }

  function checkpoint() external returns (uint256) {
    return _get_total();
  }

  function checkpoint_gauge(address addr) external {
    _get_weight(addr);
    _get_total();
  }

  function _gauge_relative_weight(address addr, uint256 time) internal view returns (uint256) {
    uint256 t = (time / WEEK) * WEEK;
    uint256 _total_weight = points_total[t];

    if (_total_weight > 0) {
      int128 gauge_type = gauge_types_[addr] - 1;
      uint256 _type_weight = points_type_weight[gauge_type][t];
      uint256 _gauge_weight = points_weight[addr][t].bias;
      return (MULTIPLIER * _type_weight * _gauge_weight) / _total_weight;
    } else {
      return 0;
    }
  }

  function gauge_relative_weight(address addr, uint256 time) external view returns (uint256) {
    return _gauge_relative_weight(addr, time);
  }

  function gauge_relative_weight_write(address addr, uint256 time) external returns (uint256) {
    _get_weight(addr);
    _get_total();
    return _gauge_relative_weight(addr, time);
  }

  function _change_type_weight(int128 type_id, uint256 weight) internal {
    uint256 old_weight = _get_type_weight(type_id);
    uint256 old_sum = _get_sum(type_id);
    uint256 _total_weight = _get_total();
    uint256 next_time = ((block.timestamp + WEEK) / WEEK) * WEEK;

    _total_weight = _total_weight + old_sum * weight - old_sum * old_weight;
    points_total[next_time] = _total_weight;
    points_type_weight[type_id][next_time] = weight;
    time_total = next_time;
    time_type_weight[uint128(type_id)] = next_time;

    emit NewTypeWeight(type_id, next_time, weight, _total_weight);
  }

  function add_type(string memory _name, uint256 weight) external {
    assert(msg.sender == admin);
    assert(weight >= 0);
    int128 type_id = n_gauge_types;
    gauge_type_names[type_id] = _name;
    n_gauge_types = type_id + 1;
    if (weight != 0) {
      _change_type_weight(type_id, weight);
      emit AddType(_name, type_id);
    }
  }

  function change_type_weight(int128 type_id, uint256 weight) external {
    assert(msg.sender == admin);
    _change_type_weight(type_id, weight);
  }

  function _change_gauge_weight(address addr, uint256 weight) internal {
    int128 gauge_type = gauge_types_[addr] - 1;
    uint256 old_gauge_weight = _get_weight(addr);
    uint256 type_weight = _get_type_weight(gauge_type);
    uint256 old_sum = _get_sum(gauge_type);
    uint256 _total_weight = _get_total();
    uint256 next_time = ((block.timestamp + WEEK) / WEEK) * WEEK;

    points_weight[addr][next_time].bias = weight;
    time_weight[addr] = next_time;

    uint256 new_sum = old_sum + weight - old_gauge_weight;
    points_sum[gauge_type][next_time].bias = new_sum;
    time_sum[uint128(gauge_type)] = next_time;

    _total_weight = _total_weight + new_sum * type_weight - old_sum * type_weight;
    points_total[next_time] = _total_weight;
    time_total = next_time;

    emit NewGaugeWeight(addr, block.timestamp, weight, _total_weight);
  }

  function change_gauge_weight(address addr, uint256 weight) external {
    assert(msg.sender == admin);
    _change_gauge_weight(addr, weight);
  }

  function vote_for_gauge_weights(address _gauge_addr, uint256 _user_weight) external {
    CorrectedPoint memory corrected_point = _get_corrected_info(msg.sender);
    uint256 slope = corrected_point.slope;
    uint256 lock_end = corrected_point.lock_end;

    // int128 _n_gauges = n_gauges;
    uint256 next_time = ((block.timestamp + WEEK) / WEEK) * WEEK;
    require(lock_end > next_time, 'Your token lock expires too soon');
    require((_user_weight >= 0) && (_user_weight <= 10000), 'You used all your voting power');
    require(block.timestamp >= last_user_vote[msg.sender][_gauge_addr] + WEIGHT_VOTE_DELAY, 'Cannot vote so often');

    int128 gauge_type = gauge_types_[_gauge_addr] - 1;
    require(gauge_type >= 0, 'Gauge not added');
    // Prepare slopes and biases in memory
    VotedSlope memory old_slope = vote_user_slopes[msg.sender][_gauge_addr];
    uint256 old_dt = 0;
    if (old_slope.end > next_time) {
      old_dt = old_slope.end - next_time;
    }
    uint256 old_bias = old_slope.slope * old_dt;
    VotedSlope memory new_slope = VotedSlope({
      slope: (slope * _user_weight) / 10000,
      power: _user_weight,
      end: lock_end
    });
    uint256 new_dt = lock_end - next_time; // raises dev when expired
    uint256 new_bias = new_slope.slope * new_dt;

    // Check and update powers (weights) used
    uint256 power_used = vote_user_power[msg.sender];
    power_used = power_used + new_slope.power - old_slope.power;
    vote_user_power[msg.sender] = power_used;
    require((power_used >= 0) && (power_used <= 10000), 'Used too much power');

    // Remove old and schedule new slope changes
    // Remove slope changes for old slopes
    // Schedule recording of initial slope for next_time
    uint256 old_weight_bias = _get_weight(_gauge_addr);
    uint256 old_weight_slope = points_weight[_gauge_addr][next_time].slope;
    uint256 old_sum_bias = _get_sum(gauge_type);
    uint256 old_sum_slope = points_sum[gauge_type][next_time].slope;

    points_weight[_gauge_addr][next_time].bias = max(old_weight_bias + new_bias, old_bias) - old_bias;
    points_sum[gauge_type][next_time].bias = max(old_sum_bias + new_bias, old_bias) - old_bias;
    if (old_slope.end > next_time) {
      points_weight[_gauge_addr][next_time].slope =
        max(old_weight_slope + new_slope.slope, old_slope.slope) -
        old_slope.slope;
      points_sum[gauge_type][next_time].slope = max(old_sum_slope + new_slope.slope, old_slope.slope) - old_slope.slope;
    } else {
      points_weight[_gauge_addr][next_time].slope += new_slope.slope;
      points_sum[gauge_type][next_time].slope += new_slope.slope;
    }
    if (old_slope.end > block.timestamp) {
      // Cancel old slope changes if they still didn't happen
      changes_weight[_gauge_addr][old_slope.end] -= old_slope.slope;
      changes_sum[gauge_type][old_slope.end] -= old_slope.slope;
    }
    // Add slope changes for new slopes
    changes_weight[_gauge_addr][new_slope.end] += new_slope.slope;
    changes_sum[gauge_type][new_slope.end] += new_slope.slope;

    _get_total();

    vote_user_slopes[msg.sender][_gauge_addr] = new_slope;

    // Record last action time
    last_user_vote[msg.sender][_gauge_addr] = block.timestamp;

    emit VoteForGauge(block.timestamp, msg.sender, _gauge_addr, _user_weight);
  }

  function get_gauge_weight(address addr) external view returns (uint256) {
    return points_weight[addr][time_weight[addr]].bias;
  }

  function get_type_weight(int128 type_id) external view returns (uint256) {
    return points_type_weight[type_id][time_type_weight[uint128(type_id)]];
  }

  function get_total_weight() external view returns (uint256) {
    return points_total[time_total];
  }

  function get_weights_sum_per_type(int128 type_id) external view returns (uint256) {
    return points_sum[type_id][time_sum[uint128(type_id)]].bias;
  }

  function change_global_emission_rate(uint256 new_rate) external {
    assert(msg.sender == admin);
    global_emission_rate = new_rate;
  }

  function max(uint a, uint b) internal pure returns (uint) {
    return a >= b ? a : b;
  }
}
