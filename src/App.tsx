import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard'
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
}

export default App;
