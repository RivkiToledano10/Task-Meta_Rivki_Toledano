import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './app/store.js'
import { StyledEngineProvider } from '@mui/material/styles';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <StyledEngineProvider injectFirst>

    <App />
    </StyledEngineProvider>

    </Provider>
  </React.StrictMode>
);


reportWebVitals();
