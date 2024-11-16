import React, { createContext, useContext, useState, useEffect } from 'react';
//import { ethers } from 'ethers';

import { contractAddress, contractABI } from '../config/contract';

const ethers = require('ethers');

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }
      setIsLoading(true);

      // Use BrowserProvider with window.ethereum instead of JsonRpcProvider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request accounts first
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Then get the signer
      const signer = await provider.getSigner();
      console.log("Connected wallet address:", accounts[0]);
      console.log("Signer address:", await signer.getAddress());

      // Verify the addresses match
      const signerAddress = await signer.getAddress();
      if (signerAddress.toLowerCase() !== accounts[0].toLowerCase()) {
        throw new Error("Signer and selected account mismatch");
      }

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAccount(accounts[0]);
      setIsConnected(true);
      setError(null);
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setIsConnected(false);
  };

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          connectWallet();
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', connectWallet);
        window.ethereum.removeListener('chainChanged', () => {
          window.location.reload();
        });
      }
    };
  }, []);

  // Initial connection attempt
  useEffect(() => {
    connectWallet();
  }, []);

  const value = {
    provider,
    signer,
    contract,
    account,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};