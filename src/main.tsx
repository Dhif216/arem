import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 💡 IMPORT THE i18n CONFIG
import './i18n.ts'; 
// Env sanity checks (non-blocking).
import './envCheck';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Suspense for i18n loading - no visual fallback needed */}
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);