import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../config/contract';

import * as sapphire from '@oasisprotocol/sapphire-paratime';

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract_write, setContractWrite] = useState(null);

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
      //const provider_ = new ethers.BrowserProvider(window.ethereum);
      
      const provider_old = new ethers.BrowserProvider(window.ethereum);
      console.log("provider_old = ", provider_old);
      // IEL : with sapphire 
      const provider = sapphire.wrap(new ethers.BrowserProvider(window.ethereum));
      console.log("provider_new = ", provider_old);

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
      console.log( "sapphire contract = here we are jj !!!!! "); 

      console.log( "old contract = ", new ethers.Contract(contractAddress, contractABI, signer)); 

      //const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // IEL : with sapphire 
      // IEL : contract for eth_calls (read) 
      contract = new ethers.Contract(contractAddress, contractABI, provider);
      console.log( "sapphire contract = ", contract); 


      // IEL : contract_write for on-chain transactions

      contract_write = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
      console.log( "sapphire contract_write = ", contract_write); 
 

      setProvider(provider);
      setSigner(signer);
      setContract(contract); // IEL 
      setContractWrite(contract_write); // IEL 
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
    setContract(null); // IEL 
    setContractWrite(null); // IEL
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
    contract_write,
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