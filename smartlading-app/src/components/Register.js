import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useWeb3 } from '../context/Web3Context';
import { convertDateToTimestamp, generateDocumentHash } from '../utils/ContractUtils';
import { ethers } from 'ethers';

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

  const { contract, account, isConnected } = useWeb3();
  console.log("contract : ", contract?.target, " isConnected ", isConnected); 

  useEffect(() => {
    const getDocCount = async () => {
      if (contract && isConnected) {
        try {
          const count = await contract.getDocumentCount();
          console.log('Number of documents stored:', count.toString());
        } catch (error) {
          console.error('Error getting document count:', error);
        }
      }
    };

    getDocCount();
  }, [contract, isConnected]);

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
        // 1. Convert date to timestamp
        const dateStr = new Date(formData.shipDate).toLocaleDateString('en-GB'); // Convert to dd/mm/yyyy
        const shipDateTimestamp = convertDateToTimestamp(dateStr);
        if (shipDateTimestamp === 0) {
          throw new Error('Invalid date format');
        }

        // 2. Generate document hash
        const documentHash = generateDocumentHash(formData);

        // 3. Convert BOL number to BigNumber
        const bolNumber = ethers.parseUnits(formData.billOfLadingNumber, 0);
        
        // 4. Prepare transaction parameters
        const txParams = [
          bolNumber,                          // _bolNumber
          formData.shipFrom,                  // _shipFrom
          formData.shipTo,                    // _shipTo
          shipDateTimestamp,                  // _shipDate
          formData.carrier,                   // _carrier
          formData.cargo,                     // _cargoContent
          ethers.parseUnits(formData.valueUsd.toString(), 0), // _valueUSD
          documentHash                        // _documentHash
        ];

        console.log('Sending transaction with params:', txParams);

        // 5. Call smart contract function
        const tx = await contract.storeDocumentHash(...txParams);
        console.log('Transaction sent:', tx.hash);

        // 6. Wait for transaction confirmation
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt);

        // 7. Check for events
        const event = receipt.logs.find(log => log.eventName === 'DocumentStored');
        if (event) {
          console.log('Document stored successfully. BOL Number:', event.args[0].toString());
        }

        setSnackbar({
          open: true,
          message: `Document registered successfully! Transaction hash: ${tx.hash}`,
          severity: 'success'
        });

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
        console.error("Error registering document:", error);
        setSnackbar({
          open: true,
          message: `Error: ${error.message}`,
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isConnected) {
    return <Typography>Please connect your MetaMask wallet to continue.</Typography>;
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
              type="number"
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
              multiline
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