import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';
import Branches from './components/Branches.js';

function App() {
  return (
      <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Branches />}
        />
         </Routes>
    </Router>
  );
}

export default App;
