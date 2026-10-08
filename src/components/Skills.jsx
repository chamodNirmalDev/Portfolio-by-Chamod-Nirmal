import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaJava, FaPython, FaHtml5, FaPhp, FaNodeJs, FaBootstrap } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiMysql, SiMongodb, SiArduino } from 'react-icons/si';
import { TbBrandReactNative } from "react-icons/tb";
import { X } from 'lucide-react';

const Skills = () => {
    const categories = ['All', 'Frontend', 'Backend', 'Database', 'Other'];
    const [activeCategory, setActiveCategory] = useState('All');
    
    const [selectedSkill, setSelectedSkill] = useState(null);

    const allSkills = [
        { name: 'HTML', category: 'Frontend', icon: FaHtml5, color: 'text-[#E34F26]', desc: 'The foundational markup language used to structure and present content on the web.' },
        { name: 'JavaScript', category: 'Frontend', icon: SiJavascript, color: 'text-[#F7DF1E]', desc: 'A versatile programming language that brings interactivity and dynamic behavior to web pages.' },
        { name: 'React JS', category: 'Frontend', icon: FaReact, color: 'text-[#61DAFB]', desc: 'A powerful JavaScript library for building component-based, interactive user interfaces.' },
        { name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: 'text-[#06B6D4]', desc: 'A utility-first CSS framework that allows rapid UI development directly in your markup.' },
        { name: 'Bootstrap', category: 'Frontend', icon: FaBootstrap, color: 'text-[#7952B3]', desc: 'A popular HTML, CSS, and JS framework for developing responsive, mobile first projects.' },
        { name: 'Java', category: 'Backend', icon: FaJava, color: 'text-[#f89820]', desc: 'A robust, object-oriented programming language widely used for enterprise-scale backend systems.' },
        { name: 'Python', category: 'Backend', icon: FaPython, color: 'text-[#3776AB]', desc: 'A high-level language known for its readability, used in backend APIs, data science, and automation.' },
        { name: 'PHP', category: 'Backend', icon: FaPhp, color: 'text-[#777BB4]', desc: 'A widely-used open source general-purpose scripting language that is especially suited for web development.' },
        { name: 'Node JS', category: 'Backend', icon: FaNodeJs, color: 'text-[#339933]', desc: 'A JavaScript runtime built on Chrome\'s V8 engine, enabling scalable server-side programming.' },
        { name: 'MySQL', category: 'Database', icon: SiMysql, color: 'text-[#4479A1]', desc: 'A highly reliable relational database management system used for structured data storage.' },
        { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: 'text-[#47A248]', desc: 'A popular NoSQL database program that uses JSON-like documents with optional schemas.' },
        { name: 'React Native', category: 'Other', icon: TbBrandReactNative, color: 'text-[#61DAFB]', desc: 'An open-source UI software framework used to develop mobile applications for Android and iOS.' },
        { name: 'Arduino', category: 'Other', icon: SiArduino, color: 'text-[#00979D]', desc: 'An open-source electronics platform based on easy-to-use hardware and software for IoT projects.' },
    ];

    const filteredSkills = activeCategory === 'All'
        ? allSkills
        : allSkills.filter(skill => skill.category === activeCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
                    className="text-center mb-10 sm:mb-16"
                >
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-5'>
                        <span className='w-2 h-2 rounded-full bg-teal-500 animate-pulse'></span>
                        <span className='text-xs sm:text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider'>Expertise</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900'>
                        My <span className='text-teal-600 dark:text-emerald-400'>Skills</span>
                    </h2>
                    <p className='mt-4 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed'>
                        Here is a quick overview of my technical expertise and the core technologies I use to build robust and scalable digital solutions.
                    </p>
                </motion.div>

                {/* 
                    --- වෙනස් කළ ස්ථානය: Magic Tab Indicator ---
                    Mobile වලදී scroll වීමට overflow-x-auto යොදා ඇත.
                    hide-scrollbar class එක මගින් scrollbar එක සඟවා ඇත.
                */}
                <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 relative z-10 w-full pb-2 hide-scrollbar px-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            /* shrink-0 යෙදීමෙන් mobile වලදී බොත්තම් කුඩා වීම වළක්වයි. අක්‍රීය බොත්තම් වලටද bg එකක් ලබා දී ඇත. */
                            className={`relative shrink-0 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                                activeCategory === category
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

                {/* --- අදාළ දක්ෂතා පෙන්වන කොටස --- */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.1 }}
                            exit="exit"
                            /* Mobile වලදී gap එක අඩු කර ඇත (gap-4) */
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-20"
                        >
                            {filteredSkills.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, scale: 1.05 }}
                                    onClick={() => setSelectedSkill(skill)}
                                    /* Mobile වලදී padding අඩු කර ඇත (p-4) */
                                    className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 group cursor-pointer"
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
                </div>

            </div>

            {/* --- Modal (Click කළ විට පෙන්වන විස්තරය) --- */}
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
                            className="relative w-full max-w-sm p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col items-center text-center"
                        >
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 dark:hover:text-white bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className={`text-6xl sm:text-7xl mb-4 sm:mb-6 ${selectedSkill.color} drop-shadow-[0_0_20px_currentColor]`}>
                                <selectedSkill.icon />
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-2">
                                {selectedSkill.name}
                            </h3>
                            <span className="px-4 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 mb-4 sm:mb-6">
                                {selectedSkill.category}
                            </span>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                {selectedSkill.desc}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Scrollbar එක සඟවා තැබීමට CSS (Tabs සඳහා) */}
            <style jsx>{`
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