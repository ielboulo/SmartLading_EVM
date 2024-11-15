import React, { useEffect, useState } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import idl from '../idl/smart_lading.json'; // Ensure this path is correct
import { Snackbar, Alert } from '@mui/material';

// Replace with your program ID
const programID = new PublicKey("1gKYDP38tQow2WAiHtUomBQYAoSNdQveeASvRG38ANt");
const MAX_DOC = 10;

function InitializeSC() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const initializeContract = async () => {
      if (wallet) {
        try {
          //setSnackbar({ open: true, message: 'Initializing smart contract...', severity: 'info' });
          
          const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
          const program = new Program(idl, programID, provider);

          const [globalStateAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from("global_state")],
            program.programId
          );

          // Check if the global state account already exists
          const accountInfo = await connection.getAccountInfo(globalStateAccount);
          
          if (!accountInfo) {
            // If the account doesn't exist, initialize it
            await program.methods.initialize(MAX_DOC)
              .accounts({
                globalState: globalStateAccount,
                authority: wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
              })
              .rpc();
            
            console.log("Smart contract initialized successfully, max_doc set to ", MAX_DOC);
            setSnackbar({ open: true, message: `Smart contract initialized successfully, max_doc set to ${MAX_DOC}`, severity: 'success' });
          } else {
            console.log("Smart contract already initialized");
            //setSnackbar({ open: true, message: 'Smart contract already initialized', severity: 'info' });
          }
        } catch (error) {
          console.error("Error initializing smart contract:", error);
          setSnackbar({ open: true, message: `Error initializing smart contract: ${error.message}`, severity: 'error' });
        }
      }
    };

    initializeContract();
  }, [wallet, connection]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default InitializeSC;