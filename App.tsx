import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavigationType } from 'react-router-dom';
import CreateReview from './components/CreateReview';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Profile from './components/Profile';
import AdminPage from './components/AdminPage';
import ReviewFetch from './fetches/GetReviewFetch';
import Login from './components/Login';
import PostReviewFetch from './fetches/PostReviewFetch';
import Register from './components/Register';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">  
        <Navigation /> 
        <Routes>
          <Route path="/home" element={<Home />}>Hem</Route>
          <Route path="/postReviewFetch" element={<PostReviewFetch />}>Skapa Recension</Route>
          <Route path="/profile" element={<Profile />}>Profil</Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="adminPage" element={<AdminPage />}>Admin-Panel</Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;