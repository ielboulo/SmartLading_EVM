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

// Import the Web3Context hook
import { useWeb3 } from '../context/Web3Context';

import '../utils/ContractUtils';

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

  // Get the Web3Context values
  const { contract, account, isConnected } = useWeb3();
console.log("contract : ", contract.target, " isConnected ", isConnected); 

  // Effect to get document count when contract is available
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
        console.log("Form data to be sent to smart contract:", {
          billOfLadingNumber: formData.billOfLadingNumber,
          shipFrom: formData.shipFrom,
          shipTo: formData.shipTo,
          shipDate: new Date(formData.shipDate).getTime(),
          carrier: formData.carrier,
          cargo: formData.cargo,
          valueUsd: parseFloat(formData.valueUsd),
          docMetadata: formData.docMetadata,
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
        setSnackbar({ open: true, message: 'Document registered successfully!', severity: 'success' });
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
        setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
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