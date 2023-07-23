// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const URLCreationForm = () => {
//   const [longURL, setLongURL] = useState('');
//   const [shortURL, setShortURL] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:6060/api/create-url', { longURL });
//       const { shortURL } = response.data;

//       setShortURL(shortURL);
//       setErrorMessage('');
//     } catch (error) {
//       setErrorMessage('Error occurred while creating short URL');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="url-creation-container">
//       <h2 className="url-creation-heading">Create a Short URL</h2>
//       <form className="url-creation-form" onSubmit={handleSubmit}>
//         <label htmlFor="long-url">Enter Long URL:</label>
//         <input
//           type="text"
//           id="long-url"
//           value={longURL}
//           onChange={(e) => setLongURL(e.target.value)}
//           required
//         />
//         <button type="submit">Create Short URL</button>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {shortURL && (
//         <div className="url-creation-short-url">
//           <h3>Short URL:</h3>
//           <p>
//              <a href={`${window.location.origin}${shortURL}`} rel="noreferrer" target="_blank">
//               {shortURL}
//             </a>
//           </p>
//         </div>
//       )}
//       <div className="dropdown-container">
//         <label htmlFor="dropdown">Select a page:</label>
//         <Link to="/url-list" className="dropdown-link">
//           URL List
//         </Link>
//         <Link to="/chart" className="dropdown-link">
//           Chart
//         </Link>
//         <Link to="/dashboard" className="dropdown-link">
//           Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default URLCreationForm;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const URLCreationForm = () => {
//   const [longURL, setLongURL] = useState('');
//   const [shortURL, setShortURL] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:6060/api/create-url', { longURL });
//       const { shortURL } = response.data;

//       setShortURL(shortURL);
//       setErrorMessage('');
//     } catch (error) {
//       setErrorMessage('Error occurred while creating short URL');
//       console.error(error);
//     }
//   };

//   const handleCopyClick = () => {
//     // Copy the short URL to the clipboard
//     navigator.clipboard.writeText(shortURL)
//       .then(() => alert('Short URL copied to clipboard!'))
//       .catch((error) => console.error('Error copying to clipboard:', error));
//   };

//   return (
//     <div className="url-creation-container">
//       <h2 className="url-creation-heading">Create a Short URL</h2>
//       <form className="url-creation-form" onSubmit={handleSubmit}>
//         <label htmlFor="long-url">Enter Long URL:</label>
//         <input
//           type="text"
//           id="long-url"
//           value={longURL}
//           onChange={(e) => setLongURL(e.target.value)}
//           required
//         />
//         <button type="submit">Create Short URL</button>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {shortURL && (
//         <div className="url-creation-short-url">
//           <h3>Short URL:</h3>
//           <p>
//             <a href={shortURL} rel="noreferrer" target="_blank">
//               {shortURL}
//             </a>
//           </p>
//           <button onClick={handleCopyClick} className='button2'>Copy Short URL</button>
//         </div>
//       )}
//       <div className="dropdown-container">
//         <label htmlFor="dropdown">Select a page:</label>
//         <Link to="/url-list" className="dropdown-link">
//           URL List
//         </Link>
//         <Link to="/chart" className="dropdown-link">
//           Chart
//         </Link>
//         <Link to="/dashboard" className="dropdown-link">
//           Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default URLCreationForm;





import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoCopyOutline } from 'react-icons/io5';

const URLCreationForm = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:6060/api/create-url', { longURL });
      const { shortURL } = response.data;

      setShortURL(shortURL);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error occurred while creating short URL');
      console.error(error);
    }
  };

  const handleCopyClick = () => {
    // Copy the short URL to the clipboard
    navigator.clipboard.writeText(shortURL)
      .then(() => alert('Short URL copied to clipboard!'))
      .catch((error) => console.error('Error copying to clipboard:', error));
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
