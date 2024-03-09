import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './auth/Login';
import Dashboard from './components/Dashboard';
import URLCreationForm from './components/URLCreationForm';
import URLList from './components/URLList';
import UserURLList from './components/UserUrlList';
import Chart from './components/Chart';
import UserCharts from './components/UserCharts';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import ActivationLink from './auth/ActivationLink';

const App = () => {
   return (
    <Router>
      <div className="App">
         <ToastContainer />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
           <Route path="/activate/:token" element={<ActivationLink />} />
           <Route path="/*" element={<Layout />} >
            </Route>
        </Routes>
      </div>
    </Router>
  );
};

const Layout = ({ children}) => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create-url" element={<URLCreationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/url-list" element={<URLList />} />
        <Route path='user-url-list' element={<UserURLList />} />
        <Route path="/update-click-count/:urlId" element={<useUpdateClickCount />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/user-charts" element={<UserCharts />} />
        <Route path="/about" element={<About />} />
        
        {children}
      </Routes>
      <Footer />
    </>
  );
};

export default App;