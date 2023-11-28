// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = () => {
//     const userData = {
//       username,
//       email,
//       password,
//     };

//     axios
//       .post('http://localhost:6060/api/users/register', userData)
//       .then((response) => {
//         console.log(response.data);
//         toast.success('Registration successful! Please check your email to activate your account.');
//         navigate('/login');
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response && error.response.status === 409) {
//           toast.error('Email already exists');
//         } else {
//           toast.error('Registration failed');
//         }
//       });
//   };

//   return (
//     <div className='auth-container'>
//       <div className='auth-form'>
//         <h2>Register</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <button onClick={handleRegister} className='button1'>Register</button>
//         <p className="register-link">
//           Already have an account? <Link to="/">Login</Link>
//         </p>
//       </div>
//        <ToastContainer />
//     </div>
//   );
// };

// export default Register;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:6060/api/users/register', userData);
      console.log(response.data);

      // Assuming the server sends back a token upon successful registration
      // const { token } = response.data;

      // Save the token to localStorage or any state management tool of your choice
      // localStorage.setItem('authToken', token);
      // console.log('Auth-Token', token);

      toast.success('Registration successful! Please check your email to activate your account.');
      navigate('/login'); // Redirect to the dashboard or any protected route
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error('Email already exists');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleRegister} className='button1'>Register</button>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
       <ToastContainer />
    </div>
  );
};

export default Register;
