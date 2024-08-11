import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './index.css';
import Login from './components/Account/LoginPage/Login';
import Register from './components/Account/RegisterPage/Register';
import ChatRoom from "./components/ChatRoom/App"
import PublicRoute from './components/Authentication/PublicRoute';
import PrivateRoute from './components/Authentication/PrivateRoute';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
