import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { initializeClarity } from './lib/clarity';
import { initializeSentry } from './lib/sentry';
import './styles/globals.css';
import './styles/print.css';

initializeSentry();
initializeClarity();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Toolzi still works without offline install support.
    });
  });
}
