import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Snackbar, Tooltip, Checkbox, Button, TextField, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete, FileCopy, Search } from '@mui/icons-material';
import { RingLoader } from 'react-spinners';
import Pagination from '../pages/Pagination';
import ConfirmationDialog from '../pages/ConfirmationDialog';

const UserURLList = () => {
  const [urlList, setUrlList] = useState([]);
  const [filteredUrlList, setFilteredUrlList] = useState([]);
  const [copiedUrlId, setCopiedUrlId] = useState(null);
  const [copyCount, setCopyCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [deleteUrlId, setDeleteUrlId] = useState(null);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullUrlModal, setShowFullUrlModal] = useState(null); // State to control modal visibility
  const [selectedFullUrl, setSelectedFullUrl] = useState(''); // State to store full URL for modal
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by createdAt
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order

 

  useEffect(() => {
    const fetchUrlList = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem('authToken');
  
        if (!authToken) {
          console.error('Authentication token missing');
          // Handle the case where the authentication token is missing
          return;
        }
  
        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/user-url-list', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
  
        let sortedList = [...response.data];
        if (sortBy) {
          sortedList.sort((a, b) => {
            if (sortOrder === 'asc') {
              return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
              return a[sortBy] < b[sortBy] ? 1 : -1;
            }
          });
        }
  
        setUrlList(sortedList);
        setTotalPages(Math.ceil(sortedList.length / 10));
  
        // Apply search filter
        applySearch(sortedList, searchTerm);
      } catch (error) {
        console.error('Error fetching URL list:', error);
  
        if (error.response && error.response.status === 403) {
          console.error('Invalid or expired authentication token');
          // Handle invalid or expired token, e.g., redirect to the login page
        } else {
          setError('Error fetching URL list');
        }
      }
      setLoading(false);
    };
  
    fetchUrlList();
  }, [searchTerm, sortBy, sortOrder]); //eslint-disable-line
  




  const applySearch = (data, term) => {
    const filteredList = data.filter(
      (url) =>
        url.shortURL.toLowerCase().includes(term.toLowerCase()) ||
        url.longURL.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUrlList(filteredList);
    setCurrentPage(1); // Reset current page when applying search
    setTotalPages(Math.ceil(filteredList.length / 10));
  };

  const applySorting = (data, sortBy, order) => {            //eslint-disable-line
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    setUrlList(sortedData);
    setFilteredUrlList(sortedData);
    setCurrentPage(1); // Reset current page when applying sorting
    setTotalPages(Math.ceil(sortedData.length / 10));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleShortUrlClick = async (url) => {
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
      await axios.post('https://url-shortener-ax8r.onrender.com/api/urls/copy-count', {
        urlId,
        copyCount,
      });

      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error copying URL:', error);
      // Handle error cases
    }
  };

  const handleDeleteUrl = async () => {
    if (!deleteUrlId) return;
    console.log('URL ID to be deleted:', deleteUrlId);
    try {
      await axios.delete(`https://url-shortener-ax8r.onrender.com/api/urls/urls/${deleteUrlId}`);
      setUrlList((prevUrlList) => prevUrlList.filter((url) => url._id !== deleteUrlId));
      setDeleteUrlId(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting URL:', error);
      // Handle error cases
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.delete('https://url-shortener-ax8r.onrender.com/api/urls/bulk', { data: { urlIds: selectedUrls } });
      const updatedUrlList = urlList.filter((url) => !selectedUrls.includes(url._id));
      setUrlList(updatedUrlList);
      setSelectedUrls([]);
      setBulkDeleteDialogOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting URLs in bulk:', error);
      // Handle error cases
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteConfirmation = (urlId) => {
    setDeleteUrlId(urlId);
    setDeleteDialogOpen(true);
  };

  const handleBulkDeleteConfirmation = () => {
    setBulkDeleteDialogOpen(true);
  };

  const handleCheckboxChange = (urlId) => {
    setSelectedUrls((prevSelectedUrls) => {
      if (prevSelectedUrls.includes(urlId)) {
        return prevSelectedUrls.filter((id) => id !== urlId);
      } else {
        return [...prevSelectedUrls, urlId];
      }
    });
  };

  const handleShowFullUrlModal = (url) => {
    setSelectedFullUrl(url);
    setShowFullUrlModal(true);
  };

  const handleCloseFullUrlModal = () => {
    setShowFullUrlModal(false);
  };

  const thresholdLength = 50; // Threshold length for displaying "Read More" button

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        URL List
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
        InputProps={{ endAdornment: <Search /> }}
      />
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={handleSortByChange}
          label="Sort By"
        >
          <MenuItem value="createdAt">Creation Date</MenuItem>
          <MenuItem value="copyCount">Copy Count</MenuItem>
          {/* Add more sorting options if needed */}
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ marginBottom: '20px', marginLeft: '10px' }}>
        <InputLabel>Sort Order</InputLabel>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          label="Sort Order"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBulkDeleteConfirmation}
        disabled={selectedUrls.length === 0}
      >
        Delete Selected URLs
      </Button>
      {loading && <RingLoader color="#36D7B7" loading={loading} size={32} />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedUrls.length === urlList.length}
                  onChange={() => {
                    if (selectedUrls.length === urlList.length) {
                      setSelectedUrls([]);
                    } else {
                      setSelectedUrls(urlList.map((url) => url._id));
                    }
                  }}
                />
              </TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Long URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUrlList
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((url) => (
                <TableRow key={url._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUrls.includes(url._id)}
                      onChange={() => handleCheckboxChange(url._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => handleShortUrlClick(url.shortURL)}>{url.shortURL}</button>
                      {copiedUrlId === url._id && <span style={{ marginLeft: 5, color: 'green' }}>Copied!</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {url.longURL.length > thresholdLength ? (
                      <>
                        {url.longURL.substring(0, thresholdLength)}...
                        <Button
                          variant="text"
                          color="primary"
                          size="small"
                          onClick={() => handleShowFullUrlModal(url.longURL)}
                        >
                          Read More
                        </Button>
                      </>
                    ) : (
                      url.longURL
                    )}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title="Copy">
                        <IconButton onClick={() => handleCopyUrl(url._id)} size="small">
                          <FileCopy />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteConfirmation(url._id)} size="small">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {filteredUrlList.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No URLs found.{' '}
                  <Button variant="outlined" onClick={() => console.log('Create new short URLs')}>
                    Create your short URLs
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Action performed successfully"
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteUrl}
        title="Delete URL"
        content="Are you sure you want to delete this URL?"
      />
      <ConfirmationDialog
        open={bulkDeleteDialogOpen}
        onClose={() => setBulkDeleteDialogOpen(false)}
        onConfirm={handleBulkDelete}
        title="Bulk Delete URLs"
        content="Are you sure you want to delete the selected URLs?"
      />

     {/* Modal for displaying full URL */}
     <Modal open={showFullUrlModal} onClose={handleCloseFullUrlModal}>
     <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '80%', maxHeight: '80%', overflow: 'auto', backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)', padding: 24 }}>
       <Typography variant="h6" gutterBottom style={{ marginBottom: 16 }}>
         Full URL
       </Typography>
       <Typography variant="body1" style={{ marginBottom: 16 }}>{selectedFullUrl}</Typography>
       <Button onClick={handleCloseFullUrlModal} variant="contained" color="primary">Close</Button>
     </div>
   </Modal>
    </div>
  );
};

export default UserURLList;
