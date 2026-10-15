import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaJava, FaPython, FaPhp, FaNodeJs, FaGitAlt, FaRust, FaAndroid, FaFigma, FaVideo, FaPaintBrush } from 'react-icons/fa';
import {
    SiJavascript, SiTypescript, SiTailwindcss, SiExpress, SiDotnet, SiGraphql,
    SiMysql, SiMongodb, SiHibernate, SiPostgresql, SiArduino, SiCplusplus,
    SiPostman, SiKotlin, SiFlutter, SiTensorflow, SiPytorch, SiOpencv,
    SiElectron, SiRaspberrypi, SiSpringboot, SiIntellijidea,
    SiMysql as SiWorkbench
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { TbBrandReactNative, TbBrandCSharp } from 'react-icons/tb';
import { X } from 'lucide-react';

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
        'Tools'
    ];

    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState(null);

    const allSkills = [
        // --- WEB & FRONTEND ---
        {
            name: 'HTML5',
            categories: ['Frontend', 'Web Based'],
            icon: FaHtml5,
            color: 'text-[#E34F26]',
            desc: 'Architecting W3C-compliant, semantic markup structures engineered for maximum SEO visibility, cross-browser compatibility, and WCAG accessibility standards.'
        },
        {
            name: 'CSS3',
            categories: ['Frontend', 'Web Based'],
            icon: FaCss3Alt,
            color: 'text-[#1572B6]',
            desc: 'Crafting fluid, hardware-accelerated animations and complex responsive grid layouts to deliver an uncompromising, pixel-perfect visual experience across all viewports.'
        },
        {
            name: 'JavaScript',
            categories: ['Frontend', 'Backend', 'Web Based'],
            icon: SiJavascript,
            color: 'text-[#F7DF1E]',
            desc: 'Mastering asynchronous programming, complex DOM manipulation, and ES6+ event-driven architecture to build highly responsive, full-stack web application logic.'
        },
        {
            name: 'TypeScript',
            categories: ['Frontend', 'Backend', 'Web Based'],
            icon: SiTypescript,
            color: 'text-[#3178C6]',
            desc: 'Enforcing strict static typing and object-oriented design patterns to eliminate runtime anomalies and guarantee enterprise-grade code scalability and maintainability.'
        },
        {
            name: 'React JS',
            categories: ['Frontend', 'Web Based'],
            icon: FaReact,
            color: 'text-[#61DAFB]',
            desc: 'Developing high-performance Single Page Applications (SPAs) utilizing advanced state management, custom hooks, and optimized virtual DOM rendering for seamless user journeys.'
        },
        {
            name: 'Tailwind CSS',
            categories: ['Frontend', 'Web Based'],
            icon: SiTailwindcss,
            color: 'text-[#06B6D4]',
            desc: 'Engineering scalable, utility-first design systems and bespoke dark-mode interfaces with zero CSS bloat, ensuring rapid UI deployment and maintainable styling.'
        },
        {
            name: 'Bootstrap',
            categories: ['Frontend', 'Web Based'],
            icon: FaBootstrap,
            color: 'text-[#7952B3]',
            desc: 'Utilizing mobile-first grid architectures and pre-engineered UI components to rapidly prototype and deploy consistent, cross-device responsive web interfaces.'
        },

        // --- BACKEND & ENTERPRISE ---
        {
            name: 'Java',
            categories: ['Backend', 'Desktop App', 'Mobile Dev', 'Web Based'],
            icon: FaJava,
            color: 'text-[#f89820]',
            desc: 'Engineering mission-critical, object-oriented backend systems, standalone desktop applications (JavaFX/Swing), and secure enterprise architectures.'
        },
        {
            name: 'Spring Boot',
            categories: ['Backend', 'Web Based'],
            icon: SiSpringboot,
            color: 'text-[#6DB33F]',
            desc: 'Architecting production-ready, cloud-native Java microservices, secure RESTful APIs, and enterprise backend systems with rapid dependency injection and embedded server configurations.'
        },
        {
            name: 'C#',
            categories: ['Backend', 'Desktop App', 'Web Based'],
            icon: TbBrandCSharp,
            color: 'text-[#68217A]',
            desc: 'Engineering type-safe, object-oriented enterprise software, Windows desktop applications, and high-performance backend architectures within the .NET ecosystem.'
        },
        {
            name: '.NET Framework',
            categories: ['Backend', 'Desktop App', 'Web Based'],
            icon: SiDotnet,
            color: 'text-[#512BD4]',
            desc: 'Developing robust enterprise web services, Windows desktop software (WPF/WinForms), and scalable architectures utilizing the Microsoft .NET ecosystem.'
        },
        {
            name: 'Rust',
            categories: ['Backend', 'Desktop App', 'Robotics & IoT'],
            icon: FaRust,
            color: 'text-[#DEA584]',
            desc: 'Writing memory-safe, zero-cost abstraction systems programming and ultra-fast, concurrent backend services with guaranteed thread safety and peak performance.'
        },
        {
            name: 'Node JS',
            categories: ['Backend', 'Web Based'],
            icon: FaNodeJs,
            color: 'text-[#339933]',
            desc: 'Building non-blocking, event-driven microservices and high-throughput backend architectures capable of handling concurrent web requests with ultra-low latency.'
        },
        {
            name: 'Express JS',
            categories: ['Backend', 'Web Based'],
            icon: SiExpress,
            color: 'text-gray-600 dark:text-gray-200',
            desc: 'Architecting robust RESTful APIs, custom middleware pipelines, and secure routing mechanisms for fast, scalable server-side web applications.'
        },
        {
            name: 'PHP',
            categories: ['Backend', 'Web Based'],
            icon: FaPhp,
            color: 'text-[#777BB4]',
            desc: 'Developing robust server-side architectures, secure session management protocols, and dynamic data-processing pipelines for scalable web platforms.'
        },
        {
            name: 'GraphQL',
            categories: ['Backend', 'Web Based'],
            icon: SiGraphql,
            color: 'text-[#E10098]',
            desc: 'Implementing declarative data-fetching APIs to eliminate over-fetching, optimize network payloads, and streamline complex frontend-backend communication.'
        },

        // --- AI, ML & DATA SCIENCE ---
        {
            name: 'Python',
            categories: ['AI & ML', 'Backend', 'Desktop App', 'Robotics & IoT'],
            icon: FaPython,
            color: 'text-[#3776AB]',
            desc: 'Leveraging advanced algorithmic logic and OOP for Artificial Intelligence, Machine Learning models, automated data parsing, and scalable backend workflows.'
        },
        {
            name: 'TensorFlow',
            categories: ['AI & ML'],
            icon: SiTensorflow,
            color: 'text-[#FF6F00]',
            desc: 'Building and training deep neural networks, predictive machine learning models, and scalable AI solutions for complex data-driven applications.'
        },
        {
            name: 'PyTorch',
            categories: ['AI & ML'],
            icon: SiPytorch,
            color: 'text-[#EE4C2C]',
            desc: 'Designing dynamic computation graphs and deep learning architectures for natural language processing (NLP) and advanced AI research implementations.'
        },
        {
            name: 'OpenCV',
            categories: ['AI & ML', 'Robotics & IoT'],
            icon: SiOpencv,
            color: 'text-[#5C3EE8]',
            desc: 'Implementing real-time computer vision, image processing, and automated object detection algorithms for intelligent software and robotic vision systems.'
        },

        // --- MOBILE DEVELOPMENT ---
        {
            name: 'Android',
            categories: ['Mobile Dev'],
            icon: FaAndroid,
            color: 'text-[#3DDC84]',
            desc: 'Developing native Android applications utilizing Android SDK, Material Design guidelines, background services, and hardware-level APIs for optimal mobile performance.'
        },
        {
            name: 'Flutter',
            categories: ['Mobile Dev', 'Desktop App', 'Frontend'],
            icon: SiFlutter,
            color: 'text-[#02569B]',
            desc: 'Building natively compiled, multi-platform applications for mobile, web, and desktop from a single Dart codebase with expressive UIs and hardware-accelerated graphics.'
        },
        {
            name: 'React Native',
            categories: ['Mobile Dev', 'Frontend'],
            icon: TbBrandReactNative,
            color: 'text-[#61DAFB]',
            desc: 'Engineering cross-platform mobile applications with native bridge integrations, delivering smooth 60fps animations and unified business logic across iOS and Android.'
        },
        {
            name: 'Kotlin',
            categories: ['Mobile Dev', 'Backend'],
            icon: SiKotlin,
            color: 'text-[#7F52FF]',
            desc: 'Engineering modern, null-safe native Android applications with concise syntax, coroutines for asynchronous execution, and seamless Java interoperability.'
        },

        // --- DESKTOP APPLICATIONS ---
        {
            name: 'Electron JS',
            categories: ['Desktop App', 'Frontend'],
            icon: SiElectron,
            color: 'text-[#47848F]',
            desc: 'Building cross-platform desktop applications for Windows, macOS, and Linux using modern web technologies combined with native operating system APIs.'
        },

        // --- DATABASE & ORM ---
        {
            name: 'MySQL',
            categories: ['Database'],
            icon: SiMysql,
            color: 'text-[#4479A1]',
            desc: 'Designing ACID-compliant, normalized relational database schemas, intricate ER models, and indexing strategies for high-speed query execution and data integrity.'
        },
        {
            name: 'MongoDB',
            categories: ['Database'],
            icon: SiMongodb,
            color: 'text-[#47A248]',
            desc: 'Architecting horizontally scalable, document-oriented NoSQL data clusters optimized for high-velocity read/write operations in modern cloud-native apps.'
        },
        {
            name: 'PostgreSQL',
            categories: ['Database'],
            icon: SiPostgresql,
            color: 'text-[#4169E1]',
            desc: 'Managing enterprise-class object-relational database systems with advanced data types, complex query optimization, and high-concurrency transaction handling.'
        },
        {
            name: 'Hibernate ORM',
            categories: ['Database', 'Backend'],
            icon: SiHibernate,
            color: 'text-[#59666C]',
            desc: 'Implementing enterprise Object-Relational Mapping (ORM) to automate complex data persistence, caching, and seamless transaction management in Java ecosystems.'
        },

        // --- ROBOTICS & IOT ---
        {
            name: 'C++ / ESP32',
            categories: ['Robotics & IoT', 'Desktop App'],
            icon: SiCplusplus,
            color: 'text-[#00599C]',
            desc: 'Developing high-performance embedded C++ firmware for ESP32 microcontrollers and system-level software to power Wi-Fi-enabled hardware security systems.'
        },
        {
            name: 'Arduino',
            categories: ['Robotics & IoT'],
            icon: SiArduino,
            color: 'text-[#00979D]',
            desc: 'Programming low-level microcontroller firmware and embedded logic to bridge physical hardware sensors, actuators, and real-time IoT automation systems.'
        },
        {
            name: 'Raspberry Pi',
            categories: ['Robotics & IoT'],
            icon: SiRaspberrypi,
            color: 'text-[#A22846]',
            desc: 'Deploying Linux-based edge computing, home automation servers, and complex robotic control systems using single-board computer architectures.'
        },

        // --- TOOLS & SOFTWARE ---
        {
            name: 'VS Code',
            categories: ['Tools'],
            icon: VscVscode,
            color: 'text-[#007ACC]',
            desc: '...'
        },
        {
            name: 'IntelliJ IDEA',
            categories: ['Tools'],
            icon: SiIntellijidea,
            color: 'text-[#FE315D]',
            desc: 'Utilizing intelligent code completion, automated refactoring, and enterprise-grade debugging tools in IntelliJ IDEA for robust Java and backend development.'
        },
        {
            name: 'Arduino IDE',
            categories: ['Tools', 'Robotics & IoT'],
            icon: SiArduino,
            color: 'text-[#00979D]',
            desc: 'Compiling, verifying, and flashing low-level microcontroller firmware via Arduino IDE to seamlessly test and deploy IoT hardware solutions.'
        },
        {
            name: 'MySQL Workbench',
            categories: ['Tools', 'Database'],
            icon: SiWorkbench,
            color: 'text-[#4479A1]',
            desc: 'Designing visual database schemas, executing complex SQL queries, and managing relational database migrations efficiently using MySQL Workbench.'
        },
        {
            name: 'HeidiSQL',
            categories: ['Tools', 'Database'],
            icon: SiMysql,
            color: 'text-[#F4B41A]',
            desc: 'Administering lightweight database connections, browsing table data, and managing server processes rapidly with HeidiSQL.'
        },
        {
            name: 'Figma',
            categories: ['Tools', 'Frontend'],
            icon: FaFigma,
            color: 'text-[#F24E1E]',
            desc: 'Designing intuitive user interfaces, wireframes, interactive prototypes, and modern design systems before translating them into clean code.'
        },
        {
            name: 'Canva',
            categories: ['Tools'],
            icon: FaPaintBrush,
            color: 'text-[#00C4CC]',
            desc: 'Crafting professional promotional graphics, social media content banners, and branding assets for digital marketing and portfolio presentations.'
        },
        {
            name: 'CapCut',
            categories: ['Tools'],
            icon: FaVideo,
            color: 'text-[#ffffff]',
            desc: 'Editing engaging social media videos, adding dynamic motion graphics, and synchronizing audio tracks for professional project showcases.'
        },
        {
            name: 'Git & GitHub',
            categories: ['Tools'],
            icon: FaGitAlt,
            color: 'text-[#F05032]',
            desc: 'Orchestrating distributed version control, multi-branch workflows, and automated CI/CD deployment pipelines for zero-downtime production releases.'
        },
        {
            name: 'Postman',
            categories: ['Tools', 'Web Based'],
            icon: SiPostman,
            color: 'text-[#FF6C37]',
            desc: 'Conducting rigorous API endpoint testing, payload validation, and automated request benchmarking to ensure rock-solid backend reliability.'
        }
    ];

    const filteredSkills = activeCategory === 'All'
        ? allSkills
        : allSkills.filter(skill => skill.categories.includes(activeCategory));

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
                        Explore my technical stack and development tools categorized by domain—from software engineering and IoT to design and editing workflows.
                    </p>
                </motion.div>

                {/* --- Category Filter Tabs --- */}
                <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 relative z-10 w-full pb-2 hide-scrollbar px-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`relative shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeCategory === category
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
                                    key={skill.name}
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
                </div>

            </div>

            {/* --- Modal --- */}
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
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 dark:hover:text-white bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
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