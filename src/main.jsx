import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import './index.css';
import App from './App';

const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {hasClerk ? (
      <ClerkProvider>
        <App />
      </ClerkProvider>
    ) : (
      <App />
    )}
  </StrictMode>
);
