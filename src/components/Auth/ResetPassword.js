import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('https://movie-server-wolkus.onrender.com/reset-password', {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      toast.success("Password Updated Successfully");
      setTimeout(() => {
        navigate('/signin');
      }, 5000);
    } catch (error) {
      if (error.response) {
        setMessage('Error resetting password');
        toast.error(error.response.data.message);
      } else {
        setMessage('Error resetting password');
        toast.error('Error resetting password');
      }
    }
  };

  return (
    <div className="reset-password-container">
      <ToastContainer />
      <form className="reset-password-form">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ResetPassword;
