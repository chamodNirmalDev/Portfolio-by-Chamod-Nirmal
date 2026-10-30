import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaJava, FaPython, 
    FaPhp, FaNodeJs, FaGitAlt, FaRust, FaAndroid, FaFigma, FaVideo, 
    FaPaintBrush, FaCode, FaServer, FaDatabase, FaMobileAlt, FaDesktop, 
    FaBrain, FaRobot, FaTools 
} from 'react-icons/fa';
import {
    SiJavascript, SiTypescript, SiTailwindcss, SiExpress, SiDotnet, SiGraphql,
    SiMysql, SiMongodb, SiHibernate, SiPostgresql, SiArduino, SiCplusplus,
    SiPostman, SiKotlin, SiFlutter, SiTensorflow, SiPytorch, SiOpencv,
    SiElectron, SiRaspberrypi, SiSpringboot, SiIntellijidea,
    SiMysql as SiWorkbench
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { TbBrandReactNative, TbBrandCSharp } from 'react-icons/tb';
import { X, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// නමට අනුව අදාළ Icon එක සහ Color එක හඳුනාගැනීම
const iconMap = {
    'HTML5': { icon: FaHtml5, color: 'text-[#E34F26]' },
    'CSS3': { icon: FaCss3Alt, color: 'text-[#1572B6]' },
    'JavaScript': { icon: SiJavascript, color: 'text-[#F7DF1E]' },
    'TypeScript': { icon: SiTypescript, color: 'text-[#3178C6]' },
    'React JS': { icon: FaReact, color: 'text-[#61DAFB]' },
    'React.js': { icon: FaReact, color: 'text-[#61DAFB]' },
    'Tailwind CSS': { icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    'Bootstrap': { icon: FaBootstrap, color: 'text-[#7952B3]' },
    'Java': { icon: FaJava, color: 'text-[#f89820]' },
    'Spring Boot': { icon: SiSpringboot, color: 'text-[#6DB33F]' },
    'C#': { icon: TbBrandCSharp, color: 'text-[#68217A]' },
    '.NET Framework': { icon: SiDotnet, color: 'text-[#512BD4]' },
    'Rust': { icon: FaRust, color: 'text-[#DEA584]' },
    'Node JS': { icon: FaNodeJs, color: 'text-[#339933]' },
    'Node.js': { icon: FaNodeJs, color: 'text-[#339933]' },
    'Express JS': { icon: SiExpress, color: 'text-gray-600 dark:text-gray-200' },
    'PHP': { icon: FaPhp, color: 'text-[#777BB4]' },
    'GraphQL': { icon: SiGraphql, color: 'text-[#E10098]' },
    'Python': { icon: FaPython, color: 'text-[#3776AB]' },
    'TensorFlow': { icon: SiTensorflow, color: 'text-[#FF6F00]' },
    'PyTorch': { icon: SiPytorch, color: 'text-[#EE4C2C]' },
    'OpenCV': { icon: SiOpencv, color: 'text-[#5C3EE8]' },
    'Android': { icon: FaAndroid, color: 'text-[#3DDC84]' },
    'Flutter': { icon: SiFlutter, color: 'text-[#02569B]' },
    'React Native': { icon: TbBrandReactNative, color: 'text-[#61DAFB]' },
    'Kotlin': { icon: SiKotlin, color: 'text-[#7F52FF]' },
    'Electron JS': { icon: SiElectron, color: 'text-[#47848F]' },
    'MySQL': { icon: SiMysql, color: 'text-[#4479A1]' },
    'MongoDB': { icon: SiMongodb, color: 'text-[#47A248]' },
    'PostgreSQL': { icon: SiPostgresql, color: 'text-[#4169E1]' },
    'Hibernate ORM': { icon: SiHibernate, color: 'text-[#59666C]' },
    'C++ / ESP32': { icon: SiCplusplus, color: 'text-[#00599C]' },
    'Arduino': { icon: SiArduino, color: 'text-[#00979D]' },
    'Raspberry Pi': { icon: SiRaspberrypi, color: 'text-[#A22846]' },
    'VS Code': { icon: VscVscode, color: 'text-[#007ACC]' },
    'IntelliJ IDEA': { icon: SiIntellijidea, color: 'text-[#FE315D]' },
    'Arduino IDE': { icon: SiArduino, color: 'text-[#00979D]' },
    'MySQL Workbench': { icon: SiWorkbench, color: 'text-[#4479A1]' },
    'Figma': { icon: FaFigma, color: 'text-[#F24E1E]' },
    'Canva': { icon: FaPaintBrush, color: 'text-[#00C4CC]' },
    'CapCut': { icon: FaVideo, color: 'text-[#ffffff]' },
    'Git & GitHub': { icon: FaGitAlt, color: 'text-[#F05032]' },
    'Postman': { icon: SiPostman, color: 'text-[#FF6C37]' }
};

const Skills = () => {
const categories = [
        'All',
        'Web Based',
        'Frontend',
        'Backend',
        'Mobile Dev',
        'Desktop App',
        'Database',
        'AI & ML',
        'Robotics & IoT',
        'Tools',
        'Management',
        'Languages / Communication',
        'Soft Skills'
    ];

    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [skillsList, setSkillsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // MongoDB වෙතින් Skills ලබාගැනීම
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`${API_URL}/api/skills`);
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    const formatted = result.data.map(item => {
                        const iconData = iconMap[item.name] || { icon: FaCode, color: 'text-teal-500' };
                        return {
                            id: item._id,
                            name: item.name,
                            categories: item.categories || ['Tools'],
                            icon: iconData.icon,
                            color: iconData.color,
                            proficiency: item.proficiency || 85,
                            desc: item.desc || 'Proficient in modern architecture and hands-on software design.'
                        };
                    });
                    setSkillsList(formatted);
                }
            } catch (error) {
                console.error('Error fetching live skills:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const filteredSkills = activeCategory === 'All'
        ? skillsList
        : skillsList.filter(skill => skill.categories.includes(activeCategory));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <section id="skills" className="min-h-screen flex items-center py-20 px-4 sm:px-6 relative overflow-hidden">

            {/* Ambient Glows */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className='absolute -top-40 right-10 md:right-40 w-60 md:w-80 h-60 md:h-80 bg-teal-500/10 rounded-full blur-[100px]'></motion.div>
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className='absolute -bottom-40 -left-10 md:-left-40 w-72 md:w-96 h-72 md:h-96 bg-emerald-500/10 rounded-full blur-[120px]'></motion.div>
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-5'>
                        <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>
                        <span className='text-xs sm:text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider'>Expertise</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900'>
                        My <span className='text-teal-600 dark:text-emerald-400'>Skills & Tools</span>
                    </h2>
                    <p className='mt-4 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed'>
                        Explore my technical stack and development tools synchronized directly from MongoDB.
                    </p>
                </motion.div>

                {/* --- Category Filter Tabs --- */}
                <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 relative z-10 w-full pb-2 hide-scrollbar px-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`relative shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeCategory === category
                                ? 'text-white shadow-lg shadow-teal-500/30'
                                : 'bg-gray-100/80 dark:bg-zinc-800/80 dark:text-gray-300 text-gray-700 hover:text-teal-600 dark:hover:text-teal-300 border border-gray-200/50 dark:border-zinc-700/50'
                                }`}
                        >
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 bg-teal-600 rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </button>
                    ))}
                </div>

                {/* --- Skills Grid --- */}
                <div className="min-h-[400px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-500 dark:text-gray-400">
                            <Loader2 size={32} className="animate-spin text-teal-500" />
                            <span className="text-sm">Loading skills from database...</span>
                        </div>
                    ) : filteredSkills.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                            No skills found for this category.
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-20"
                            >
                                {filteredSkills.map((skill) => (
                                    <motion.div
                                        key={skill.id || skill.name}
                                        variants={itemVariants}
                                        whileHover={{ y: -8, scale: 1.05 }}
                                        onClick={() => setSelectedSkill(skill)}
                                        className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className={`text-4xl sm:text-5xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${skill.color} drop-shadow-[0_0_12px_currentColor]`}>
                                            <skill.icon />
                                        </div>
                                        <h3 className="text-xs sm:text-base font-semibold dark:text-gray-200 text-gray-800 text-center group-hover:text-teal-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                            {skill.name}
                                        </h3>
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mt-2 sm:mt-3 group-hover:bg-teal-500 transition-colors duration-300"></div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

            </div>

            {/* --- Detail Modal --- */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSkill(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col items-center text-center"
                        >
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 dark:hover:text-white bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <div className={`text-6xl sm:text-7xl mb-4 sm:mb-6 ${selectedSkill.color} drop-shadow-[0_0_20px_currentColor]`}>
                                <selectedSkill.icon />
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-3">
                                {selectedSkill.name}
                            </h3>

                            <div className="flex flex-wrap justify-center gap-2 mb-5">
                                {selectedSkill.categories.map((cat, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                {selectedSkill.desc}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx='true'>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

        </section>
    );
};

export default Skills;