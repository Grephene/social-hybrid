pragma solidity ^0.4.4;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract CounterApp is AragonApp {

  bytes32 constant public POST_COMMENT_ROLE = keccak256("POST_COMMENT_ROLE");

  event Message(string text, address user, uint64 time );

  mapping(address => string) public nicknames;
  mapping(address => string) public profilePics;

  function postComment(string text) external  {
    Message(text, msg.sender, uint64(now));
  }

  function setNickname(string name) external auth(POST_COMMENT_ROLE) {
    nicknames[msg.sender] = name;
  }

  function setProfilePic(string url) external {
    profilePics[msg.sender] = url;
  }

}
