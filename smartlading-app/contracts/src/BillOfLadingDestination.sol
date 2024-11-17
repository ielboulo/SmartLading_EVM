// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// Deploy this contract on Sepolia

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

interface IBillOfLAding {
   function storeDocumentHash(
        uint256 _bolNumber,
        bytes32 _documentHash
    ) external returns (bool);}

contract BillOfLadingDestination is CCIPReceiver {
    IBillOfLAding public _BOL;

    event HashStoredSuccessfull();
    // https://docs.chain.link/ccip/supported-networks/testnet
    address routerSepolia = 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59;

    constructor(address bol_dest) CCIPReceiver(routerSepolia) {
        _BOL = IBillOfLAding(bol_dest);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(_BOL).call(message.data);
        require(success);
        emit HashStoredSuccessfull();
    }
    function testStoreDocHash() external {
        // Mint from Sepolia
        _BOL.storeDocumentHash(1899, 0x19ee7a552fba465bbf86974eae466ff52f44cff9c16e8f78286d4277c68c23f6);
    }

    function testMessageStoreDocHash() external {
        // Mint from Sepolia
        bytes memory message;
        message = abi.encodeWithSignature("storeDocumentHash(uint256,bytes32)", 156, 0x19007a552fba465bbf86974eae466ff52f44cff9c16e8f78286d4277c68c23f6);

        (bool success, ) = address(_BOL).call(message);
        require(success);
        emit HashStoredSuccessfull();
    }

}