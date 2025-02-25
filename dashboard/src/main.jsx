import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import store from './store'; // Ensure this path is correct
import App from './App'; // Your main App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);