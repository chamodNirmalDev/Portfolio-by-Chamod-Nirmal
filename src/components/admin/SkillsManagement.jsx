import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCode, FaServer, FaPaintBrush } from 'react-icons/fa';

const SkillsManagement = () => {
    // Add New Skill Modal එක පාලනය කරන State එක
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Skills Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add, update, or remove your technical and professional skills.</p>
                </div>
                
                {/* Add New Skill Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5">
                    <FaPlus size={14} />
                    <span>Add New Skill</span>
                </button>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                
                {/* Skill Card 1 */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
                                <FaCode size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">React.js</h3>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Frontend</span>
                            </div>
                        </div>
                        {/* Edit & Delete Actions */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit"><FaEdit size={14} /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Delete"><FaTrash size={14} /></button>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Proficiency</span>
                            <span className="font-bold text-teal-600 dark:text-teal-400">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner">
                            <div className="bg-linear-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: '90%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Skill Card 2 */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg">
                                <FaServer size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Spring Boot</h3>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Backend</span>
                            </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><FaEdit size={14} /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><FaTrash size={14} /></button>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Proficiency</span>
                            <span className="font-bold text-teal-600 dark:text-teal-400">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner">
                            <div className="bg-linear-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Skill Card 3 */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
                                <FaPaintBrush size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Tailwind CSS</h3>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Design</span>
                            </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><FaEdit size={14} /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><FaTrash size={14} /></button>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Proficiency</span>
                            <span className="font-bold text-teal-600 dark:text-teal-400">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner">
                            <div className="bg-linear-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: '95%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Skill Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-md">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Skill</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
                                <input type="text" placeholder="e.g., React.js" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <select className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white">
                                    <option>Frontend</option>
                                    <option>Backend</option>
                                    <option>Database</option>
                                    <option>Design</option>
                                    <option>Tools</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                                    <span>Proficiency Percentage</span>
                                    <span className="text-teal-600 dark:text-teal-400 font-bold">85%</span>
                                </label>
                                <input type="range" min="0" max="100" defaultValue="85" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-teal-500 mt-2" />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button className="px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md">
                                Save Skill
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsManagement;