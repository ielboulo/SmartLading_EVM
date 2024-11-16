// src/config/contract.js
export const contractAddress = "0x0116686e2291dbd5e317f47fadbfb43b599786ef";

export const contractABI = [
  {
    "type": "function",
    "name": "retrieve",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "store",
    "inputs": [{"name": "newNumber", "type": "uint256", "internalType": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "storedNumber",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  }
];