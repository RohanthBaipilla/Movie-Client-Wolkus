import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { ToastContainer, toast } from 'react-toast';
import Cookies from 'js-cookie';

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://movie-server-wolkus.onrender.com/signin', form);
      console.log(res.data.isVerified);
      if(!res.data.isVerified || res.data.isVerified === undefined){
        toast.error("UnVerfied Email")
      }
      else{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', form.email);
      Cookies.set('logout', 'this is cookie set for auto', { expires: 1 / 48 });
      toast.success("Logged In successfully");
      navigate('/');}
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };
  return (
    <div className="signin-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signin-button">Sign In</button>
        <Link to="/forgot-password">Forgot Password</Link>
      </form>
    </div>
  );
}

export default SignIn;
