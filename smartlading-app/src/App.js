import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import existing components
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Initialize from './components/Initialize';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UploadBL from './components/UploadBL';
import BillOfLadingDetails from './components/BillOfLadingDetails';
import TransferOwnership from './components/TransferOwnership';
import VerifyDoc from './components/VerifyDoc';

function App() {
  return (
    <Router>
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
              <Route path="/" element={<Initialize />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bill-of-lading/:bolNumber" element={<BillOfLadingDetails />} />
              <Route path="/register" element={<Register />} />
              <Route path="/uploadBL" element={<UploadBL />} />
              <Route path="/bl-details" element={<BillOfLadingDetails />} />
              <Route path="/transfer" element={<TransferOwnership />} />
              <Route path="/verify" element={<VerifyDoc />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;