import React, { useState } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import idl from '../idl/smart_lading.json'; // Ensure this path is correct
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';

// Replace with your program ID
const programID = new PublicKey("1gKYDP38tQow2WAiHtUomBQYAoSNdQveeASvRG38ANt");

export default function Register() {
  const [formData, setFormData] = useState({
    billOfLadingNumber: '',
    shipFrom: '',
    shipTo: '',
    shipDate: '',
    carrier: '',
    cargo: '',
    valueUsd: '',
    docMetadata: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const wallet = useAnchorWallet();
  if (wallet) {
    const walletAddress = wallet.publicKey.toString();
    console.log("Wallet address:", walletAddress);
  } else {
    console.log("Wallet not connected");
  }
  const { connection } = useConnection();

  console.log("connection = ", connection); 

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  console.log("provider ", provider);
  console.log("programID ", programID.toString());
  console.log("idl ", idl);

  const program = new Program(idl, programID, provider);
  console.log("Program object:", program);
  console.log("Available methods:", Object.keys(program.methods));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.billOfLadingNumber) newErrors.billOfLadingNumber = "Bill of Lading Number is required";
    if (!formData.shipFrom) newErrors.shipFrom = "Ship From is required";
    if (!formData.shipTo) newErrors.shipTo = "Ship To is required";
    if (!formData.shipDate) newErrors.shipDate = "Ship Date is required";
    if (!formData.carrier) newErrors.carrier = "Carrier is required";
    if (!formData.cargo) newErrors.cargo = "Cargo is required";
    if (!formData.valueUsd || isNaN(formData.valueUsd)) newErrors.valueUsd = "Value USD must be a valid number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
        const program = new Program(idl, programID, provider);

        console.log("Program object:", program);
        console.log("Available methods:", Object.keys(program.methods));


        const [globalStateAccount] = PublicKey.findProgramAddressSync(
          [Buffer.from("global_state")],
          program.programId
        );

        const [documentAccount] = PublicKey.findProgramAddressSync(
          [Buffer.from("document"), Buffer.from(formData.billOfLadingNumber)],
          program.programId
        );

        /** bill_of_lading_number: String,
        ship_from: String,
        ship_to: String,
        ship_date: i64,
        carrier: String,
        cargo: String,
        value_usd: u64,
        doc_metadata: String,
        owner: Pubkey, */

        console.log("Submitting document with data:", {
          billOfLadingNumber: formData.billOfLadingNumber,
          shipFrom: formData.shipFrom,
          shipTo: formData.shipTo,
          shipDate: new BN(Math.floor(new Date(formData.shipDate).getTime() / 1000)).toString(),
          carrier: formData.carrier,
          cargo: formData.cargo,
          valueUsd: new BN(Math.floor(parseFloat(formData.valueUsd) * 100)).toString(),
          docMetadata: formData.docMetadata,
          owner: wallet.publicKey.toString()
        });

          await program.methods.storeDocument(
            formData.billOfLadingNumber,
            formData.shipFrom,
            formData.shipTo,
            new BN(Math.floor(new Date(formData.shipDate).getTime() / 1000)), // Unix timestamp
            formData.carrier,
            formData.cargo,
            new BN(Math.floor(parseFloat(formData.valueUsd) * 100)), // Convert to cents
            formData.docMetadata,
            wallet.publicKey // owner
          )
          .accounts({
            document: documentAccount,
            globalState: globalStateAccount,
            issuer: wallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
          })
          .rpc();

        setSnackbar({ open: true, message: 'Document stored successfully!', severity: 'success' });
        // Reset form
        setFormData({
          billOfLadingNumber: '',
          shipFrom: '',
          shipTo: '',
          shipDate: '',
          carrier: '',
          cargo: '',
          valueUsd: '',
          docMetadata: '',
        });
      } catch (error) {
        console.error("Error storing document:", error);
        setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!wallet) {
    return <Typography>Please connect your wallet to continue.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        Register a Bill of Lading
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bill of Lading Number"
              name="billOfLadingNumber"
              value={formData.billOfLadingNumber}
              onChange={handleChange}
              error={!!errors.billOfLadingNumber}
              helperText={errors.billOfLadingNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ship From"
              name="shipFrom"
              value={formData.shipFrom}
              onChange={handleChange}
              error={!!errors.shipFrom}
              helperText={errors.shipFrom}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ship To"
              name="shipTo"
              value={formData.shipTo}
              onChange={handleChange}
              error={!!errors.shipTo}
              helperText={errors.shipTo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ship Date"
              type="date"
              name="shipDate"
              value={formData.shipDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.shipDate}
              helperText={errors.shipDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Carrier"
              name="carrier"
              value={formData.carrier}
              onChange={handleChange}
              error={!!errors.carrier}
              helperText={errors.carrier}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              error={!!errors.cargo}
              helperText={errors.cargo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Value USD"
              name="valueUsd"
              type="number"
              value={formData.valueUsd}
              onChange={handleChange}
              error={!!errors.valueUsd}
              helperText={errors.valueUsd}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Document Metadata"
              name="docMetadata"
              rows={4}
              value={formData.docMetadata}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Create Bill of Lading'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}