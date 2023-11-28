// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import useUpdateClickCount from './useUpdateClickCount'; // Adjust the path based on your project structure

// // const URLList = () => {
// //   const [urlList, setUrlList] = useState([]);

// //   useEffect(() => {
// //     const fetchUrlList = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:6060/api/url-list');
// //         setUrlList(response.data);
// //       } catch (error) {
// //         console.error('Error fetching URL list:', error);
// //         // Handle error cases
// //       }
// //     };

// //     fetchUrlList();
// //   }, []);

// //   const { clickCount, handleUpdateClickCount } = useUpdateClickCount();

// //   const handleShortUrlClick = async (event, urlId, index) => {
// //     event.preventDefault();
// //     handleUpdateClickCount(urlId);
// //     // You can also handle the URL opening here if needed
// //   };

// //   return (
// //     <div className="url-list-container">
// //       <h2 className="url-list-heading">URL List</h2>
// //       <table className="url-list-table">
// //         <thead>
// //           <tr>
// //             <th>Short URL</th>
// //             <th>Long URL</th>
// //             <th>Click Count</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {urlList.map((url, index) => (
// //             <tr key={index}>
// //               <td>
// //                 <a href={url.shortURL} target="_blank" rel="noopener noreferrer" onClick={(e) => handleShortUrlClick(e, url._id, index)}>
// //                   {url.shortURL}
// //                 </a>
// //               </td>
// //               <td>
// //                 <div className="long-url-container">
// //                   <span className="long-url-text">{url.longURL}</span>
// //                 </div>
// //               </td>
// //               <td>{clickCount}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default URLList;





// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import useUpdateClickCount from './useUpdateClickCount'; // Adjust the path based on your project structure

// // const URLList = () => {
// //   const [urlList, setUrlList] = useState([]);

// //   useEffect(() => {
// //     const fetchUrlList = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:6060/api/url-list');
// //         setUrlList(response.data);
// //       } catch (error) {
// //         console.error('Error fetching URL list:', error);
// //         // Handle error cases
// //       }
// //     };

// //     fetchUrlList();
// //   }, []);

// //   const { clickCount, handleUpdateClickCount } = useUpdateClickCount();

// //   const handleShortUrlClick = async (event, urlId, index) => {
// //     event.preventDefault();
// //     handleUpdateClickCount(urlId);
// //     // You can also handle the URL opening here if needed
// //   };

// //   return (
// //     <div className="url-list-container">
// //       <h2 className="url-list-heading">URL List</h2>
// //       <table className="url-list-table">
// //         <thead>
// //           <tr>
// //             <th>Short URL</th>
// //             <th>Long URL</th>
// //             <th>Click Count</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {urlList.map((url, index) => (
// //             <tr key={index}>
// //               <td>
// //                 <a href={url.shortURL} target="_blank" rel="noopener noreferrer" onClick={(e) => handleShortUrlClick(e, url._id, index)}>
// //                   {url.shortURL}
// //                 </a>
// //               </td>
// //               <td>
// //                 <div className="long-url-container">
// //                   <span className="long-url-text">{url.longURL}</span>
// //                 </div>
// //               </td>
// //               <td>{clickCount}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default URLList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTrash, FaCopy } from 'react-icons/fa';
// // import { FaTrash } from 'react-icons/fa'; 
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const URLList = () => {
//   const [urlList, setUrlList] = useState([]);
//   const [copiedUrlId, setCopiedUrlId] = useState(null);
//   const [copyCount, setCopyCount] = useState(0);

//   useEffect(() => {
//     const fetchUrlList = async () => {
//       try {
//         const response = await axios.get('http://localhost:6060/api/urls/url-list');
//         setUrlList(response.data);
//       } catch (error) {
//         console.error('Error fetching URL list:', error);
//         // Handle error cases
//       }
//     };

//     fetchUrlList();
//   }, []);

//   const handleShortUrlClick = async (url) => {
//     window.open(url, '_blank');
//   };

//   const handleCopyUrl = async (urlId) => {
//     try {
//       const shortURL = urlList.find((url) => url._id === urlId).shortURL;
//       await navigator.clipboard.writeText(shortURL);
//       setCopiedUrlId(urlId);

//       // Increment copy count
//       setCopyCount((prevCount) => prevCount + 1);

//       // Set a timer to reset the copiedUrlId after 2 seconds
//       setTimeout(() => {
//         setCopiedUrlId(null);
//       }, 2000);

//       // Send copy count to the server
//       await axios.post('http://localhost:6060/api/urls/copy-count', {
//         urlId,
//         copyCount,
//       });
//     } catch (error) {
//       console.error('Error copying URL:', error);
//       // Handle error cases
//     }
//   };

//   const handleDeleteUrl = async (urlId) => {
//     console.log('URL ID to be deleted:', urlId);
//     try {
//       await axios.delete(`http://localhost:6060/api/urls/${urlId}`);
//       setUrlList((prevUrlList) => prevUrlList.filter((url) => url._id !== urlId));
//     window.open(url, '_blank'); // Open the link in a new tab without the localhost prefix
//   };

//   const handleDeleteUrl = async (urlId) => {
//     console.log('URL ID to be deleted:', urlId);
//     try {
//       await axios.delete(`http://localhost:6060/api/urls/${urlId}`);
//       setUrlList((prevUrlList) => prevUrlList.filter((url) => url._id !== urlId));
//       toast.success('You have delete the url successfully!');
//     } catch (error) {
//       console.error('Error deleting URL:', error);
//       // Handle error cases
//     }
//   };

//   return (
//     <div className="url-list-container">
//       <h2 className="url-list-heading">URL List</h2>
//       <table className="url-list-table">
//         <thead>
//           <tr>
//             <th>Short URL</th>
//             <th>Long URL</th>
//             <th>Actions</th>
//             <th>Delete</th>

//           </tr>
//         </thead>
//         <tbody>
//           {urlList.map((url, index) => (
//             <tr key={index}>
//               <td>
//                 <div className="short-url-container">
//                   <button onClick={() => handleShortUrlClick(url.shortURL)}>
//                     {url.shortURL}
//                   </button>
//                   {copiedUrlId === url._id && <span className="copy-indicator">Copied!</span>}
//                 </div>
//                 <button onClick={() => handleShortUrlClick(url.shortURL)}>
//                   {url.shortURL}
//                 </button>
//               </td>
//               <td>
//                 <div className="long-url-container">
//                   <span className="long-url-text">{url.longURL}</span>
//                 </div>
//               </td>
//               <td>
//                 <div className="actions-container">
//                   <button onClick={() => handleCopyUrl(url._id)}>
//                     <FaCopy size={18} />
//                   </button>
//                   <button onClick={() => handleDeleteUrl(url._id)}>
//                     <FaTrash size={18} />
//                   </button>
//                 </div>

//                 <button onClick={() => handleDeleteUrl(url._id)}>
//                   <FaTrash size={18} />
//                 </button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//             <ToastContainer />
//     </div>
//   );
// };


// export default URLList;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCopy } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URLList = () => {
  const [urlList, setUrlList] = useState([]);
  const [copiedUrlId, setCopiedUrlId] = useState(null);
  const [copyCount, setCopyCount] = useState(0);

  useEffect(() => {
    const fetchUrlList = async () => {
      try {
        const response = await axios.get('http://localhost:6060/api/urls/url-list');
        setUrlList(response.data);
      } catch (error) {
        console.error('Error fetching URL list:', error);
        // Handle error cases
      }
    };

    fetchUrlList();
  }, []);

  const handleShortUrlClick = (url) => {
    window.open(url, '_blank');
  };

  const handleCopyUrl = async (urlId) => {
    try {
      const shortURL = urlList.find((url) => url._id === urlId).shortURL;
      await navigator.clipboard.writeText(shortURL);
      setCopiedUrlId(urlId);

      // Increment copy count
      setCopyCount((prevCount) => prevCount + 1);

      // Set a timer to reset the copiedUrlId after 2 seconds
      setTimeout(() => {
        setCopiedUrlId(null);
      }, 2000);

      // Send copy count to the server
      await axios.post('http://localhost:6060/api/urls/copy-count', {
        urlId,
        copyCount,
      });
    } catch (error) {
      console.error('Error copying URL:', error);
      // Handle error cases
    }
  };

  const handleDeleteUrl = async (urlId) => {
    try {
      await axios.delete(`http://localhost:6060/api/urls/${urlId}`);
      setUrlList((prevUrlList) => prevUrlList.filter((url) => url._id !== urlId));
      toast.success('URL deleted successfully!');
    } catch (error) {
      console.error('Error deleting URL:', error);
      toast.error('Error deleting URL');
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urlList.map((url, index) => (
            <tr key={index}>
              <td>
                <div className="short-url-container">
                  <button onClick={() => handleShortUrlClick(url.shortURL)}>
                    {url.shortURL}
                  </button>
                  {copiedUrlId === url._id && <span className="copy-indicator">Copied!</span>}
                </div>
              </td>
              <td>
                <div className="long-url-container">
                  <span className="long-url-text">{url.longURL}</span>
                </div>
              </td>
              <td>
                <div className="actions-container">
                  <button onClick={() => handleCopyUrl(url._id)}>
                    <FaCopy size={18} />
                  </button>
                  <button onClick={() => handleDeleteUrl(url._id)}>
                    <FaTrash size={18} />
                  </button>
                </div>
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
