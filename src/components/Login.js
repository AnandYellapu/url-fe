// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';

// const Login = () => {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const userData = {
//       identifier,
//       password,
//     };

//     axios
//       .post('https://url-shortener-ax8r.onrender.com/api/users/login', userData)
//       .then((response) => {
//         console.log(response.data);
//         localStorage.setItem('token', response.data.token);
//         navigate('/create-url');
//         toast.success('Login successful');
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response && error.response.status === 404) {
//           toast.error('User does not exist');
//         } else {
//           toast.error('Account not activated');
//         }
//       });
//   };

//   const handleForgotPassword = () => {
//     navigate('/forgot-password'); // Navigate to the reset password page
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Email or Username"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin} className='button1'>Login</button>
//         <p className="forgot-password-link" onClick={handleForgotPassword}>
//           Forgot Password?
//         </p>
//         <p className="register-link">
//           Not yet registered? <Link to="/register">Register</Link>
//         </p>
//       </div>
//        <ToastContainer />
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';

// const Login = () => {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const userData = {
//       identifier,
//       password,
//     };

//     axios
//       .post('https://url-shortener-ax8r.onrender.com/api/users/login', userData)
//       .then((response) => {
//         const token = response.data.token;
//         console.log('Auth----Token:', token); // Log the token

//         localStorage.setItem('token', token);
//         navigate('/create-url');
//         toast.success('Login successful');
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response && error.response.status === 404) {
//           toast.error('User does not exist');
//         } else {
//           toast.error('Account not activated');
//         }
//       });
//   };

//   const handleForgotPassword = () => {
//     navigate('/forgot-password'); // Navigate to the reset password page
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Email or Username"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin} className='button1'>Login</button>
//         <p className="forgot-password-link" onClick={handleForgotPassword}>
//           Forgot Password?
//         </p>
//         <p className="register-link">
//           Not yet registered? <Link to="/register">Register</Link>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData = {
      identifier,
      password,
    };

    try {
      const response = await axios.post('https://url-shortener-ax8r.onrender.com/api/users/login', userData);
      const { token, user } = response.data;

      // Save the token to localStorage or any state management tool of your choice
      localStorage.setItem('authToken', token);
      // console.log('Auth-Token', token);

    localStorage.setItem('userId', user._id);
    // console.log('User-Id', user._id);

      navigate('/create-url'); // Redirect to the create URL page or any protected route
      toast.success('Login successful');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('User does not exist');
      } else {
        toast.error('Account not activated');
      }
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the reset password page
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className='button1'>Login</button>
        <p className="forgot-password-link" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <p className="register-link">
          Not yet registered? <Link to="/register">Register</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
