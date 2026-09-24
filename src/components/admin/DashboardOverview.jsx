import React from 'react';
import { 
    FaEye, FaProjectDiagram, FaEnvelope, FaCheckCircle, 
    FaUserCheck, FaCodeBranch, FaLayerGroup, FaDownload, FaClock 
} from 'react-icons/fa';

const DashboardOverview = () => {
    return (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* 1. Stats Widgets (Top Section) */}
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
                
                {/* Widget 5: Happy Clients (Amber) */}
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

            {/* 2. Bottom Section: Recent Activity & Skills Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 pb-8">
                
                {/* 2.1. Recent Activity Timeline */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <FaClock className="text-teal-500" /> Recent Activity
                    </h2>
                    
                    <div className="space-y-6 border-l-2 border-teal-500/30 ml-3 pl-5">
                        <div className="relative">
                            <div className="absolute -left-6.75 top-1 w-3.5 h-3.5 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)] border-2 border-white dark:border-gray-900"></div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Added new project "E-commerce App"</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -left-6.75 top-1 w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] border-2 border-white dark:border-gray-900"></div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Updated Java Spring Boot REST API</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">5 hours ago</p>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -left-6.75 top-1 w-3.5 h-3.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] border-2 border-white dark:border-gray-900"></div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Replied to client message from Truelancer</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">1 day ago</p>
                        </div>
                    </div>
                </div>

                {/* 2.2. Top Skills Progress */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <FaLayerGroup className="text-orange-500" /> Top Skills Overview
                    </h2>
                    
                    <div className="space-y-6 mt-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Java / Spring Boot</span>
                                <span className="font-bold text-teal-600 dark:text-teal-400">90%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner">
                                <div className="bg-linear-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-gray-700 dark:text-gray-300">React.js / React Native</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">85%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner">
                                <div className="bg-linear-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-gray-700 dark:text-gray-300">MySQL / Database</span>
                                <span className="font-bold text-orange-600 dark:text-orange-400">80%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner">
                                <div className="bg-linear-to-r from-orange-500 to-amber-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardOverview;