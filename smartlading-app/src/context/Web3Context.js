// src/context/Web3Context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../config/contract';

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
      // Updated for ethers v6
      //const provider = new ethers.BrowserProvider(window.ethereum);
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Connect to Anvil network
      const network = await provider.getNetwork();
      console.log("IEL Connected to network:", network.chainId);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAccount(accounts[0]);
      setIsConnected(true);
      setError(null);
    } catch (err) {
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