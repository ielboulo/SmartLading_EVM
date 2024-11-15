import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Button, Typography } from '@mui/material';

import theme from './theme';

import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import Register from './components/Register';
import InitializeSC from './components/Initialize';
import UploadBL from './components/UploadBL';
import Dashboard from './components/Dashboard';
import BillOfLadingDetails from './components/BillOfLadingDetails';

import welcomeImage from './asset/smartlading_home.png';

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  // Function to connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]); // Set the first wallet address
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Navbar />
          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                overflow: 'auto',
                backgroundColor: '#f5f5f5',
                width: { sm: `calc(100% - 240px)` }, // Adjust based on sidebar width
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={connectWallet}
                  sx={{ mb: 2 }}
                >
                  {walletAddress ? "Wallet Connected" : "Connect Wallet"}
                </Button>
                {walletAddress && (
                  <Typography variant="body1" color="text.secondary">
                    Connected Wallet: {walletAddress}
                  </Typography>
                )}
              </Box>
              <Routes>
                <Route path="/uploadBL" element={<UploadBL />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/bill-of-lading/:bolNumber"
                  element={<BillOfLadingDetails />}
                />

                {/* Add other routes here */}
                <Route
                  path="/"
                  element={
                    <div>
                      <h1>Welcome to SmartLading Platform</h1>
                      <img
                        src={welcomeImage}
                        alt="Welcome"
                        style={{ width: '90%', height: '600px' }}
                      />
                      <Dashboard />
                    </div>
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
