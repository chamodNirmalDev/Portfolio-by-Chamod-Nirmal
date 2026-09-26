import React, { useState } from 'react';
import { FaUser, FaLock, FaGlobe, FaSave, FaCamera } from 'react-icons/fa';

const Settings = () => {
    // දැනට තෝරාගෙන ඇති Tab එක මතක තබා ගන්නා State එක
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Top Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 pb-8">
                
                {/* Left Sidebar for Settings Tabs */}
                <div className="w-full lg:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <FaUser size={18} /> Profile Info
                    </button>
                    <button 
                        onClick={() => setActiveTab('social')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'social' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <FaGlobe size={18} /> Social Links
                    </button>
                    <button 
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'security' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <FaLock size={18} /> Security
                    </button>
                </div>

                {/* Right Content Area */}
                <div className="flex-1">
                    <div className="backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 lg:p-8 shadow-sm">
                        
                        {/* Profile Tab Content */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Profile Information</h3>
                                
                                {/* Profile Picture Upload */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-teal-500 overflow-hidden flex items-center justify-center">
                                            <FaUser size={40} className="text-gray-400" />
                                        </div>
                                        <button className="absolute bottom-0 right-0 p-2 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors">
                                            <FaCamera size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">Profile Picture</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended size: 500x500px. Maximum size: 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input type="text" defaultValue="Chamod Nirmal" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                                        <input type="text" defaultValue="Full Stack Developer" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address (For Contact Form)</label>
                                        <input type="email" defaultValue="chamod@example.com" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio / Short Description</label>
                                        <textarea rows="4" defaultValue="I am a passionate Full Stack Developer with expertise in React, Spring Boot, and MySQL..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white"></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Links Tab Content */}
                        {activeTab === 'social' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Social Media Links</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Profile URL</label>
                                        <input type="url" placeholder="https://github.com/..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile URL</label>
                                        <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter / X URL</label>
                                        <input type="url" placeholder="https://twitter.com/..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Tab Content */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Change Password</h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                        <input type="password" placeholder="Enter current password" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                        <input type="password" placeholder="Enter new password" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                        <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button (Common for all tabs) */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                            <button className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                <FaSave size={16} /> Save Changes
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;