// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract SimpleStorage {
    uint256 public storedNumber;

    function store(uint256 newNumber) public {
        storedNumber = newNumber;
    }

    function retrieve() public view returns (uint256) {
        return storedNumber;
    }
}
