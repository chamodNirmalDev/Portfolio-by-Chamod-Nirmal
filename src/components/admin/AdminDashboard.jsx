import React from 'react';
import { FaCode, FaEnvelope, FaGraduationCap, FaHome, FaProjectDiagram, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const AdminDashboard = ({ darkMode, toggleDarkMode }) => {

    return (
        <div className='flex h-screen font-sans overflow-hidden'>
            <aside className='w-64 bg-white dark:bg-black/40 backdrop-blur-md border-r border-teal-500/20 flex flex-col transition-all duration-300'>

                <div className='p-6 flex items-center justify-between border-b border-teal-500/20'>
                    <div>
                        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600'>
                            Admin Panel
                        </h2>
                    </div>
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            className='p-1 rounded-full bg-gray-900 dark:bg-white transition-colors backdrop-blur-sm'>
                            {darkMode ? (
                                <Sun className='w-4 lg:w-5 h-4 lg:h-5 text-yellow-600' />
                            ) : (
                                <Moon className='w-4 lg:w-5 h-4 lg:h-5 text-teal-700' />
                            )}
                        </motion.button>
                    </div>
                </div>

                <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
                    <Link to="/admin/dashboard"
                        className='flex items-center gap-3 px-4 py-3 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl font-medium 
                transition-colors border border-teal-500/20'>
                        <FaHome size={20} /> Dashboard
                    </Link>

                    <Link to='#'
                        className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600
                dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaProjectDiagram size={20} /> Projects
                    </Link>

                    <Link to='#' className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600
                    dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaCode size={20} /> Skills
                    </Link>

                    <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-colors">
                        <FaEnvelope size={20} /> Messages
                    </Link>

                    <Link to='#' className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10
                    hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaGraduationCap size={20}/> Experience & Education
                    </Link>

                    <Link to='#' className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600
                    dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaUserCog size={20}/> Setting
                    </Link>
                </nav>

                <div className="p-4 border-t border-teal-500/20">
                    <Link to="/admin" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium">
                        <FaSignOutAlt size={20} /> Logout
                    </Link>
                </div>
            </aside>

        </div>
    )
};

export default AdminDashboard;