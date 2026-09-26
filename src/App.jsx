import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificate from './components/Certificates';
import Project from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './components/admin/DashboardOverview';
import SkillsManagement from './components/admin/SkillsManagement';
import ProjectsManagement from './components/admin/ProjectsManagement';
import Messages from './components/admin/Messages';
import ExperienceEducation from './components/admin/ExperienceEducation';
import Settings from './components/admin/Settings';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
        ? "bg-linear-to-br from-gray-950 via-teal-950 to-emerald-900 min-h-screen text-white overflow-hidden"
        : "bg-linear-to-br from-gray-50 via-teal-100 to-emerald-300 min-h-screen text-gray-900 overflow-hidden"
    }>

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
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

          {/* 2. Admin Login පිටුවට අදාළ පාර */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 3. ප්‍රධාන Admin Dashboard රාමුව (Layout එක) */}
          <Route path="/admin" element={<AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>

            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="ProjectsManagement" element={<ProjectsManagement />} />
            <Route path="skillsManagement" element={<SkillsManagement />} />
            <Route path="message" element={<Messages />} />
            <Route path="experienceEducation" element={<ExperienceEducation />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      )}

    </div>
  )
}

export default App;