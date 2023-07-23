// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ActivationLink = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Trigger the activation request when the component mounts
//     activateAccount();
//   }, []);

//   const activateAccount = async () => {
//     try {
//       const response = await axios.get(`http://localhost:6060/api/users/activate/${token}`);
//       setMessage(response.data.message);

//       // Check if the activation is successful and navigate to login
//       if (response.data.message === 'Account activated successfully. You can now log in.') {
//         navigate('/login');
//       }
//     } catch (error) {
//       setMessage('Invalid or expired activation link.');
//     }
//   };

//   return (
//     <div>
//       <h1>Account Activation</h1>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ActivationLink;





import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivationLink = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const activateAccount = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:6060/api/users/activate/${token}`);
      setMessage(response.data.message);

      // Check if the activation is successful and navigate to login
      if (response.data.message === 'Account activated successfully. You can now log in.') {
        navigate('/login');
      }
    } catch (error) {
      setMessage('Invalid or expired activation link.');
    }
  }, [navigate, token]);

  useEffect(() => {
    // Trigger the activation request when the component mounts
    activateAccount();
  }, [activateAccount]);

  return (
    <div>
      <h1>Account Activation</h1>
      <p>{message}</p>
    </div>
  );
};

export default ActivationLink;


