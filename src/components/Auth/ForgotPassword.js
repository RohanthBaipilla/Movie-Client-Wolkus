import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toast';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('https://movie-server-wolkus.onrender.com/request-reset-password', { email });
      setMessage(response.data.message);
      toast.success("Reset link sent successfully");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error requesting password reset');
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <form className="forgot-password-form">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="button" onClick={handleForgotPassword}>Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
