import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import đúng các thành phần
import './index.css';
import Login from './components/Account/LoginPage/Login';
import Register from './components/Account/RegisterPage/Register'; 
import ChatRoom from "./components/ChatRoom/App"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
