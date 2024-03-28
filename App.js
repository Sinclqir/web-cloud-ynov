import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import PhoneAuthScreen from './PhoneAuthScreen'; // Ajoutez cette ligne
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/phone-auth" element={<PhoneAuthScreen />} /> {/* Ajoutez cette ligne */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}
