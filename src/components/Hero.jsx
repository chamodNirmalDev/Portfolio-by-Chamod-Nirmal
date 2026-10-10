import React, { useState, useEffect } from 'react'
import hero from '../assets/hero.png'
import { FaFacebook, FaGithub, FaInstagram, FaYoutube, FaReact, FaJava, FaDatabase, FaPython, FaHtml5, FaPhp, FaCss3 } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import CV from '../assets/cv.pdf'
import { DownloadIcon, Mail, Check, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'

// --- Number Counting Component ---
const AnimatedCounter = ({ to }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, to, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (value) => {
                setCurrentValue(Math.round(value));
            }
        });

        return controls.stop;
    }, [to]);

    return <span>{currentValue}</span>;
};

// --- Animated Download Button Component ---
const AnimatedDownloadButton = ({ cvFile }) => {
    const [downloadState, setDownloadState] = useState('idle');

    const handleDownload = () => {
        if (downloadState !== 'idle') return;
        
        // Downloading තත්ත්වයට පත් කිරීම
        setDownloadState('downloading');

        // ඇත්තටම CV එක Download වීමට ලබා දෙන කේතය
        const link = document.createElement('a');
        link.href = cvFile;
        link.download = "Chamod_Nirmal_CV.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // තත්පර 2කින් Progress එක පිරී Completed තත්ත්වයට පත් කිරීම
        setTimeout(() => {
            setDownloadState('completed');
            
            // තත්පර 2කට පසු නැවතත් මුල් තත්ත්වයට පත් කිරීම
            setTimeout(() => {
                setDownloadState('idle');
            }, 2000);
        }, 2000);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={downloadState !== 'idle'}
            className='relative overflow-hidden w-full sm:w-48 h-12 inline-flex items-center justify-center rounded-full text-white font-semibold bg-linear-to-r from-teal-500 to-emerald-600 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300 transform hover:scale-105 whitespace-nowrap disabled:cursor-wait disabled:hover:scale-100 disabled:hover:shadow-none'
        >
            <AnimatePresence mode="wait">
                
                {/* 1. Idle State */}
                {downloadState === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 relative z-10 w-full justify-center"
                    >
                        {/* දිලිසෙන කිරණය (Shine Effect) */}
                        <motion.div animate={{ x: ['-200%', '300%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }} className="absolute inset-0 z-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                        <DownloadIcon size={18} className="relative z-10" />
                        <span className="relative z-10">Download CV</span>
                    </motion.div>
                )}

                {/* 2. Downloading State */}
                {downloadState === 'downloading' && (
                    <motion.div
                        key="downloading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center w-full h-full relative"
                    >
                        <span className="relative z-10 text-white font-bold tracking-widest text-xs sm:text-sm uppercase drop-shadow-md">Downloading...</span>
                        
                        {/* Progress Bar (පිරීගෙන යන කොටස) */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute left-0 top-0 bottom-0 bg-teal-800/40 z-0"
                        />
                    </motion.div>
                )}

                {/* 3. Completed State */}
                {downloadState === 'completed' && (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 bg-emerald-500 w-full h-full justify-center absolute inset-0 z-20"
                    >
                        <span className="font-bold">Ready!</span>
                        
                        {/* ඊතලය */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <ArrowRight size={20} />
                        </motion.div>
                        
                        {/* හරි ලකුණ */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <Check size={18} className="absolute right-4 top-1/2 -translate-y-1/2" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

const Hero = () => {

    const text = "< Full Stack Developer >";

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, display: 'none' },
        visible: { opacity: 1, display: 'inline-block' }
    };

    return (
        <section id='home' className='min-h-screen flex items-center pb-24 sm:pb-24 relative overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-12 lg:mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>

                    {/* --- වම් පස පින්තූර කොටස සහ ORBITING ICONS --- */}
                    <div className='lg:w-2/5 w-full flex justify-center relative' data-aos='fade-right'>
                        <div className='relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center mx-auto'>
                            <div className='relative group z-10 w-full h-full'>
                                <div className='absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-full filter blur-2xl opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500' />
                                <div className='relative w-full h-full rounded-full border-4 border-white/5 shadow-2xl z-10'>
                                    <img src={hero} alt='profile' className='w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500' />
                                    <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-110 group-hover:scale-120 transition-transform duration-500'></div>
                                    <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-120 group-hover:scale-140 transition-transform duration-500'></div>
                                </div>
                            </div>

                            {/* --- කැරකෙන කක්ෂය (Orbiting Track) --- */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 z-20 pointer-events-none rounded-full [--orbit-radius:-140px] sm:[--orbit-radius:-210px] lg:[--orbit-radius:-240px]"
                            >
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(0deg) translateY(var(--orbit-radius)) rotate(0deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#61DAFB]"><FaReact className="w-5 h-5 sm:w-8 sm:h-8" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(45deg) translateY(var(--orbit-radius)) rotate(-45deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#f89820]"><FaJava className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(90deg) translateY(var(--orbit-radius)) rotate(-90deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#3776AB]"><FaPython className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(135deg) translateY(var(--orbit-radius)) rotate(-135deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#00758F]"><FaDatabase className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(180deg) translateY(var(--orbit-radius)) rotate(-180deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-gray-800 dark:text-white"><FaGithub className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(225deg) translateY(var(--orbit-radius)) rotate(-225deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#E34F26]"><FaHtml5 className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(270deg) translateY(var(--orbit-radius)) rotate(-270deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#777BB4]"><FaPhp className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(315deg) translateY(var(--orbit-radius)) rotate(-315deg)" }}>
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-full shadow-xl text-[#00979D]"><FaCss3 className="w-5 h-5 sm:w-7 sm:h-7" /></motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* --- දකුණු පස අකුරු කොටස --- */}
                    <div className='lg:w-3/5 w-full flex flex-col items-center lg:items-start text-center lg:text-left' data-aos='fade-left'>

                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5 mt-8 lg:mt-0'>
                            <span className='w-2 h-2 rounded-full dark:bg-red-500 bg-red-800 animate-pulse'></span>
                            <span className='text-sm font-medium dark:text-teal-300 text-teal-800'>Available for work</span>
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 dark:text-white text-gray-800'>
                            Hello, I'm <span className='text-teal-700 dark:text-teal-400'>Chamod</span>
                        </h1>

                        <motion.h2
                            variants={containerVariants}
                            initial='hidden' animate='visible'
                            className='text-2xl sm:text-3xl font-mono mb-4 dark:text-emerald-500 text-emerald-700 flex items-center justify-center 
                                lg:justify-start flex-wrap'>
                            {text.split("").map((char, index) => {
                                const isBracket = char === "<" || char === ">";
                                return (
                                    <motion.span
                                        key={index}
                                        variants={letterVariants}
                                        className={isBracket ? "text-teal-700 dark:text-teal-400" : ""}>
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                );
                            })}
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.8,
                                    ease: "linear"
                                }}
                                className="inline-block w-0.75 h-5 sm:h-6 bg-emerald-700 dark:bg-emerald-500 ml-2">
                            </motion.span>
                        </motion.h2>

                        <p className='mb-6 leading-relaxed max-w-md lg:max-w-lg dark:text-emerald-100/80 text-emerald-950'>
                            Welcome to my portfolio! I am DMD Chamod Nirmal, a multi-disciplinary Full Stack Developer and Tech Enthusiast.
                            From building robust web and desktop applications to developing hardware-integrated IoT systems with ESP32, Arduino,
                            and other microcontrollers, and crafting high-quality video content, I deliver complete end-to-end digital solutions.
                        </p>

                        {/* --- Number Counting Animation --- */}
                        <div className='flex gap-10 mb-7'>
                            {[
                                { number: 3, label: "Years Experience" },
                                { number: 30, label: "Projects Done" },
                                { number: 10, label: "Happy Clients" }
                            ].map((stat, index) => (
                                <div key={index} className='text-center'>
                                    <div className='text-3xl font-bold dark:text-emerald-100 text-teal-900 flex items-center justify-center'>
                                        <AnimatedCounter to={stat.number} />+
                                    </div>
                                    <div className='text-base dark:text-emerald-100/70 text-teal-800'>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* --- Buttons Section --- */}
                        <div className='flex flex-col sm:flex-row gap-5 w-full sm:w-auto'>
                            
                            {/* අලුතින් එක් කළ Animated Download Button එක */}
                            <AnimatedDownloadButton cvFile={CV} />

                            <a href="#contact" className='w-full sm:w-auto group'>
                                <button className='relative overflow-hidden w-full sm:w-48 h-12 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 dark:border-teal-500 border-teal-600 dark:text-emerald-100 text-teal-900 font-semibold dark:hover:bg-emerald-600 hover:bg-teal-600 hover:text-white hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300 transform hover:scale-105 whitespace-nowrap'>
                                    <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5 }} className="absolute inset-0 z-0 w-1/3 bg-linear-to-r from-transparent via-teal-500/30 to-transparent skew-x-12" />
                                    <span className="relative z-10 flex items-center gap-2"><Mail size={18} /> Hire Me</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero