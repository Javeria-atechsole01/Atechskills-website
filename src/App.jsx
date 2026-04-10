import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './Component/Navbar.jsx'
import Home from './Pages/Home.jsx'
import ToolsPage from './Pages/ToolsPage.jsx'
import Success from './Pages/Success.jsx'
import Blog from './Pages/Blog.jsx'
import Contact from './Pages/Contact.jsx'
import AI from './Pages/AI.jsx'
import Cybersecurity from './Pages/Cybersecurity.jsx'
import Development from './Pages/Development.jsx'
import Enroll from './Pages/Enroll.jsx'
import Courses from './Pages/Courses.jsx'
import Team from './Pages/Team.jsx'
import Admin from './Pages/Admin.jsx'
import QES from './Pages/QES.jsx'
import Automation from './Pages/Automation.jsx'
import Index from './Index.jsx'
import ShortCourses from './Pages/ShortCourses.jsx'
import { Routes, Route, } from "react-router-dom";


function App() {

  return (
    <div>

      <Navbar />
      <Index />


      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ToolsPage" element={<ToolsPage />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AI" element={<AI />} />
        <Route path="/Cybersecurity" element={<Cybersecurity />} />
        <Route path="/Development" element={<Development />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Enroll" element={<Enroll />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/QES" element={<QES />} />
        <Route path="/Automation" element={<Automation />} />
        <Route path="/ShortCourses" element={<ShortCourses />} />
      </Routes>

      <a
        href="https://wa.me/923253344552"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp Chat"
      >
        <FaWhatsapp size={26} />
      </a>


    </div>



  )
}

export default App
