import React from 'react';
import { FaCheckCircle, FaCode, FaCodeBranch, FaDownload, FaEnvelope, FaEye, FaGraduationCap, FaHome, FaLayerGroup, FaProjectDiagram, FaSignOutAlt, FaUserCheck, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const AdminDashboard = ({ darkMode, toggleDarkMode }) => {

    const formattedDate = new Date().toLocaleDateString('en-GB');
    const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return (
        <div className='flex h-screen font-sans overflow-hidden'>
            <aside className='w-64 bg-white dark:bg-black/40 backdrop-blur-md border-r border-teal-500/20 flex flex-col transition-all duration-300'>

                <div className='h-24 px-6 flex items-center justify-between border-b border-teal-500/20'>
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
                        <FaGraduationCap size={20} /> Experience & Education
                    </Link>

                    <Link to='#' className='flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 hover:text-teal-600
                    dark:hover:text-teal-400 rounded-xl transition-colors'>
                        <FaUserCog size={20} /> Setting
                    </Link>
                </nav>

                <div className="p-4 border-t border-teal-500/20">
                    <Link to="/admin" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium">
                        <FaSignOutAlt size={20} /> Logout
                    </Link>
                </div>
            </aside>


            <main className='flex flex-1 flex-col h-screen overflow-hidden'>
                <header className='h-24 px-6 flex items-center justify-between p-6 bg-white/40 dark:bg-gray-950/40 backdrop:blur-xl border-b
                 border-teal-500/20 shadow-sm z-10'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Overview</h1>
                    </div>
                    <div className="px-4 py-2 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-xl border border-teal-500/20 text-right shadow-sm">
                        <p className="text-sm font-bold text-teal-600 dark:text-teal-400 tracking-wider">
                            {formattedTime}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {formattedDate}
                        </p>
                    </div>
                </header>

                {/* Stats Widgets */}
                <div className='flex-1 p-6 overflow-y-auto space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

                        {/* Widget 1: Total Views (Blue) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20'>
                                <FaEye size={24} className="transition-transform duration-300 group-hover:rotate-3" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>Total Views</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>1245</h3>
                            </div>
                        </div>

                        {/* Widget 2: Active Projects (Emerald) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20'>
                                <FaProjectDiagram size={24} className="transition-transform duration-300 group-hover:-rotate-3" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>Active Projects</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>8</h3>
                            </div>
                        </div>

                        {/* Widget 3: New Messages (Rose/Pink) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-rose-200 dark:group-hover:bg-rose-500/20'>
                                <FaEnvelope size={24} className="transition-transform duration-300 group-hover:rotate-6" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>New Messages</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>12</h3>
                            </div>
                        </div>

                        {/* Widget 4: Completed Projects (Indigo) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/20'>
                                <FaCheckCircle size={24} className="transition-transform duration-300 group-hover:rotate-3" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>Completed Projects</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>12</h3>
                            </div>
                        </div>

                        {/* Widget 5: Happy Clients (Amber/Yellow) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-amber-200 dark:group-hover:bg-amber-500/20'>
                                <FaUserCheck size={24} className="transition-transform duration-300 group-hover:-rotate-3" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>Happy Clients</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>12</h3>
                            </div>
                        </div>

                        {/* Widget 6: GitHub Commits (Slate) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-slate-300 dark:group-hover:bg-slate-600'>
                                <FaCodeBranch size={24} className="transition-transform duration-300 group-hover:rotate-12" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>GitHub Commits</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>12</h3>
                            </div>
                        </div>

                        {/* Widget 7: Tech Stack (Orange) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-orange-200 dark:group-hover:bg-orange-500/20'>
                                <FaLayerGroup size={24} className="transition-transform duration-300 group-hover:-rotate-6" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>Tech Stack</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>12</h3>
                            </div>
                        </div>

                        {/* Widget 8: CV Downloads (Purple) */}
                        <div className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'>
                            <div className='p-4 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-purple-200 dark:group-hover:bg-purple-500/20'>
                                <FaDownload size={24} className="transition-transform duration-300 group-hover:translate-y-1" />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>CV Downloads</p>
                                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>12</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
};

export default AdminDashboard;