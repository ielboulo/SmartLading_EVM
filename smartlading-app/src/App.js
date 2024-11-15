import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ethers } from 'ethers';

const contractAddress = "0x0116686e2291dbd5e317f47fadbfb43b599786ef";
const contractABI = [
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

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [number, setNumber] = useState(null);
  const [inputNumber, setInputNumber] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        await fetchNumber();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask.");
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  const fetchNumber = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const currentNumber = await contract.storedNumber();
      setNumber(currentNumber.toString());
    } catch (error) {
      console.error("Error fetching number:", error);
    }
  };

  const setNewNumber = async () => {
    if (!inputNumber || !walletAddress) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      const tx = await contract.store(inputNumber);
      await tx.wait();
      await fetchNumber();
      setInputNumber("");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed.");
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchNumber();
    }
  }, [walletAddress]);

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={connectWallet}
        sx={{ mb: 2 }}
      >
        {walletAddress ? "Connected" : "Connect Wallet"}
      </Button>

      {walletAddress && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Connected: {walletAddress}
        </Typography>
      )}

      {number !== null && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          Stored Number: {number}
        </Typography>
      )}

      <Box sx={{ mb: 2 }}>
        <input
          type="number"
          placeholder="New number"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={setNewNumber}
          disabled={!inputNumber || !walletAddress}
        >
          Set Number
        </Button>
      </Box>
    </Box>
  );
}

export default App;