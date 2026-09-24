import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificate from './components/Certificates';
import Project from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './components/admin/DashboardOverview'; // මෙය Import කරගන්න අමතක කරන්න එපා
import Projects from './components/admin/Projects'; 

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100
    });
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    AOS.refresh()
  }, [darkMode])

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  }

  return (
    <div className={
      darkMode
        ? "bg-linear-to-br from-gray-950 via-teal-950 to-emerald-900 min-h-screen text-white"
        : "bg-linear-to-br from-gray-50 via-teal-100 to-emerald-300 min-h-screen text-gray-900"
    }>

      <Routes>

        {/* 1. ප්‍රධාන වෙබ් අඩවියේ පාර */}
        <Route path="/" element={
          <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Hero />
            <About />
            <Skills />
            <Certificate />
            <Project />
            <Contact />
            <Footer />
          </>
        } />

        {/* 2. Admin Login පිටුවට අදාළ පාර 
            කවුරුහරි අගුල ක්ලික් කළොත් යන්නේ මෙතැනටයි */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 3. ප්‍රධාන Admin Dashboard රාමුව (Layout එක) 
            සටහන: මෙහි path="admin" ලෙස දීමෙන් එය ඇතුළත ඇති අනු-පිටු (Dashboard/Projects) 
            /admin/dashboard ලෙස ක්‍රියා කරයි. */}
        <Route path="/admin" element={<AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>

          {/* මේ පේළි 3 වටේට තිබ්බ Comment ලකුණු ඉවත් කළ යුතුයි */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="projects" element={<Projects />} />

        </Route>

      </Routes>

    </div>
  )
}

export default App;