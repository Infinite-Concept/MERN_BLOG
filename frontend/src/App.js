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

function App() {
  return (
    <Router>
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

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
