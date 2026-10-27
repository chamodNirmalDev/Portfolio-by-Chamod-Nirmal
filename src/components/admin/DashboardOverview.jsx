import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
    FaEye, FaProjectDiagram, FaEnvelope, FaCheckCircle, 
    FaUserCheck, FaCodeBranch, FaLayerGroup, FaDownload, 
    FaClock, FaSyncAlt 
} from 'react-icons/fa';

const GITHUB_USERNAME = 'chamodNirmalDev';
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// කාලය "2 hours ago", "Just now" ලෙස පෙන්වන Function එක
const formatTimeAgo = (isoDate) => {
    if (!isoDate) return '';
    const seconds = Math.floor((new Date() - new Date(isoDate)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
};

const DashboardOverview = () => {
    const [statsData, setStatsData] = useState({
        totalViews: 0,
        activeProjects: 4,
        newMessages: 0,
        completedProjects: 12,
        happyClients: 5,
        githubCommits: 185,
        techStackCount: 16,
        cvDownloads: 0,
    });

    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchDashboardData = useCallback(async () => {
        setIsRefreshing(true);
        const token = localStorage.getItem('adminToken');

        try {
            // 1. අපේ Backend (MongoDB) එකෙන් දත්ත ලබාගැනීම
            if (token) {
                const res = await fetch(`${API_URL}/api/admin/overview`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const result = await res.json();
                    if (result.success && result.data) {
                        const { recentActivities, ...counts } = result.data;
                        setStatsData(prev => ({ ...prev, ...counts }));
                        if (recentActivities) {
                            setActivities(recentActivities.map(act => ({
                                id: act._id || act.title,
                                title: act.title,
                                timestamp: act.timestamp,
                                color: act.color || 'teal'
                            })));
                        }
                    }
                }
            }

            // 2. GitHub API එකෙන් සජීවී Repositories ගණන ලබාගැනීම
            const ghRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            if (ghRes.ok) {
                const ghUser = await ghRes.json();
                if (ghUser.public_repos) {
                    setStatsData(prev => ({
                        ...prev,
                        completedProjects: ghUser.public_repos
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching dashboard overview:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const widgets = [
        {
            label: 'Total Views',
            value: statsData.totalViews.toLocaleString(),
            Icon: FaEye,
            iconRotate: 'group-hover:rotate-3',
            colorClass: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20'
        },
        {
            label: 'Active Projects',
            value: statsData.activeProjects,
            Icon: FaProjectDiagram,
            iconRotate: 'group-hover:-rotate-3',
            colorClass: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20'
        },
        {
            label: 'New Messages',
            value: statsData.newMessages,
            Icon: FaEnvelope,
            iconRotate: 'group-hover:rotate-6',
            colorClass: 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-200 dark:group-hover:bg-rose-500/20'
        },
        {
            label: 'GitHub Repositories',
            value: statsData.completedProjects,
            Icon: FaCheckCircle,
            iconRotate: 'group-hover:rotate-3',
            colorClass: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/20'
        },
        {
            label: 'Happy Clients',
            value: statsData.happyClients,
            Icon: FaUserCheck,
            iconRotate: 'group-hover:-rotate-3',
            colorClass: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-200 dark:group-hover:bg-amber-500/20'
        },
        {
            label: 'GitHub Commits',
            value: statsData.githubCommits,
            Icon: FaCodeBranch,
            iconRotate: 'group-hover:rotate-12',
            colorClass: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 group-hover:bg-slate-300 dark:group-hover:bg-slate-600'
        },
        {
            label: 'Tech Stack',
            value: statsData.techStackCount,
            Icon: FaLayerGroup,
            iconRotate: 'group-hover:-rotate-6',
            colorClass: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-500/20'
        },
        {
            label: 'CV Downloads',
            value: statsData.cvDownloads,
            Icon: FaDownload,
            iconRotate: 'group-hover:translate-y-1',
            colorClass: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-500/20'
        }
    ];

    const skills = [
        { name: 'Java / Hibernate / Spring Boot', percent: 90, textClass: 'text-teal-600 dark:text-teal-400', barClass: 'bg-linear-to-r from-teal-500 to-emerald-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' },
        { name: 'React.js / Tailwind CSS', percent: 85, textClass: 'text-blue-600 dark:text-blue-400', barClass: 'bg-linear-to-r from-blue-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
        { name: 'MySQL / Node.js / Express', percent: 82, textClass: 'text-orange-600 dark:text-orange-400', barClass: 'bg-linear-to-r from-orange-500 to-amber-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' },
        { name: 'ESP32 / C++ / IoT Systems', percent: 78, textClass: 'text-purple-600 dark:text-purple-400', barClass: 'bg-linear-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' }
    ];

    const dotStyles = {
        teal: 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]',
        emerald: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]',
        blue: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
    };

    return (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        MongoDB <span className="text-teal-600 dark:text-emerald-400">Dashboard Overview</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Live analytics synced from your MongoDB Atlas database.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchDashboardData}
                    disabled={isRefreshing}
                    className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-emerald-400 border border-teal-500/30 hover:bg-teal-500/20 transition-all cursor-pointer"
                >
                    <FaSyncAlt className={isRefreshing ? 'animate-spin' : ''} />
                    {isRefreshing ? 'Syncing...' : 'Refresh Stats'}
                </button>
            </div>

            {/* 1. Stats Widgets */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {widgets.map((w, index) => (
                    <motion.div
                        key={w.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className='group relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-400/50 flex items-center gap-5 cursor-pointer'
                    >
                        <div className={`p-4 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${w.colorClass}`}>
                            <w.Icon size={24} className={`transition-transform duration-300 ${w.iconRotate}`} />
                        </div>
                        <div>
                            <p className='text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>
                                {w.label}
                            </p>
                            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>
                                {isLoading ? '...' : w.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 2. Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 pb-8">
                
                {/* Recent Activity Timeline */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <FaClock className="text-teal-500" /> Recent Activity Feed
                    </h2>
                    
                    <div className="space-y-6 border-l-2 border-teal-500/30 ml-3 pl-5">
                        {activities.length === 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activities recorded yet.</p>
                        ) : (
                            activities.map((item) => (
                                <div key={item.id} className="relative">
                                    <div className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900 ${dotStyles[item.color] || dotStyles.teal}`}></div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.title}</p>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                                        {formatTimeAgo(item.timestamp)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Skills Progress */}
                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <FaLayerGroup className="text-orange-500" /> Top Skills Overview
                    </h2>
                    
                    <div className="space-y-6 mt-4">
                        {skills.map((skill, i) => (
                            <div key={skill.name}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{skill.name}</span>
                                    <span className={`font-bold ${skill.textClass}`}>{skill.percent}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 shadow-inner overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.percent}%` }}
                                        transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
                                        className={`h-2.5 rounded-full ${skill.barClass}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardOverview;