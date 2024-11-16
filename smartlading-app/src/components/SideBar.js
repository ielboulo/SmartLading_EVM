import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const SIDEBAR_WIDTH = 260; // Fixed width in pixels

const SidebarItem = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  width: '100%',
  '&.active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { label: '⛯ Home', path: '/' },
    { label: '⚓ Register Bill of Lading', path: '/app/register' },
    { label: '🛳️ Upload Bill of Lading', path: '/app/uploadBL' },
    { label: '🗺️ Dashboard', path: '/app/dashboard' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        overflow: 'auto',
        flexShrink: 0 // Prevent sidebar from shrinking
      }}
    >
      <Box>
        <List disablePadding>
          {links.map((link) => (
            <StyledListItem key={link.path} disablePadding>
              <StyledLink
                to={link.path}
                className={location.pathname.startsWith(link.path) ? 'active' : ''}
              >
                <SidebarItem>{link.label}</SidebarItem>
              </StyledLink>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Sidebar;