import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import logoy from '../asset/logoy.png';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logoy}  alt="Logo" style={{ height: 120 }} />
          </Link>
        </Typography>
        <Box>
          <WalletMultiButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;