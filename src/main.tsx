import { Buffer } from 'buffer';
window.Buffer = Buffer;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Font imports
import '@fontsource/poppins/400.css';  // Regular weight
import '@fontsource/poppins/700.css';  // Bold weight

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
