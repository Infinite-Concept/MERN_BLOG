import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home'
import Header from './common/header/Header'
import "./App.css"
import Contact from './pages/contact/Contact'
import Footer from './common/footer/Footer'
import Privacy from './pages/privacy/Privacy'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
