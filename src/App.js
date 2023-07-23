import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import URLCreationForm from './components/URLCreationForm';
import URLList from './components/URLList';
import Chart from './components/Chart';
// import useUpdateClickCount from './components/useUpdateClickCount';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ActivationLink from './components/ActivationLink';

const App = () => {
   return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
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
        <Route path="/update-click-count/:urlId" element={<useUpdateClickCount />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/activate/:token" element={<ActivationLink />} />
        {children}
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default App;