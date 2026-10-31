import React, { useState, useEffect } from 'react'
import { FaCertificate, FaCode, FaEnvelope, FaHome, FaProjectDiagram, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { name: 'Home', link: '#home', icon: FaHome },
        { name: 'About', link: '#about', icon: FaUser },
        { name: 'Skills', link: '#skills', icon: FaCode },
        { name: 'Certificates', link: '#certificates', icon: FaCertificate },
        { name: 'Projects', link: '#projects', icon: FaProjectDiagram },
        { name: 'Contacts', link: '#contacts', icon: FaEnvelope },
    ];

    // Scroll කරන විට අදාළ Section එක detect කර activeTab එක වෙනස් කිරීම
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.querySelector(item.link));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            sections.forEach((section, index) => {
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveTab(navItems[index].name);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='fixed z-50 bottom-0 left-0 right-0 flex justify-center'>
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='relative w-[95%] max-w-4xl mb-4'
            >
                <div className='relative backdrop-blur-xl rounded-2xl shadow-2xl px-3 py-2 transition-colors duration-500 
                    bg-linear-to-r from-white/70 to-teal-50/70 border border-teal-200/50 
                    dark:from-gray-950/80 dark:to-teal-950/80 dark:border-emerald-800/30'>

                    <div className='absolute -top-5 right-3'>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            className='p-2 rounded-full transition-colors backdrop-blur-sm shadow-md
                                bg-white border border-teal-100
                                dark:bg-gray-900 dark:border-teal-900'>
                            {darkMode ? (
                                <Sun className='w-4 lg:w-5 h-4 lg:h-5 text-yellow-400' />
                            ) : (
                                <Moon className='w-4 lg:w-5 h-4 lg:h-5 text-teal-700' />
                            )}
                        </motion.button>
                    </div>
                    <div className='flex items-center justify-around gap-1'>
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.name
                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.link}
                                    onClick={() => setActiveTab(item.name)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className='flex flex-col items-center gap-0.5
                                            py-1.5 px-2 relative group flex-1'>
                                    {isActive && (
                                        <motion.div
                                            layoutId='activeTab'
                                            className='absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full
                                                bg-teal-600 dark:bg-emerald-400'
                                            transition={{ duration: 0.3 }}
                                        >
                                        </motion.div>
                                    )}
                                    <Icon
                                        className={`w-5 h-6 transition-all
                                                duration-300 ${isActive
                                            ? 'text-teal-700 dark:text-emerald-300'
                                            : 'text-teal-900/40 group-hover:text-teal-700 dark:text-emerald-100/40 dark:group-hover:text-emerald-300'
                                        }`} />

                                    <span className={`text-[10px] font-medium transition-all duration-300
                                                ${isActive
                                            ? 'text-teal-700 dark:text-emerald-300'
                                            : 'text-teal-900/40 group-hover:text-teal-700 dark:text-emerald-100/40 dark:group-hover:text-emerald-300'
                                        }`}>
                                        {item.name}
                                    </span>
                                </motion.a>
                            )
                        })}
                    </div>
                </div>

            </motion.nav>
        </div>
    )
}

Navbar.displayName = 'Navbar';

export default Navbar;