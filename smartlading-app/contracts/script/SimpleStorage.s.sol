// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";

contract DeploySimpleStorageScript is Script {
    SimpleStorage public simpleStorage;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy the SimpleStorage contract
        simpleStorage = new SimpleStorage();

        // Optionally, interact with the contract (e.g., storing a value)
        simpleStorage.store(42);

        // You can log the contract address if needed
        console.log("Deployed SimpleStorage at:", address(simpleStorage));

        vm.stopBroadcast();
    }
}
