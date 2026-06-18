import { initializeSentry, trackPageLoadTime } from './instrument';
import React from 'react';
import * as Sentry from '@sentry/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { initializeClarity } from './lib/clarity';
import './styles/globals.css';
import './styles/print.css';

initializeSentry();
initializeClarity();

if (document.readyState === 'complete') {
  trackPageLoadTime();
} else {
  window.addEventListener('load', trackPageLoadTime, { once: true });
}

ReactDOM.createRoot(document.getElementById('root')!, {
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(
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
