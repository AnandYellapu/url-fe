import { useState } from 'react';
import axios from 'axios';

const useUpdateClickCount = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleUpdateClickCount = async (urlId) => {
    try {
      await axios.post(`http://localhost:6060/api/update-click-count/${urlId}`);
      setClickCount((prevClickCount) => prevClickCount + 1);
    } catch (error) {
      console.error('Error updating click count:', error);
      // Handle error cases
    }
  };

  return { clickCount, handleUpdateClickCount };
};

export default useUpdateClickCount;
