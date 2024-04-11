import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LocalProvider } from './LocalContext';
import reportWebVitals from './reportWebVitals';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalProvider>
        <App/>
      </LocalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
