import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled } from '@mui/material/styles';
import filledBOL from '../asset/Bill_of_Lading_examples/Bill_of_Lading_filled.png';
import emptyBOL from '../asset/Bill_of_Lading_examples/Bill_of_Lading_empty.png';

import { Card, CardContent, CardHeader, Stack} from '@mui/material';
  import { 
    SwapHoriz as TransferIcon, 
    Update as UpdateIcon 
  } from '@mui/icons-material';
import TimelineStatus from './TimelineStatus';

// Styled components for the vertical timeline
const VerticalTimelineConnector = styled(TimelineConnector)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 2,
}));

const mockBLData = {
  'BOL001': {
    owner: 'CMA CGM',
    image: filledBOL,
    status: 'Active',
    statusHistory: [
      { status: 'Created', date: '2023-01-01' },
      { status: 'Pending', date: '2023-01-05' },
      { status: 'Active', date: '2023-01-10' },
    ]
  },
  'BOL002': {
    owner: 'MSC',
    image: emptyBOL,
    status: 'Pending',
    statusHistory: [
      { status: 'Created', date: '2023-02-01' },
      { status: 'Pending', date: '2023-02-03' },
    ]
  },
};

const statusOptions = ['Active', 'Pending', 'Completed', 'Cancelled'];

const BillOfLadingDetails = () => {
  const { bolNumber } = useParams();
  const navigate = useNavigate();
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newOwner, setNewOwner] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const blData = mockBLData[bolNumber] || { owner: 'Unknown', image: null, status: 'Unknown', statusHistory: [] };

  const handleSendToNewOwner = () => setOpenOwnerDialog(true);
  const handleUpdateStatus = () => setOpenStatusDialog(true);
  const handleCloseOwnerDialog = () => setOpenOwnerDialog(false);
  const handleCloseStatusDialog = () => setOpenStatusDialog(false);
  
  const handleConfirmTransfer = () => {
    console.log(`Transferring ${bolNumber} to ${newOwner}`);
    handleCloseOwnerDialog();
  };

  const handleConfirmStatusUpdate = () => {
    console.log(`Updating status of ${bolNumber} to ${newStatus}`);
    handleCloseStatusDialog();
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bill of Lading: {bolNumber}
        </Typography>

        <Box sx={{ my: 3 }}>
          <img
            src={blData.image}
            alt={`Bill of Lading ${bolNumber}`}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
        </Box>

        <Card>
          <CardHeader
            title={`BOL Owner: ${blData.owner}`}
            subheader={`Current Status: ${blData.status}`}
            />
            <CardContent>
            <TimelineStatus statusHistory={blData.statusHistory} />
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ p: 2 }}>
          <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ px: 2 }}
          >
            <Button
            variant="contained"
            color="primary"
            startIcon={<TransferIcon />}
            onClick={handleSendToNewOwner}
            fullWidth
            sx={{ py: 1.5 }}
            >
              Transfer Ownership
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<UpdateIcon />}
              onClick={handleUpdateStatus}
              fullWidth
              sx={{ py: 1.5 }}
              >
              Update Status
            </Button>
          </Stack>
        </Card>

        <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mt: 3 }}>
          Back to Dashboard
        </Button>
      </Paper>

      {/* Dialog for transferring ownership */}
      <Dialog open={openOwnerDialog} onClose={handleCloseOwnerDialog}>
        <DialogTitle>Transfer Bill of Lading</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newOwner"
            label="New Owner"
            type="text"
            fullWidth
            variant="standard"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOwnerDialog}>Cancel</Button>
          <Button onClick={handleConfirmTransfer}>Confirm Transfer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for updating status */}
      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
        <DialogTitle>Update Bill of Lading Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
            <InputLabel id="status-select-label">New Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>Cancel</Button>
          <Button onClick={handleConfirmStatusUpdate}>Update Status</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillOfLadingDetails;
