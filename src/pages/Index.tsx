import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Assurez-vous que le CSS est bien importé
import Home from './Home'; // Vérifiez que le chemin est correct pour Home

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
