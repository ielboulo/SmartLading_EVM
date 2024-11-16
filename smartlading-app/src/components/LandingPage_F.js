import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './LandingPage';
import './index.css';
import LandingPage from './LandingPage';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LandingPage />
  </StrictMode>
);