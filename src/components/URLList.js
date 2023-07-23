import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUpdateClickCount from './useUpdateClickCount'; // Adjust the path based on your project structure

const URLList = () => {
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    const fetchUrlList = async () => {
      try {
        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/url-list');
        setUrlList(response.data);
      } catch (error) {
        console.error('Error fetching URL list:', error);
        // Handle error cases
      }
    };

    fetchUrlList();
  }, []);

  const { clickCount, handleUpdateClickCount } = useUpdateClickCount();

  const handleShortUrlClick = async (event, urlId, index) => {
    event.preventDefault();
    handleUpdateClickCount(urlId);
    // You can also handle the URL opening here if needed
  };

  return (
    <div className="url-list-container">
      <h2 className="url-list-heading">URL List</h2>
      <table className="url-list-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urlList.map((url, index) => (
            <tr key={index}>
              <td>
                <a href={url.shortURL} target="_blank" rel="noopener noreferrer" onClick={(e) => handleShortUrlClick(e, url._id, index)}>
                  {url.shortURL}
                </a>
              </td>
              <td>
                <div className="long-url-container">
                  <span className="long-url-text">{url.longURL}</span>
                </div>
              </td>
              <td>{clickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLList;
