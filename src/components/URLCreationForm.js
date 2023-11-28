import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoCopyOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URLCreationForm = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    try {
      const authToken = localStorage.getItem('authToken');
      // console.log('Decoded Token:', authToken); // Log the entire authToken
      
      const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
      // console.log('Decoded Token:', decodedToken);
      
      setUserRole(decodedToken.role);
      // console.log('User Role:', decodedToken.role);
    } catch (error) {
      console.error('Error decoding user role from authToken:', error);
    }
  }, []);
  
  

  const createShortURL = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await axios.post(
        'http://localhost:6060/api/urls/create-url',
        { longURL },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const { shortURL } = response.data;
      setShortURL(shortURL);
      setErrorMessage('');

      // Display success toast
      toast.success('Short URL created successfully!');
    } catch (error) {
      setErrorMessage('Error occurred while creating short URL');
      console.error(error);

      // Display error toast
      toast.error('Error occurred while creating short URL');
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortURL)
      .then(() => {
        // Display success toast when copied successfully
        toast.success('Short URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        // Display error toast when copying fails
        toast.error('Error copying to clipboard');
      });
  };

  return (
    <div className="url-creation-container">
      <h2 className="url-creation-heading">Create a Short URL</h2>
      <form className="url-creation-form" onSubmit={(e) => { e.preventDefault(); createShortURL(); }}>
        <label htmlFor="long-url">Enter Long URL:</label>
        <input
          type="text"
          id="long-url"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          required
        />
        <button type="submit">Create Short URL</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {shortURL && (
        <div className="url-creation-short-url">
          <h3>Short URL:</h3>
          <p>
            <a href={shortURL} rel="noreferrer" target="_blank">
              {shortURL}
            </a>
            <span className="copy-icon-container" onClick={handleCopyClick}>
              <IoCopyOutline size={25} />
            </span>
          </p>
        </div>
      )}
      <div className="dropdown-container">
        <label htmlFor="dropdown">Select a page:</label>
        
        {userRole === 'admin' && (
          <>
          <Link to="/url-list" className="dropdown-link">
          All URL List
        </Link>
            <Link to="/chart" className="dropdown-link">
              Chart
            </Link>
            <Link to="/dashboard" className="dropdown-link">
              Dashboard
            </Link>
          </>
        )}
        {userRole === 'user' && (
         <>
         <Link to="/user-url-list" className="dropdown-link">
         URL List
       </Link>

          <Link to="/user-charts" className="dropdown-link">
            Your Charts
          </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default URLCreationForm;
