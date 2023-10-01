// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useUpdateClickCount from './useUpdateClickCount'; // Adjust the path based on your project structure

// const URLList = () => {
//   const [urlList, setUrlList] = useState([]);

//   useEffect(() => {
//     const fetchUrlList = async () => {
//       try {
//         const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/url-list');
//         setUrlList(response.data);
//       } catch (error) {
//         console.error('Error fetching URL list:', error);
//         // Handle error cases
//       }
//     };

//     fetchUrlList();
//   }, []);

//   const { clickCount, handleUpdateClickCount } = useUpdateClickCount();

//   const handleShortUrlClick = async (event, urlId, index) => {
//     event.preventDefault();
//     handleUpdateClickCount(urlId);
//     // You can also handle the URL opening here if needed
//   };

//   return (
//     <div className="url-list-container">
//       <h2 className="url-list-heading">URL List</h2>
//       <table className="url-list-table">
//         <thead>
//           <tr>
//             <th>Short URL</th>
//             <th>Long URL</th>
//             <th>Click Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {urlList.map((url, index) => (
//             <tr key={index}>
//               <td>
//                 <a href={url.shortURL} target="_blank" rel="noopener noreferrer" onClick={(e) => handleShortUrlClick(e, url._id, index)}>
//                   {url.shortURL}
//                 </a>
//               </td>
//               <td>
//                 <div className="long-url-container">
//                   <span className="long-url-text">{url.longURL}</span>
//                 </div>
//               </td>
//               <td>{clickCount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default URLList;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useUpdateClickCount from './useUpdateClickCount'; // Adjust the path based on your project structure

// const URLList = () => {
//   const [urlList, setUrlList] = useState([]);

//   useEffect(() => {
//     const fetchUrlList = async () => {
//       try {
//         const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/url-list');
//         setUrlList(response.data);
//       } catch (error) {
//         console.error('Error fetching URL list:', error);
//         // Handle error cases
//       }
//     };

//     fetchUrlList();
//   }, []);

//   const { clickCount, handleUpdateClickCount } = useUpdateClickCount();

//   const handleShortUrlClick = async (event, urlId, index) => {
//     event.preventDefault();
//     handleUpdateClickCount(urlId);
//     // You can also handle the URL opening here if needed
//   };

//   return (
//     <div className="url-list-container">
//       <h2 className="url-list-heading">URL List</h2>
//       <table className="url-list-table">
//         <thead>
//           <tr>
//             <th>Short URL</th>
//             <th>Long URL</th>
//             <th>Click Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {urlList.map((url, index) => (
//             <tr key={index}>
//               <td>
//                 <a href={url.shortURL} target="_blank" rel="noopener noreferrer" onClick={(e) => handleShortUrlClick(e, url._id, index)}>
//                   {url.shortURL}
//                 </a>
//               </td>
//               <td>
//                 <div className="long-url-container">
//                   <span className="long-url-text">{url.longURL}</span>
//                 </div>
//               </td>
//               <td>{clickCount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default URLList;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleShortUrlClick = async (url) => {
    window.open(url, '_blank'); // Open the link in a new tab without the localhost prefix
  };

  const handleDeleteUrl = async (urlId) => {
    console.log('URL ID to be deleted:', urlId);
    try {
      await axios.delete(`https://url-shortener-ax8r.onrender.com/api/urls/${urlId}`);
      setUrlList((prevUrlList) => prevUrlList.filter((url) => url._id !== urlId));
      toast.success('You have delete the url successfully!');
    } catch (error) {
      console.error('Error deleting URL:', error);
      // Handle error cases
    }
  };

  return (
    <div className="url-list-container">
      <h2 className="url-list-heading">URL List</h2>
      <table className="url-list-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {urlList.map((url, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleShortUrlClick(url.shortURL)}>
                  {url.shortURL}
                </button>
              </td>
              <td>
                <div className="long-url-container">
                  <span className="long-url-text">{url.longURL}</span>
                </div>
              </td>
              <td>
                <button onClick={() => handleDeleteUrl(url._id)}>
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            <ToastContainer />
    </div>
  );
};

export default URLList;


