import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop={4}>
      <Button 
        variant="outlined" 
        disabled={page === 1} 
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </Button>
      <Typography variant="body1" style={{ margin: '0 10px' }}>
        Page {page} of {totalPages}
      </Typography>
      <Button 
        variant="outlined" 
        disabled={page === totalPages} 
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
