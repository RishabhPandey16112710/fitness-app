import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupLogin from './components/SignupLogin';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
