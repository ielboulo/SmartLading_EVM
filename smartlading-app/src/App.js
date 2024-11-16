// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Web3Provider } from './context/Web3Context';

// Import components
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Initialize from './components/Initialize';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UploadBL from './components/UploadBL';
import BillOfLadingDetails from './components/BillOfLadingDetails';
import TransferOwnership from './components/TransferOwnership';
import VerifyDoc from './components/VerifyDoc';
import LandingPage from './components/LandingPage';

const MainAppLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavBar />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SideBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
            overflow: 'auto'
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bill-of-lading/:bolNumber" element={<BillOfLadingDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/uploadBL" element={<UploadBL />} />
            <Route path="/bl-details" element={<BillOfLadingDetails />} />
            <Route path="/transfer" element={<TransferOwnership />} />
            <Route path="/verify" element={<VerifyDoc />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Web3Provider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<MainAppLayout />} />
      </Routes>
    </Router>
    </Web3Provider>
  );
}

export default App;