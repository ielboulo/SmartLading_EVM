import React, { createContext, useContext, useState, useEffect } from 'react';
import { contractAddress, contractABI } from '../config/contract';

import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { wrapEthersProvider } from '@oasisprotocol/sapphire-paratime';

const ethers = require('ethers');

const Web3Context = createContext(null);

export const Web3ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract_write, setContractW] = useState(null);

  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("ilham here ..... 0");

  const connectWallet = async () => {
    console.log("ilham here ..... 1");

    try {
      if (!window.ethereum) {
        console.error('MetaMask is not installed');
        throw new Error('MetaMask is not installed. Please install it to use this app.');
      }

      setIsLoading(true);

      console.log("ilham here ..... 2");
      // Initialize provider
      const web3Provider = new ethers.providers.Web3Provider(wrapEthersProvider(window.ethereum)); //sapphire.wrap(new ethers.providers.Web3Provider(window.ethereum));

      console.log("ilham here ..... 3 - Provider initialized");
      await web3Provider.send('eth_requestAccounts', []);

      console.log("ilham here ..... 4 - Accounts requested");
      const signer = web3Provider.getSigner();
      const signerAddress = await signer.getAddress();
      console.log("ilham here ..... 5 - Signer address:", signerAddress);

      const accounts = await web3Provider.listAccounts();
      console.log("ilham here ..... 6 - Accounts list:", accounts);

      if (signerAddress.toLowerCase() !== accounts[0].toLowerCase()) {
        console.error('Signer and account mismatch');
        throw new Error('Mismatch between signer and selected account.');
      }

      const signerW = sapphire.wrap(
        new ethers.providers.Web3Provider(window.ethereum).getSigner(),
      );
      const contract = new ethers.Contract(contractAddress, contractABI, web3Provider); // read
      //const contract_write = new ethers.Contract(contractAddress, contractABI, web3Provider.getSigner()); // write
      const contract_write = new ethers.Contract(contractAddress, contractABI,signerW);

      console.log("7 - Contract initialized contract", contract);

      setProvider(web3Provider);
      setSigner(signer);
      setContract(contract);
      setContractW(contract_write);

      setAccount(accounts[0]);
      setIsConnected(true);
      setError(null);
      console.log("ilham here ..... 8 - Wallet connected successfully");
    } catch (err) {
      console.error('Error connecting wallet:', err.message);
      setError(err.message);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
      console.log("ilham here ..... 9 - connectWallet finished");
    }
  };

  const disconnectWallet = () => {
    console.log("ilham here ..... Disconnecting wallet");
    setProvider(null);
    setSigner(null);
    setContract(null);
    setContractW(null);

    setAccount(null);
    setIsConnected(false);
  };

  useEffect(() => {
    console.log("ilham here ..... Setting up Ethereum listeners");
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        console.log("ilham here ..... Accounts changed:", accounts);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          connectWallet();
        } else {
          disconnectWallet();
        }
      };

      const handleChainChanged = () => {
        console.log("ilham here ..... Chain changed");
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        console.log("ilham here ..... Cleaning up listeners");
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  useEffect(() => {
    console.log("ilham here ..... Connecting wallet on mount");
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
    disconnectWallet,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3ContextProvider');
  }
  return context;
};
