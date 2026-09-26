import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import React, { useState } from 'react'
import { FaBars, FaCode, FaEnvelope, FaGraduationCap, FaHome, FaProjectDiagram, FaSignOutAlt, FaTimes, FaUserCog } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = ({ darkMode, toggleDarkMode }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const formattedDate = new Date().toLocaleDateString('en-GB');
    const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const loction = useLocation();
    const pageTitle = loction.pathname.includes('projects') ? 'Project Management' : 'Overview';

    const handleLinkClick = () => {
        setIsSidebarOpen(false);
    }

    return (
        <div className='flex h-screen font-sans overflow-hidden bg-gray-50 dark:bg-gray-900'>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'>
                    </motion.div>
                )}
            </AnimatePresence>

            <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-white dark:bg-black/80 lg:dark:bg-black/40
                backdrop-blur-xl border-r border-teal-500/20 flex flex-col transition-transform duration-300 ease-in-out z-50
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className='h-24 px-6 flex items-center justify-between border-b border-teal-500/20'>
                    <div>
                        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600'>
                            Admin Panel
                        </h2>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className='lg:hidden text-gray-500 hover:text-red-500 transition-colors p-2'>
                        <FaTimes size={20} />
                    </button>
                </div>
                <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
                    <Link to="/admin/dashboard"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors 
                        ${location.pathname.includes('dashboard') ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400'}`}>
                        <FaHome size={20} /> Dashboard
                    </Link>

                    <Link to="/admin/projectsManagement"
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors 
                        ${location.pathname.includes('projects') ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400'}`}>
                        <FaProjectDiagram size={20} /> Projects
                    </Link>

                    <Link to='/admin/skillsManagement'
                        onClick={handleLinkClick}
                        className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10
                         hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaCode size={20} /> Skills
                    </Link>

                    <Link to="/admin/message"
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10
                         hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-colors">
                        <FaEnvelope size={20} /> Messages
                    </Link>

                    <Link to='/admin/experienceEducation'
                        onClick={handleLinkClick}
                        className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10
                         hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaGraduationCap size={20} /> Experience & Education
                    </Link>

                    <Link to='/admin/settings'
                        onClick={handleLinkClick}
                        className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10
                         hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaUserCog size={20} /> Setting
                    </Link>
                </nav>

                <div className='p-4 border-t border-teal-500/20'>
                    <Link to='/admin/login'
                        className='flex items-center justify-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
                            rounded-xl transition-colors font-medium'>
                        <FaSignOutAlt size={20} /> Logout
                    </Link>
                </div>
            </aside>

            <main className='flex flex-1 flex-col h-screen overflow-hidden w-full'>
                <header className='h-24 px-4 lg:px-6 flex items-center justify-between bg-white/40 dark:bg-gray-950/40
                 backdrop-blur-xl border-b border-teal-500/20 shadow-sm z-10'>
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className='p-2 text-gray-700 dark:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden'>
                            <FaBars size={22} />
                        </button>

                        <h1 className='text-xl lg:text-2xl font-bold text-gray-800 dark:text-white line-clamp-1'>{pageTitle}</h1>
                    </div>

                    <div className='flex items-center gap-3 lg:gap-6'>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            className='p-2 lg:p-2.5 rounded-full bg-gray-200 dark:bg-amber-800 transition-colors shadow-sm'>
                            {darkMode ? (
                                <Sun className='w-5 lg:w-6 h-5 lg:h-6 text-yellow-500' />
                            ) : (
                                <Moon className='w-5 lg:w-6 h-5 lg:h-6 text-teal-700' />
                            )}
                        </motion.button>

                        <div className='hidden sm:block px-4 py-2 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-xl border border-teal-500/20 text-right shadow-sm '>
                            <p className='text-sm font-bold text-teal-600 dark:text-teal-400 tracking-wider'>{formattedTime}</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>{formattedDate}</p>
                        </div>
                    </div>
                </header>
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout