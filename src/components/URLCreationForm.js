import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoCopyOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URLCreationForm = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://url-shortener-ax8r.onrender.com/api/create-url', { longURL });
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
    // Copy the short URL to the clipboard
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
      <form className="url-creation-form" onSubmit={handleSubmit}>
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
        <Link to="/url-list" className="dropdown-link">
          URL List
        </Link>
        <Link to="/chart" className="dropdown-link">
          Chart
        </Link>
        <Link to="/dashboard" className="dropdown-link">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default URLCreationForm;