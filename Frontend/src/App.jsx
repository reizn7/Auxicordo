import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import NoteState from './context/notes/noteState';

function AppContent() {
  const location = useLocation();
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ msg: message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };


  return (
    <>
      <Navbar />
      <Alert alert={alert} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <NoteState>
      <Router>
        <AppContent />
      </Router>
    </NoteState>
  );
}

export default App;
