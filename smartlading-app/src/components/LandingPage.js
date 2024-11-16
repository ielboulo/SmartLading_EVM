import React from 'react';
import Navbar from './LP/Navbar';
import Hero from './LP/Hero';
import Features from './LP/Features';
import Technology from './LP/Technology';
import Footer from './LP/Footer';
import './LP/index.css';
 
function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Technology />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;


// // src/components/LandingPage.js
// import React from 'react';
// import { Box, Button, Typography, Container } from '@mui/material';
// //import welcomeImage from '../asset/smartlading_home.png';

// const LandingPage = () => {
//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         //backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${welcomeImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white' }}>
//         <Typography
//           variant="h2"
//           component="h1"
//           sx={{ 
//             mb: 4,
//             fontWeight: 'bold',
//             textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
//           }}
//         >
//           Welcome to SmartLading Platform
//         </Typography>
//         <Typography
//           variant="h5"
//           sx={{ 
//             mb: 6,
//             textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
//           }}
//         >
//           Revolutionizing Maritime Documentation with Blockchain Technology
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary"
//           size="large"
//           href="/app/dashboard"
//           sx={{ 
//             px: 6,
//             py: 2,
//             fontSize: '1.2rem',
//             backgroundColor: 'primary.main',
//             '&:hover': {
//               backgroundColor: 'primary.dark',
//             }
//           }}
//         >
//           Get Started
//         </Button>
//       </Container>
//     </Box>
//   );
// };

// export default LandingPage;