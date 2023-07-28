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

  function balget_last_user_slopeanceOf(address addr) external view returns (int128);

  function locked__end(address addr) external view returns (uint256);

  function locked(address addr) external view returns (LockedBalance memory);
}

contract FraxGaugeController {
  uint256 public constant WEEK = 604800;
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

  int128 public n_gauge_types;
  int128 public n_gauges;
  uint256 public time_total;
  uint256 public global_emission_rate;

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
    _get_total();
  }
}
