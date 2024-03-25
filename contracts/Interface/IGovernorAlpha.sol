// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

abstract contract IGovernorAlpha {
  struct Proposal {
    // Unique id for looking up a proposal
    uint256 id;
    // Creator of the proposal
    address proposer;
    // The timestamp that the proposal will be available for execution, set once the vote succeeds
    uint256 eta;
    // the ordered list of target addresses for calls to be made
    address[] targets;
    // The ordered list of values (i.e. msg.value) to be passed to the calls to be made
    uint256[] values;
    // The ordered list of function signatures to be called
    string[] signatures;
    // The ordered list of calldata to be passed to each call
    bytes[] calldatas;
    // The block at which voting begins: holders must delegate their votes prior to this block
    uint256 startBlock;
    // The block at which voting ends: votes must be cast prior to this block
    uint256 endBlock;
    // Current number of votes in favor of this proposal
    uint256 forVotes;
    // Current number of votes in opposition to this proposal
    uint256 againstVotes;
    // Flag marking whether the proposal has been canceled
    bool canceled;
    // Flag marking whether the proposal has been executed
    bool executed;
    // Receipts of ballots for the entire set of voters
    mapping(address => Receipt) receipts;
  }
  // Ballot receipt record for a voter
  // Whether or not a vote has been cast
  // Whether or not the voter supports the proposal
  // The number of votes the voter had, which were cast
  struct Receipt {
    bool hasVoted;
    bool support;
    uint96 votes;
  }

  function getReceipt(uint256 proposalId, address voter)
    external
    view
    virtual
    returns (
      bool,
      bool,
      uint96
    );

  mapping(uint256 => Proposal) public proposals;

  function getActions(uint256 proposalId)
    public
    view
    virtual
    returns (
      address[] memory targets,
      uint256[] memory values,
      string[] memory signatures,
      bytes[] memory calldatas
    );
}
