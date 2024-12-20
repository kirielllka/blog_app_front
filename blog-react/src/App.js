import React  from 'react';
import Posts from './components/posts/posts';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'
import RegistrationPage from './pages/RegistrationPage';
import Profile from './pages/ProfilePage.jsx';
import PostDetailsPage from './pages/PostDetail.jsx';
function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-in" element={<RegistrationPage />} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
