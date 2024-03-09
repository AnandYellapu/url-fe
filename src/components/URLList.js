import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Checkbox, Snackbar, IconButton, Tooltip, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete, FileCopy, Search } from '@mui/icons-material';
import Pagination from '../pages/Pagination';
import ConfirmationDialog from '../pages/ConfirmationDialog';
import { RingLoader } from 'react-spinners';

const URLList = () => {
  const [urlList, setUrlList] = useState([]);
  const [filteredUrlList, setFilteredUrlList] = useState([]);
  const [copiedUrlId, setCopiedUrlId] = useState(null);
  const [copyCount, setCopyCount] = useState(0);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by createdAt
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchUrlList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/url-list');
        setUrlList(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
        applySorting(response.data, sortBy, sortOrder); // Apply sorting initially
      } catch (error) {
        setError('Error fetching URL list');
      }
      setLoading(false);
    };

    fetchUrlList();
  }, []); //eslint-disable-line 

  useEffect(() => {
    // Apply sorting whenever sortBy or sortOrder changes
    applySorting(urlList, sortBy, sortOrder);
  }, [sortBy, sortOrder]); //eslint-disable-line 

  const applySorting = (data, sortBy, order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    setUrlList(sortedData);
    setFilteredUrlList(sortedData);
  };

  const handleShortUrlClick = (url) => {
    window.open(url, '_blank');
  };

  const handleCopyUrl = async (urlId) => {
    try {
      const shortURL = urlList.find((url) => url._id === urlId).shortURL;
      await navigator.clipboard.writeText(shortURL);
      setCopiedUrlId(urlId);
      setCopyCount((prevCount) => prevCount + 1);
      setTimeout(() => {
        setCopiedUrlId(null);
      }, 2000);
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

  const handleDeleteUrl = async (urlId) => {   //eslint-disable-line
    try {
      await axios.delete(`https://url-shortener-ax8r.onrender.com/api/urls/${urlId}`);
      const updatedUrlList = urlList.filter((url) => url._id !== urlId);
      setUrlList(updatedUrlList);
      setFilteredUrlList(updatedUrlList);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting URL:', error);
      // Handle error cases
    }
  };

  const handleBulkDelete = async () => {   //eslint-disable-line
    try {
      await axios.delete('https://url-shortener-ax8r.onrender.com/api/urls/bulk', { data: { urlIds: selectedUrls } });
      const updatedUrlList = urlList.filter((url) => !selectedUrls.includes(url._id));
      setUrlList(updatedUrlList);
      setFilteredUrlList(updatedUrlList);
      setSelectedUrls([]);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting URLs in bulk:', error);
      // Handle error cases
    }
  };

  const handleDeleteAll = async () => {       //eslint-disable-line
    try {
      await axios.delete('https://url-shortener-ax8r.onrender.com/api/urls/all');
      setUrlList([]);
      setFilteredUrlList([]);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting all URLs:', error);
      // Handle error cases
    }
  };

  const handleCheckboxChange = (urlId) => {
    if (urlId === 'all') {
      setSelectAll(!selectAll);
      if (!selectAll) {
        setSelectedUrls(filteredUrlList.map((url) => url._id));
      } else {
        setSelectedUrls([]);
      }
    } else {
      setSelectedUrls((prevSelectedUrls) => {
        if (prevSelectedUrls.includes(urlId)) {
          return prevSelectedUrls.filter((id) => id !== urlId);
        } else {
          return [...prevSelectedUrls, urlId];
        }
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteConfirmation = () => {
    setDeleteDialogOpen(false);
    // Delete the selected URL
  };

  const handleBulkDeleteConfirmation = () => {
    setBulkDeleteDialogOpen(false);
    // Delete the selected URLs in bulk
  };

  const handleDeleteAllConfirmation = () => {
    setDeleteAllDialogOpen(false);
    // Delete all URLs
  };

  const handleSearch = (searchTerm) => {
    const filteredList = urlList.filter(
      (url) =>
        url.shortURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.longURL.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUrlList(filteredList);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        URL List
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: '20px' }}
        InputProps={{ endAdornment: <Search /> }}
      />
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
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
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort Order"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setBulkDeleteDialogOpen(true)}
        disabled={selectedUrls.length === 0}
      >
        Delete Selected URLs
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setDeleteAllDialogOpen(true)}
        disabled={filteredUrlList.length === 0 || selectedUrls.length !== filteredUrlList.length}
      >
        Delete All URLs
      </Button>
      {loading && <RingLoader color="#36D7B7" loading={loading} size={32} />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={() => handleCheckboxChange('all')}
                />
              </TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Long URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUrlList.slice((currentPage - 1) * 10, currentPage * 10).map((url) => (
              <TableRow key={url._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUrls.includes(url._id)}
                    onChange={() => handleCheckboxChange(url._id)}
                  />
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => handleShortUrlClick(url.shortURL)}>
                      {url.shortURL}
                    </button>
                    {copiedUrlId === url._id && <span style={{ marginLeft: 5, color: 'green' }}>Copied!</span>}
                  </div>
                </TableCell>
                <TableCell>{url.longURL}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Copy">
                      <IconButton onClick={() => handleCopyUrl(url._id)} size="small">
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => { setDeleteDialogOpen(true); setSelectedUrls([url._id]); }} size="small">
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
                  No URLs found. <Button variant="outlined" onClick={() => console.log('Create new short URLs')}>Create your short URLs</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Action performed successfully"
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmation}
        title="Delete URL"
        content="Are you sure you want to delete this URL?"
      />
      <ConfirmationDialog
        open={bulkDeleteDialogOpen}
        onClose={() => setBulkDeleteDialogOpen(false)}
        onConfirm={handleBulkDeleteConfirmation}
        title="Bulk Delete URLs"
        content="Are you sure you want to delete the selected URLs?"
      />
      <ConfirmationDialog
        open={deleteAllDialogOpen}
        onClose={() => setDeleteAllDialogOpen(false)}
        onConfirm={handleDeleteAllConfirmation}
        title="Delete All URLs"
        content="Are you sure you want to delete all URLs?"
      />
    </div>
  );
};

export default URLList;
