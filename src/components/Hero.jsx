import React, { useState, useEffect } from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaYoutube, FaReact, FaJava, FaDatabase, FaPython, FaHtml5, FaPhp, FaCss3 } from 'react-icons/fa';
import { DownloadIcon, Mail, Check, ArrowRight } from 'lucide-react';
import { motion, animate, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const AnimatedCounter = ({ to }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (!to && to !== 0) return;
        const controls = animate(0, Number(to) || 0, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (value) => setCurrentValue(Math.round(value))
        });
        return controls.stop;
    }, [to]);

    return <span>{currentValue}</span>;
};

const AnimatedDownloadButton = ({ cvUrl }) => {
    const [downloadState, setDownloadState] = useState('idle');

    const handleDownload = () => {
        if (downloadState !== 'idle' || !cvUrl) return;
        setDownloadState('downloading');

        fetch(`${API_URL}/api/track/cv`, { method: 'POST' }).catch(() => {});

        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            setDownloadState('completed');
            setTimeout(() => setDownloadState('idle'), 2000);
        }, 2000);
    };

    if (!cvUrl) return null;

    return (
        <button
            onClick={handleDownload}
            disabled={downloadState !== 'idle'}
            className='relative overflow-hidden w-full sm:w-48 h-12 inline-flex items-center justify-center rounded-full text-white font-semibold bg-linear-to-r from-teal-500 to-emerald-600 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer'
        >
            <AnimatePresence mode="wait">
                {downloadState === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 relative z-10 w-full justify-center">
                        <DownloadIcon size={18} />
                        <span>Download CV</span>
                    </motion.div>
                )}
                {downloadState === 'downloading' && (
                    <motion.div key="downloading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center w-full h-full relative">
                        <span className="relative z-10 text-white font-bold tracking-widest text-xs uppercase">Downloading...</span>
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} className="absolute left-0 top-0 bottom-0 bg-teal-800/40 z-0" />
                    </motion.div>
                )}
                {downloadState === 'completed' && (
                    <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 bg-emerald-500 w-full h-full justify-center absolute inset-0 z-20">
                        <span className="font-bold">Ready!</span>
                        <ArrowRight size={20} />
                        <Check size={18} className="absolute right-4 top-1/2 -translate-y-1/2" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

const Hero = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/profile`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setProfile(data.data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    if (!profile) return null;

    const animatedTitle = profile.jobTitle ? `< ${profile.jobTitle} >` : '';
    const displayName = profile.fullName ? profile.fullName.split(' ')[0] : '';

    return (
        <section id='home' className='min-h-screen flex items-center pb-24 sm:pb-24 relative overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-12 lg:mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>

                    {/* වම් පස පින්තූරය සහ Orbit */}
                    <div className='lg:w-2/5 w-full flex justify-center relative' data-aos='fade-right'>
                        <div className='relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center mx-auto'>
                            <div className='relative group z-10 w-full h-full'>
                                <div className='absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-full filter blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-500' />
                                <div className='relative w-full h-full rounded-full border-4 border-white/5 shadow-2xl z-10 overflow-hidden bg-gray-900'>
                                    {profile.avatarUrl && (
                                        <img src={profile.avatarUrl} alt='profile' className='w-full h-full object-cover rounded-full' />
                                    )}
                                    <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-110 pointer-events-none'></div>
                                    <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-120 pointer-events-none'></div>
                                </div>
                            </div>

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 z-20 pointer-events-none rounded-full [--orbit-radius:-140px] sm:[--orbit-radius:-210px] lg:[--orbit-radius:-240px]"
                            >
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(0deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#61DAFB]"><FaReact className="w-5 h-5 sm:w-8 sm:h-8" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(45deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#f89820]"><FaJava className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(90deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#3776AB]"><FaPython className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(135deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#00758F]"><FaDatabase className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(180deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-gray-800 dark:text-white"><FaGithub className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(225deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#E34F26]"><FaHtml5 className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(270deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#777BB4]"><FaPhp className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(315deg) translateY(var(--orbit-radius))" }}><div className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 rounded-full text-[#00979D]"><FaCss3 className="w-5 h-5 sm:w-7 sm:h-7" /></div></div>
                            </motion.div>
                        </div>
                    </div>

                    {/* දකුණු පස විස්තර */}
                    <div className='lg:w-3/5 w-full flex flex-col items-center lg:items-start text-center lg:text-left' data-aos='fade-left'>
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5'>
                            <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>
                            <span className='text-sm font-medium dark:text-teal-300 text-teal-800'>Available for work</span>
                        </div>

                        {profile.fullName && (
                            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 dark:text-white text-gray-800'>
                                Hello, I'm <span className='text-teal-700 dark:text-teal-400'>{displayName}</span>
                            </h1>
                        )}

                        {animatedTitle && (
                            <h2 className='text-2xl sm:text-3xl font-mono mb-4 dark:text-emerald-500 text-emerald-700 flex items-center justify-center lg:justify-start'>
                                {animatedTitle}
                            </h2>
                        )}

                        {profile.heroBio && (
                            <p className='mb-6 leading-relaxed max-w-md lg:max-w-lg dark:text-emerald-100/80 text-emerald-950 text-sm sm:text-base'>
                                {profile.heroBio}
                            </p>
                        )}

                        {/* Stats Counter */}
                        <div className='flex gap-10 mb-7'>
                            {[
                                { number: profile.yearsExperience, label: "Years Experience" },
                                { number: profile.projectsDone, label: "Projects Done" },
                                { number: profile.happyClients, label: "Happy Clients" }
                            ].filter(stat => stat.number !== undefined && stat.number !== null).map((stat, idx) => (
                                <div key={idx} className='text-center'>
                                    <div className='text-3xl font-bold dark:text-emerald-100 text-teal-900'>
                                        <AnimatedCounter to={stat.number} />+
                                    </div>
                                    <div className='text-xs sm:text-sm text-teal-800 dark:text-emerald-100/70'>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Buttons Section */}
                        <div className='flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center mt-4'>
                            <AnimatedDownloadButton cvUrl={profile.cvUrl} />
                            <a href="#contacts" onClick={(e) => { e.preventDefault(); document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }); }} className='w-full sm:w-auto'>
                                <button className='w-full sm:w-48 h-12 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-teal-600 dark:border-teal-500 text-teal-900 dark:text-emerald-100 font-semibold hover:bg-teal-600 hover:text-white transition-all cursor-pointer'>
                                    <Mail size={18} /> Hire Me
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;