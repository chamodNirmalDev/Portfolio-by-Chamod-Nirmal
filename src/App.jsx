import React, { useEffect, useState, useCallback } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaReact, FaJava, FaPython, FaHtml5, FaPhp, FaCss3, FaDatabase, FaGithub } from 'react-icons/fa';

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

// Click කරද්දී මතු විය යුතු අයිකන් ලැයිස්තුව
const particleIcons = [FaReact, FaJava, FaPython, FaHtml5, FaPhp, FaCss3, FaDatabase, FaGithub];

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- Global Mouse Parallax State ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // --- Global Click Particles State ---
  const [particles, setParticles] = useState([]);

  // --- useCallback මගින් Function එක ස්ථාවර කිරීම ---
  // මවුස් එක චලනය වී Component එක re-render වුවද මෙම function එක වෙනස් නොවේ.
  // එමගින් Preloader එක නැවත නැවත මුල සිට ආරම්භ වීම වළක්වයි.
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100
    });
    document.documentElement.classList.add('dark');

    // 1. Global Mouse Listener (Parallax සඳහා)
    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        setMousePos({ x, y });
    };

    // 2. Global Click Listener (Particles සඳහා)
    const handleGlobalClick = (e) => {
        const RandomIcon = particleIcons[Math.floor(Math.random() * particleIcons.length)];
        const colors = ["text-teal-400", "text-emerald-400", "text-[#61DAFB]", "text-[#f89820]"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newParticle = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            Icon: RandomIcon,
            color: randomColor
        };

        setParticles((prev) => [...prev, newParticle]);

        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handleGlobalClick);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('pointerdown', handleGlobalClick);
    };
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
        ? "bg-linear-to-br from-gray-950 via-teal-950 to-emerald-900 min-h-screen text-white overflow-hidden relative"
        : "bg-linear-to-br from-gray-50 via-teal-100 to-emerald-300 min-h-screen text-gray-900 overflow-hidden relative"
    }>

      {/* --- Global Background Animations (මුළු වෙබ් අඩවියටම) --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          
          {/* Mouse Parallax Glows */}
          <motion.div 
              animate={{ x: -mousePos.x * 1.5, y: -mousePos.y * 1.5 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 dark:bg-teal-500/20 rounded-full blur-[100px]" 
          />
          <motion.div 
              animate={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full blur-[120px]" 
          />

          {/* Floating Code Symbols */}
          <div className="absolute inset-0 text-teal-600/30 dark:text-teal-400/20 font-mono text-3xl font-bold hidden md:block">
              <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[5%]">{"{ }"}</motion.div>
              <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[10%]">{"</>"}</motion.div>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[15%]">{"()"}</motion.div>
              <motion.div animate={{ y: [0, 50, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[30%] right-[5%]">{"//"}</motion.div>
          </div>

          {/* Click Particle Effects */}
          {particles.map((particle) => (
              <motion.div
                  key={particle.id}
                  initial={{ opacity: 1, scale: 0, y: 0, x: 0 }}
                  animate={{ 
                      opacity: 0, 
                      scale: 1.5, 
                      y: -80, 
                      x: (Math.random() - 0.5) * 60 
                  }} 
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`absolute z-[100] ${particle.color}`}
                  style={{ left: particle.x - 15, top: particle.y - 15 }} 
              >
                  <particle.Icon size={30} />
              </motion.div>
          ))}
      </div>

      <AnimatePresence mode="wait">
        {isLoading && (
          // {/* මෙතන onLoadingComplete එකට අලුතින් හැදූ handleLoadingComplete ලබා දී ඇත */}
          <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative z-10 w-full">
            <Routes>
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

            <Route path="/admin/login" element={<AdminLogin />} />

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
        </div>
      )}

    </div>
  )
}

export default App;