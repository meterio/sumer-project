// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import '../Interface/ISortedBorrows.sol';
import '../Interface/ICTokenExternal.sol';
import '../Interface/IComptroller.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol';

/*
 * A sorted doubly linked list with nodes sorted in descending order.
 *
 * Nodes map to active Vessels in the system - the ID property is the address of a Vessel owner.
 * Nodes are ordered according to their current borrow balance (NBB),
 *
 * The list optionally accepts insert position hints.
 *
 * NBBs are computed dynamically at runtime, and not stored on the Node. This is because NBBs of active Vessels
 * change dynamically as liquidation events occur.
 *
 * The list relies on the fact that liquidation events preserve ordering: a liquidation decreases the NBBs of all active Vessels,
 * but maintains their order. A node inserted based on current NBB will maintain the correct position,
 * relative to it's peers, as rewards accumulate, as long as it's raw collateral and debt have not changed.
 * Thus, Nodes remain sorted by current NBB.
 *
 * Nodes need only be re-inserted upon a Vessel operation - when the owner adds or removes collateral or debt
 * to their position.
 *
 * The list is a modification of the following audited SortedDoublyLinkedList:
 * https://github.com/livepeer/protocol/blob/master/contracts/libraries/SortedDoublyLL.sol
 *
 *
 * Changes made in the Gravita implementation:
 *
 * - Keys have been removed from nodes
 *
 * - Ordering checks for insertion are performed by comparing an NBB argument to the current NBB, calculated at runtime.
 *   The list relies on the property that ordering by ICR is maintained as the ETH:USD price varies.
 *
 * - Public functions with parameters have been made internal to save gas, and given an external wrapper function for external access
 */
contract SortedBorrows is AccessControlEnumerableUpgradeable, ISortedBorrows {
  string public constant NAME = 'SortedBorrows';

  // Information for the list
  struct Data {
    address head; // Head of the list. Also the node in the list with the largest NBB
    address tail; // Tail of the list. Also the node in the list with the smallest NBB
    uint256 size; // Current size of the list
    // Depositor address => node
    mapping(address => Node) nodes; // Track the corresponding ids for each node in the list
  }

  // Collateral type address => ordered list
  mapping(address => Data) public data;

  address public redemptionManager;

  // --- Initializer ---

  function initialize(address _admin) external initializer {
    _setupRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  function setRedemptionManager(address _redemptionManager) external onlyRole(DEFAULT_ADMIN_ROLE) {
    redemptionManager = _redemptionManager;
  }

  /*
   * @dev Add a node to the list
   * @param _id Node's id
   * @param _NBB Node's NBB
   * @param _prevId Id of previous node for the insert position
   * @param _nextId Id of next node for the insert position
   */

  function insert(address _asset, address _id, uint256 _NBB, address _prevId, address _nextId) external override {
    _requireCallerIsRedemptionManager();
    _insert(_asset, _id, _NBB, _prevId, _nextId);
  }

  function _insert(address _asset, address _id, uint256 _NBB, address _prevId, address _nextId) internal {
    Data storage assetData = data[_asset];

    // List must not already contain node
    require(!_contains(assetData, _id), 'SortedBorrows: List already contains the node');
    // Node id must not be null
    require(_id != address(0), 'SortedBorrows: Id cannot be zero');
    // NBB must be non-zero
    require(_NBB != 0, 'SortedBorrows: NBB must be positive');

    address prevId = _prevId;
    address nextId = _nextId;

    if (!_validInsertPosition(_asset, _NBB, prevId, nextId)) {
      // Sender's hint was not a valid insert position
      // Use sender's hint to find a valid insert position
      (prevId, nextId) = _findInsertPosition(_asset, _NBB, prevId, nextId);
    }

    Node storage node = assetData.nodes[_id];
    node.exists = true;

    if (prevId == address(0) && nextId == address(0)) {
      // Insert as head and tail
      assetData.head = _id;
      assetData.tail = _id;
    } else if (prevId == address(0)) {
      // Insert before `prevId` as the head
      node.nextId = assetData.head;
      assetData.nodes[assetData.head].prevId = _id;
      assetData.head = _id;
    } else if (nextId == address(0)) {
      // Insert after `nextId` as the tail
      node.prevId = assetData.tail;
      assetData.nodes[assetData.tail].nextId = _id;
      assetData.tail = _id;
    } else {
      // Insert at insert position between `prevId` and `nextId`
      node.nextId = nextId;
      node.prevId = prevId;
      assetData.nodes[prevId].nextId = _id;
      assetData.nodes[nextId].prevId = _id;
    }

    assetData.size = assetData.size + 1;
    emit NodeAdded(_asset, _id, _NBB);
  }

  function remove(address _asset, address _id) external override {
    _requireCallerIsRedemptionManager();
    _remove(_asset, _id);
  }

  /*
   * @dev Remove a node from the list
   * @param _id Node's id
   */
  function _remove(address _asset, address _id) internal {
    Data storage assetData = data[_asset];

    // List must contain the node
    require(_contains(assetData, _id), 'SortedBorrows: List does not contain the id');

    Node storage node = assetData.nodes[_id];
    if (assetData.size > 1) {
      // List contains more than a single node
      if (_id == assetData.head) {
        // The removed node is the head
        // Set head to next node
        assetData.head = node.nextId;
        // Set prev pointer of new head to null
        assetData.nodes[assetData.head].prevId = address(0);
      } else if (_id == assetData.tail) {
        // The removed node is the tail
        // Set tail to previous node
        assetData.tail = node.prevId;
        // Set next pointer of new tail to null
        assetData.nodes[assetData.tail].nextId = address(0);
      } else {
        // The removed node is neither the head nor the tail
        // Set next pointer of previous node to the next node
        assetData.nodes[node.prevId].nextId = node.nextId;
        // Set prev pointer of next node to the previous node
        assetData.nodes[node.nextId].prevId = node.prevId;
      }
    } else {
      // List contains a single node
      // Set the head and tail to null
      assetData.head = address(0);
      assetData.tail = address(0);
    }

    delete assetData.nodes[_id];
    assetData.size = assetData.size - 1;
    emit NodeRemoved(_asset, _id);
  }

  /*
   * @dev Re-insert the node at a new position, based on its new NBB
   * @param _id Node's id
   * @param _newNBB Node's new NBB
   * @param _prevId Id of previous node for the new insert position
   * @param _nextId Id of next node for the new insert position
   */
  function reInsert(address _asset, address _id, uint256 _newNBB, address _prevId, address _nextId) external override {
    _requireCallerIsRedemptionManager();
    // List must contain the node
    require(contains(_asset, _id), 'SortedBorrows: List does not contain the id');
    // NBB must be non-zero
    require(_newNBB != 0, 'SortedBorrows: NBB must be positive');

    // Remove node from the list
    _remove(_asset, _id);

    _insert(_asset, _id, _newNBB, _prevId, _nextId);
  }

  /*
   * @dev Checks if the list contains a node
   */
  function contains(address _asset, address _id) public view override returns (bool) {
    return data[_asset].nodes[_id].exists;
  }

  function _contains(Data storage _dataAsset, address _id) internal view returns (bool) {
    return _dataAsset.nodes[_id].exists;
  }

  /*
   * @dev Checks if the list is empty
   */
  function isEmpty(address _asset) public view override returns (bool) {
    return data[_asset].size == 0;
  }

  /*
   * @dev Returns the current size of the list
   */
  function getSize(address _asset) external view override returns (uint256) {
    return data[_asset].size;
  }

  /*
   * @dev Returns the first node in the list (node with the largest NBB)
   */
  function getFirst(address _asset) external view override returns (address) {
    return data[_asset].head;
  }

  /*
   * @dev Returns the last node in the list (node with the smallest NBB)
   */
  function getLast(address _asset) external view override returns (address) {
    return data[_asset].tail;
  }

  /*
   * @dev Returns the next node (with a smaller NBB) in the list for a given node
   * @param _id Node's id
   */
  function getNext(address _asset, address _id) external view override returns (address) {
    return data[_asset].nodes[_id].nextId;
  }

  /*
   * @dev Returns the previous node (with a larger NBB) in the list for a given node
   * @param _id Node's id
   */
  function getPrev(address _asset, address _id) external view override returns (address) {
    return data[_asset].nodes[_id].prevId;
  }

  /*
   * @dev Check if a pair of nodes is a valid insertion point for a new node with the given NBB
   * @param _NBB Node's NBB
   * @param _prevId Id of previous node for the insert position
   * @param _nextId Id of next node for the insert position
   */
  function validInsertPosition(
    address _asset,
    uint256 _NBB,
    address _prevId,
    address _nextId
  ) external view override returns (bool) {
    return _validInsertPosition(_asset, _NBB, _prevId, _nextId);
  }

  function _validInsertPosition(
    address _asset,
    uint256 _NBB,
    address _prevId,
    address _nextId
  ) internal view returns (bool) {
    if (_prevId == address(0) && _nextId == address(0)) {
      // `(null, null)` is a valid insert position if the list is empty
      return isEmpty(_asset);
    } else if (_prevId == address(0)) {
      // `(null, _nextId)` is a valid insert position if `_nextId` is the head of the list
      return data[_asset].head == _nextId && _NBB >= ICToken(_asset).borrowBalanceStored(_nextId);
    } else if (_nextId == address(0)) {
      // `(_prevId, null)` is a valid insert position if `_prevId` is the tail of the list
      return data[_asset].tail == _prevId && _NBB <= ICToken(_asset).borrowBalanceStored(_prevId);
    } else {
      // `(_prevId, _nextId)` is a valid insert position if they are adjacent nodes and `_NBB` falls between the two nodes' NBBs
      return
        data[_asset].nodes[_prevId].nextId == _nextId &&
        ICToken(_asset).borrowBalanceStored(_prevId) >= _NBB &&
        _NBB >= ICToken(_asset).borrowBalanceStored(_nextId);
    }
  }

  /*
   * @dev Descend the list (larger NBBs to smaller NBBs) to find a valid insert position
   * @param _vesselManager VesselManager contract, passed in as param to save SLOAD’s
   * @param _NBB Node's NBB
   * @param _startId Id of node to start descending the list from
   */
  function _descendList(address _asset, uint256 _NBB, address _startId) internal view returns (address, address) {
    Data storage assetData = data[_asset];

    // If `_startId` is the head, check if the insert position is before the head
    if (assetData.head == _startId && _NBB >= ICToken(_asset).borrowBalanceStored(_startId)) {
      return (address(0), _startId);
    }

    address prevId = _startId;
    address nextId = assetData.nodes[prevId].nextId;

    // Descend the list until we reach the end or until we find a valid insert position
    while (prevId != address(0) && !_validInsertPosition(_asset, _NBB, prevId, nextId)) {
      prevId = assetData.nodes[prevId].nextId;
      nextId = assetData.nodes[prevId].nextId;
    }

    return (prevId, nextId);
  }

  /*
   * @dev Ascend the list (smaller NBBs to larger NBBs) to find a valid insert position
   * @param _vesselManager VesselManager contract, passed in as param to save SLOAD’s
   * @param _NBB Node's NBB
   * @param _startId Id of node to start ascending the list from
   */
  function _ascendList(address _asset, uint256 _NBB, address _startId) internal view returns (address, address) {
    Data storage assetData = data[_asset];

    // If `_startId` is the tail, check if the insert position is after the tail
    if (assetData.tail == _startId && _NBB <= ICToken(_asset).borrowBalanceStored(_startId)) {
      return (_startId, address(0));
    }

    address nextId = _startId;
    address prevId = assetData.nodes[nextId].prevId;

    // Ascend the list until we reach the end or until we find a valid insertion point
    while (nextId != address(0) && !_validInsertPosition(_asset, _NBB, prevId, nextId)) {
      nextId = assetData.nodes[nextId].prevId;
      prevId = assetData.nodes[nextId].prevId;
    }

    return (prevId, nextId);
  }

  /*
   * @dev Find the insert position for a new node with the given NBB
   * @param _NBB Node's NBB
   * @param _prevId Id of previous node for the insert position
   * @param _nextId Id of next node for the insert position
   */
  function findInsertPosition(
    address _asset,
    uint256 _NBB,
    address _prevId,
    address _nextId
  ) external view override returns (address, address) {
    return _findInsertPosition(_asset, _NBB, _prevId, _nextId);
  }

  function _findInsertPosition(
    address _asset,
    uint256 _NBB,
    address _prevId,
    address _nextId
  ) internal view returns (address, address) {
    address prevId = _prevId;
    address nextId = _nextId;

    if (prevId != address(0)) {
      if (!contains(_asset, prevId) || _NBB > ICToken(_asset).borrowBalanceStored(prevId)) {
        // `prevId` does not exist anymore or now has a smaller NBB than the given NBB
        prevId = address(0);
      }
    }

    if (nextId != address(0)) {
      if (!contains(_asset, nextId) || _NBB < ICToken(_asset).borrowBalanceStored(nextId)) {
        // `nextId` does not exist anymore or now has a larger NBB than the given NBB
        nextId = address(0);
      }
    }

    if (prevId == address(0) && nextId == address(0)) {
      // No hint - descend list starting from head
      return _descendList(_asset, _NBB, data[_asset].head);
    } else if (prevId == address(0)) {
      // No `prevId` for hint - ascend list starting from `nextId`
      return _ascendList(_asset, _NBB, nextId);
    } else if (nextId == address(0)) {
      // No `nextId` for hint - descend list starting from `prevId`
      return _descendList(_asset, _NBB, prevId);
    } else {
      // Descend list starting from `prevId`
      return _descendList(_asset, _NBB, prevId);
    }
  }

  // --- 'require' functions ---

  function _requireCallerIsRedemptionManager() internal view {
    require(msg.sender == redemptionManager, 'only redemption manager');
  }

  function isSortedBorrows() external pure returns (bool) {
    return true;
  }
}
