import React, { useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Button
} from '@mui/material';

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import worldGeoData from '../asset/countries-110m.json';

import { useNavigate } from 'react-router-dom';

// Enum for Bill of Lading status
const BolStatus = {
  InTransit: 'In Transit',
  Delivered: 'Delivered',
  Processing: 'Processing',
  Cancelled: 'Cancelled',
};

// Mock data with added location
const mockData = [
  { number: 'BOL001', owner: 'CMA CGM', status: BolStatus.InTransit, value: 3.5, location: [-74, 40] },
  { number: 'BOL002', owner: 'MSC', status: BolStatus.Delivered, value: 2.3, location: [3, 51] },
  { number: 'BOL003', owner: 'MAERSK', status: BolStatus.Processing, value: 0.8, location: [121, 31] },
  { number: 'BOL004', owner: 'LLOYDE', status: BolStatus.Cancelled, value: 1.1, location: [-5.80, 35.78] },
  { number: 'BOL005', owner: 'HANN', status: BolStatus.Delivered, value: 1.2, location: [139, 35] },
];

const Dashboard = () => {

  const navigate = useNavigate();
  const maxValue = Math.max(...mockData.map(bol => bol.value));
  const sizeScale = scaleLinear().domain([0, maxValue]).range([4, 15]);

  const statusStyles = useMemo(() => ({
    [BolStatus.Delivered]: { backgroundColor: '#e8f5e9', color: '#2e7d32' },
    [BolStatus.InTransit]: { backgroundColor: '#fff8e1', color: '#f57f17' },
    [BolStatus.Processing]: { backgroundColor: '#e3f2fd', color: '#1565c0' },
    [BolStatus.Cancelled]: { backgroundColor: '#ffebee', color: '#c62828' },
  }), []);

  const getStatusColor = (status) => {
    switch (status) {
      case BolStatus.Delivered: return "#2e7d32";
      case BolStatus.InTransit: return "#f57f17";
      case BolStatus.Processing: return "#1565c0";
      case BolStatus.Cancelled: return "#c62828";
      default: return "#000000";
    }
  };

  const handleShowBL = (bolNumber) => {
    navigate(`/app/bill-of-lading/${bolNumber}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bill of Lading Dashboard
      </Typography>


      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number of Lading</TableCell>
              <TableCell>eBL Owner</TableCell>
              <TableCell>eBL Status</TableCell>
              <TableCell>Value in $M</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((bol) => (
              <TableRow key={bol.number}>
                <TableCell>{bol.number}</TableCell>
                <TableCell>{bol.owner}</TableCell>
                <TableCell>
                  <Chip
                    label={bol.status}
                    style={statusStyles[bol.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>${bol.value.toFixed(2)}M</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleShowBL(bol.number)}
                  >
                    Show BL
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', height: 400, mb: 4 }}>
        <ComposableMap projection="geoMercator" >         
             <Geographies geography={worldGeoData}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {mockData.map((bol) => (
            <Marker key={bol.number} coordinates={bol.location}>
              <circle 
                r={sizeScale(bol.value)} 
                fill={getStatusColor(bol.status)}
                stroke="#fff"
                strokeWidth={2}
              />
            </Marker>
          ))}
        </ComposableMap>
      </Box>
    </Box>
  );
};

export default Dashboard;