import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeConfigProvider } from './context/ThemeConfigContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeConfigProvider>
      <App />
    </ThemeConfigProvider>
  </React.StrictMode>
);
