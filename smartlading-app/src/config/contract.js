

export const contractAddress = "0xb08E2D65eD8609675E19284724ae87269039Cd5b"; // zircuit testnet 
export const contractABI = [
  {
    "type": "function",
    "name": "changeDocumentOwner",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getDocument",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum BillOfLading.DocumentStatus"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDocumentCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDocumentOwner",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDocumentStatus",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum BillOfLading.DocumentStatus"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setDocumentStatus",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_newStatus",
        "type": "uint8",
        "internalType": "enum BillOfLading.DocumentStatus"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "storeDocumentHash",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_documentHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "storeDocumentHash",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_shipFrom",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_shipTo",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_shipDate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_carrier",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_cargoContent",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_valueUSD",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_documentHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "verifyDocumentHash",
    "inputs": [
      {
        "name": "_bolNumber",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_hash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "DocumentStored",
    "inputs": [
      {
        "name": "bolNumber",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "documentHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "bolNumber",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StatusChanged",
    "inputs": [
      {
        "name": "bolNumber",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "newStatus",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum BillOfLading.DocumentStatus"
      }
    ],
    "anonymous": false
  }
];