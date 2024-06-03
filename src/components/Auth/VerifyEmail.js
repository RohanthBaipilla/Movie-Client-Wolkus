import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [verificationMessage, setVerificationMessage] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://movie-server-wolkus.onrender.com/verify-email?token=${token}`);
        setVerificationMessage(response.data.message);
      } catch (error) {
        if (error.response) {
          setVerificationMessage(error.response.data.message);
        } else {
          setVerificationMessage('Error verifying email');
        }
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div style={{marginTop:"90px", color:"white"}}>
      <h2>Email Verification</h2>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default VerifyEmail;
