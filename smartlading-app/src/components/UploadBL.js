import React, { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';

import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from '../idl/smart_lading.json'; // Ensure this path is correct

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Replace with your program ID
const programID = new web3.PublicKey("1gKYDP38tQow2WAiHtUomBQYAoSNdQveeASvRG38ANt");

const UploadBL = () => {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const { connection } = useConnection();
  const wallet = useWallet();

  const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload only image files.');
        setFile(null);
      }
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file to upload.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const base64Image = await convertToBase64(file);
      const response = await analyzeImageWithClaude(base64Image);
      setExtractedData(response);
      setEditableData(response);
      setShowForm(true);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const analyzeImageWithClaude = async (base64Image) => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this image of a shipping document and extract the following information: ship date, bill of lading number, ship from, ship to, carrier name, freight charges term, third party freight charges, special instructions, and cargo. Provide the information in a JSON format that strictly adheres to the following structure:
  
  {
    "shipDate": string,
    "billOfLadingNumber": string,
    "shipFrom": string,
    "shipTo": string,
    "carrierName": string,
    "freightChargesTerm": string,
    "thirdPartyFreightCharges": string,
    "specialInstructions": string,
    "cargo": string,
    "status": "default",
    "owner": "admin"
  }
  
  Please ensure that all fields are present in the JSON response, even if the information is not available in the image. In such cases, use "N/A" for string fields. The response should be a valid JSON object without any additional text or explanations.`
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/png",
                data: base64Image.split(',')[1]
              }
            }
          ]
        }
      ],
    });

    if (response.content && response.content.length > 0 && response.content[0].type === 'text') {
      console.log("Claude API response:", response);
      const jsonMatch = response.content[0].text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const extractedData = JSON.parse(jsonMatch[0]);
        extractedData.shipDate = convertDateFormat(extractedData.shipDate);
        return extractedData;
      }
    }
    throw new Error('Failed to extract data from the image');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editableData) {
      setEditableData({
        ...editableData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await _storeDocument(editableData);
      setSnackbar({ open: true, message: 'Document stored successfully on Solana!', severity: 'success' });
    } catch (error) {
      console.error("Error storing document:", error);
      setSnackbar({ open: true, message: 'Failed to store document. Please try again.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const _storeDocument = async (data) => {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    const provider = new AnchorProvider(connection, wallet, {});
    const program = new Program(idl, programID, provider);
    const [globalStateAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("global_state")],
      program.programId
    );

    const [documentAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("document"), Buffer.from(data.billOfLadingNumber)],
      program.programId
    );

    try {
      const tx = await program.methods.storeDocument(
        data.billOfLadingNumber,
        data.shipFrom,
        data.shipTo,
        new BN(Math.floor(new Date(data.shipDate).getTime() / 1000)), // Unix timestamp
        data.carrierName,
        data.cargo,
        new BN(12345), // Convert to cents
        data.specialInstructions,
        wallet.publicKey // owner
        )
        .accounts({
          document: documentAccount,
          globalState: globalStateAccount,
          issuer: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction signature", tx);
    } catch (error) {
      console.error("Error calling storeDocument:", error);
      throw error;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Upload Shipping Document
        </Typography>

        <form onSubmit={handleFileSubmit}>
          <Box sx={{ mb: 3 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Upload Document
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
            {file && (
              <Typography variant="body2" color="text.secondary">
                Selected file: {file.name}
              </Typography>
            )}
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading || !file}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Analyze Document'}
          </Button>
        </form>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        
        {showForm && editableData && (
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 4 }}>
            <TextField
              fullWidth
              label="Bill of Lading Number"
              name="billOfLadingNumber"
              value={editableData.billOfLadingNumber}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ship Date"
              name="shipDate"
              type="date"
              value={editableData.shipDate}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Ship From"
              name="shipFrom"
              value={editableData.shipFrom}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ship To"
              name="shipTo"
              value={editableData.shipTo}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Carrier Name"
              name="carrierName"
              value={editableData.carrierName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Freight Charges Term"
              name="freightChargesTerm"
              value={editableData.freightChargesTerm}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Third Party Freight Charges Bill To"
              name="thirdPartyFreightCharges"
              value={editableData.thirdPartyFreightCharges}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Special Instructions"
              name="specialInstructions"
              value={editableData.specialInstructions}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Cargo"
              name="cargo"
              value={editableData.cargo}
              onChange={handleInputChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editableData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="default">1- Default</MenuItem>
                <MenuItem value="Draft">2- Draft</MenuItem>
                <MenuItem value="Issued">3- Issued</MenuItem>
                <MenuItem value="Active">4- Active</MenuItem>
                <MenuItem value="InTransit">5- InTransit</MenuItem>
                <MenuItem value="Transferred">6- Transferred</MenuItem>
                <MenuItem value="Amended">7- Amended</MenuItem>
                <MenuItem value="Surrendered">8- Surrendered</MenuItem>
                <MenuItem value="Switched">9- Switched</MenuItem>
                <MenuItem value="Released">10- Released</MenuItem>
                <MenuItem value="Accomplished">11- Accomplished</MenuItem>
                <MenuItem value="Cancelled">12- Cancelled</MenuItem>
                <MenuItem value="Expired">13- Expired</MenuItem>
                <MenuItem value="Disputed">14- Disputed</MenuItem>
                <MenuItem value="Archived">15- Archived</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Owner"
              name="owner"
              value={editableData.owner}
              onChange={handleInputChange}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={isLoading || !wallet.publicKey}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Register Bill of Lading'}
            </Button>
          </Box>
        )}

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
    </Box>
  );
};

export default UploadBL;
