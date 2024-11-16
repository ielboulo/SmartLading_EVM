// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {BillOfLading} from "../src/BillOfLading.sol";

contract DeployBillOfLading is Script {
    BillOfLading public billOfLading;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy the SimpleStorage contract
        billOfLading = new BillOfLading();

        // Optionally, interact with the contract (e.g., storing a value)
        uint256 count = billOfLading.getDocumentCount();
        
        console.log("Count Doc:", count);


        // You can log the contract address if needed
        console.log("Deployed billOfLading at:", address(billOfLading));


        vm.stopBroadcast();
    }
}
