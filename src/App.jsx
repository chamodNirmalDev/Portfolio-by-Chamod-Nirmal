import React, { useEffect, useState, useCallback } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaReact, FaJava, FaPython, FaHtml5, FaPhp, FaCss3, FaDatabase, FaGithub, FaCode, FaTerminal, FaLaptopCode, FaServer, FaBug } from 'react-icons/fa';

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

// Click කරද්දී මතු විය යුතු අයිකන් සහ ඒවාටම ආවේණික වර්ණ
const particleIcons = [
    { Icon: FaReact, color: "text-[#61DAFB]" },      // ලා නිල්
    { Icon: FaJava, color: "text-[#f89820]" },       // තැඹිලි
    { Icon: FaPython, color: "text-[#FFD43B]" },     // කහ
    { Icon: FaHtml5, color: "text-[#E34F26]" },      // තද තැඹිලි/රතු
    { Icon: FaPhp, color: "text-[#777BB4]" },        // දම්
    { Icon: FaCss3, color: "text-[#1572B6]" },       // තද නිල්
    { Icon: FaDatabase, color: "text-[#10B981]" },   // කොළ (Emerald)
    { Icon: FaGithub, color: "text-gray-100" }       // සුදු
];

const App = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [bgIcons, setBgIcons] = useState([]);

    // App component එක තුළ:
    useEffect(() => {
        // 1. Browser එකේ automatic scroll restore වෙන එක නවත්වයි
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 2. URL එකේ hash එකක් තිබේ නම් එය ඉවත් කර පිටුවේ උඩටම යවයි
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
        window.scrollTo(0, 0);
    }, []);

    // --- Page View Tracking API Call ---
    useEffect(() => {
        const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        // එකම Session එකක් තුළ වාර ගණනාවක් Views වැඩි වීම වැළැක්වීමට sessionStorage පාවිච්චි කරයි
        if (!sessionStorage.getItem('portfolio_viewed')) {
            fetch(`${API_URL}/api/track/view`, { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        sessionStorage.setItem('portfolio_viewed', 'true');
                    }
                })
                .catch(err => console.error('View tracking error:', err));
        }
    }, []);

    useEffect(() => {
        const iconsArray = [FaCode, FaTerminal, FaLaptopCode, FaReact, FaPython, FaHtml5, FaDatabase, FaServer, FaBug, FaCss3];
        const colorsArray = ["text-teal-500/20", "text-emerald-500/20", "text-blue-500/20", "text-orange-500/20", "text-purple-500/20"];

        const generatedIcons = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            Icon: iconsArray[Math.floor(Math.random() * iconsArray.length)],
            colorClass: colorsArray[Math.floor(Math.random() * colorsArray.length)],
            left: Math.floor(Math.random() * 90) + "%",
            top: Math.floor(Math.random() * 90) + "%",
            duration: Math.random() * 5 + 5,
            yOffset: Math.random() * 40 + 20,
            delay: Math.random() * 2
        }));

        setBgIcons(generatedIcons);
    }, []);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

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

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            setMousePos({ x, y });
        };

        const handleGlobalClick = (e) => {
            const randomParticle = particleIcons[Math.floor(Math.random() * particleIcons.length)];
            const newParticle = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
                Icon: randomParticle.Icon,
                color: randomParticle.color
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

            {/* --- Global Background Animations --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: -mousePos.x * 1.5,
                        y: -mousePos.y * 1.5,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 50, damping: 20 },
                        y: { type: "spring", stiffness: 50, damping: 20 },
                        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute top-10 md:top-20 left-4 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-teal-400/30 dark:bg-teal-500/20 rounded-full blur-[80px] md:blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: mousePos.x * 2,
                        y: mousePos.y * 2,
                        scale: [1, 1.15, 1]
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 50, damping: 20 },
                        y: { type: "spring", stiffness: 50, damping: 20 },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute bottom-10 right-4 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full blur-[90px] md:blur-[120px]"
                />

                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {bgIcons.map((item) => (
                        <motion.div
                            key={item.id}
                            animate={{ y: [0, -item.yOffset, 0] }}
                            transition={{
                                duration: item.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            }}
                            className={`absolute ${item.colorClass}`}
                            style={{ left: item.left, top: item.top }}
                        >
                            <item.Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 opacity-60" />
                        </motion.div>
                    ))}
                </div>

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
                        className={`absolute z-100 ${particle.color} drop-shadow-[0_0_8px_currentColor]`}
                        style={{ left: particle.x - 15, top: particle.y - 15 }}
                    >
                        <particle.Icon size={30} />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {isLoading && (
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