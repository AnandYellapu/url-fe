import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:6060/api/users/forgot-password', { email });
      // setMessage('An email has been sent with further instructions.');
      toast.success('An Reset Password Token is sent to your mail.');
      navigate('/reset-Password/:token');
    } catch (error) {
      setMessage('Failed to send reset password email.');
      toast.error('Failed to send reset password email');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className='button1'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      </div>
      <ToastContainer />
      </div>
  );
};

export default ForgotPassword;