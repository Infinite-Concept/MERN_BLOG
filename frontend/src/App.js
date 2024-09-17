import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home'
import Header from './common/header/Header'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import Contact from './pages/contact/Contact'
import Footer from './common/footer/Footer'
import Privacy from './pages/privacy/Privacy'
import About from './pages/about/About'
import Blog from './pages/blog/Blog'
import Author from './pages/author/Author'
import CreateAuthor from './pages/author/CreateAuthor'
import LoginAuthor from './pages/author/LoginAuthor'
import CreateBlog from './pages/blog/CreateBlog'
import ForgotPassword from './pages/author/ForgotPassword'
import AuthProvider from './auth/Auth'
import Profile from './pages/author/Profile'
import ResetPassword from './pages/author/ResetPassword'
import ListBlog from './pages/blog/ListBlog'

function App() {
  return (
    <Router>
      <AuthProvider>  
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/author' element={<Author />} />
          <Route path='/join-author' element={<CreateAuthor />} />
          <Route path='/login-author' element={<LoginAuthor />} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='/listblog' element={<ListBlog />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  )
}

export default App
