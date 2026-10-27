import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import project1 from '../assets/Project-1.jpg'
import project2 from '../assets/Project-2.webp'
import project3 from '../assets/Project-3.jpg'
import project4 from '../assets/Project-4.webp'
import {
    ChevronLeft, ChevronRight, ExternalLink, Play, X, Monitor, Smartphone,
    Loader2, Download, Images, Cpu, ShoppingCart, AppWindow, Globe
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projectsData = [
    {
        id: 1,
        type: 'E-Commerce',
        image: project1,
        title: 'Admiria — Multi-Vendor Camera Store',
        desc: 'A full-stack Java EE multi-vendor e-commerce platform featuring OTP email verification, dynamic specification filtering, PayHere payment gateway integration, automated PDF invoicing, and a dedicated seller analytics portal.',
        tags: ['Java EE', 'Servlets', 'Hibernate ORM', 'MySQL', 'PayHere API', 'JavaScript'],
        github: 'https://github.com/chamodNirmalDev/Admiria',
        demos: [
            { 
                label: 'Client & Seller Demo (Part 1)', 
                src: 'https://youtu.be/KDios_qbVwg' 
            }
        ],
    },
    {
        id: 2,
        type: 'E-Commerce',
        image: project2,
        title: 'ClickLK',
        desc: 'A scalable full-stack e-commerce web application engineered with secure user authentication, dynamic product catalog management, shopping cart workflows, and relational database persistence.',
        tags: ['Java', 'Servlets', 'Hibernate ORM', 'MySQL', 'HTML/CSS', 'JavaScript'],
        github: 'https://github.com/chamodNirmalDev',
        demos: [],
    },
    {
        id: 3,
        type: 'Desktop App',
        image: project3,
        title: 'Automated Catalog Management System',
        desc: 'An automated catalog management application implementing object-oriented programming principles and regular expressions to parse, validate, and manage structured catalog records efficiently.',
        tags: ['Python', 'OOP', 'Regex', 'Data Parsing'],
        github: 'https://github.com/chamodNirmalDev',
        download: null,
        demos: [],
    },
    {
        id: 4,
        type: 'IoT',
        image: project4,
        title: 'ESP32 IoT Local Web Server',
        desc: 'A hardware-integrated IoT application running an asynchronous local web server on an ESP32 microcontroller with custom mDNS domain routing and real-time LED hardware status indicators.',
        tags: ['C++', 'ESP32', 'Arduino IDE', 'mDNS', 'Embedded Web'],
        github: 'https://github.com/chamodNirmalDev',
        demos: [],
    },
]

const typeConfig = {
    'E-Commerce': { icon: ShoppingCart },
    'Desktop App': { icon: AppWindow },
    'IoT': { icon: Cpu },
    'Web': { icon: Globe },
}

const filters = ['All', ...Object.keys(typeConfig).filter(t => projectsData.some(p => p.type === t))]

const GAP = 24 // gap-6 = 24px

const arrowBtn =
    "p-3 rounded-full border-2 transition-all duration-300 border-gray-300 dark:border-zinc-600 " +
    "text-gray-800 dark:text-white enabled:hover:border-teal-500 dark:enabled:hover:border-emerald-500 " +
    "enabled:hover:bg-teal-500/10 dark:enabled:hover:bg-emerald-500/10 " +
    "disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"

const linkBtn =
    "inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 " +
    "dark:text-gray-400 text-gray-600 dark:hover:text-teal-400 hover:text-teal-600 cursor-pointer"

// URL එකේ වර්ගය හඳුනාගන්නවා: youtube | video | site
const getDemoInfo = (url) => {
    const yt = typeof url === 'string' && url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
    if (yt) return { kind: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0` }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { kind: 'video', src: url }
    return { kind: 'site', src: url }
}

const resolveDemo = (demo) =>
    demo.images
        ? { kind: 'gallery', src: null, images: demo.images, label: demo.label }
        : { ...getDemoInfo(demo.src), label: demo.label }

const demoButtonFor = (project) => {
    const first = project.demos?.[0]
    if (!first) return null
    const { kind } = resolveDemo(first)
    if (kind === 'gallery') return { text: 'Screenshots', Icon: Images }
    if (kind === 'site') return { text: 'Live Demo', Icon: Play }
    return { text: 'Watch Demo', Icon: Play }
}

const Project = () => {
    const scrollRef = useRef(null)
    const [activeType, setActiveType] = useState('All')
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    // Demo popup state
    const [activeProject, setActiveProject] = useState(null)
    const [demoIndex, setDemoIndex] = useState(0)
    const [device, setDevice] = useState('desktop')
    const [frameLoaded, setFrameLoaded] = useState(false)
    const [slide, setSlide] = useState(0)

    const filtered = activeType === 'All'
        ? projectsData
        : projectsData.filter(p => p.type === activeType)

    const updateArrows = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }, [])

    useEffect(() => {
        updateArrows()
        const el = scrollRef.current
        el?.addEventListener('scroll', updateArrows, { passive: true })
        window.addEventListener('resize', updateArrows)
        return () => {
            el?.removeEventListener('scroll', updateArrows)
            window.removeEventListener('resize', updateArrows)
        }
    }, [updateArrows])

    useEffect(() => {
        scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
        updateArrows()
    }, [activeType, updateArrows])

    const currentDemo = activeProject ? resolveDemo(activeProject.demos[demoIndex]) : null

    useEffect(() => {
        if (!activeProject) return
        const onKey = (e) => {
            if (e.key === 'Escape') setActiveProject(null)
            if (currentDemo?.kind === 'gallery') {
                const n = currentDemo.images.length
                if (e.key === 'ArrowRight') setSlide(s => (s + 1) % n)
                if (e.key === 'ArrowLeft') setSlide(s => (s - 1 + n) % n)
            }
        }
        window.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [activeProject, currentDemo])

    const openDemo = (project) => {
        setDemoIndex(0)
        setDevice('desktop')
        setFrameLoaded(false)
        setSlide(0)
        setActiveProject(project)
    }

    const switchDemo = (i) => {
        setDemoIndex(i)
        setFrameLoaded(false)
        setSlide(0)
    }

    const handleScroll = (direction) => {
        const el = scrollRef.current
        if (!el) return
        const card = el.firstElementChild
        const step = card ? card.offsetWidth + GAP : el.clientWidth
        el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
    }

    return (
        <section id="projects" className="min-h-screen flex items-center pt-20 pb-32 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-8 lg:px-14 relative z-10">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 gap-6"
                >
                    <div className="text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-xs sm:text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider">Portfolio</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900">
                            My <span className="text-teal-600 dark:text-emerald-400">Projects</span>
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                            E-commerce platforms, desktop applications and IoT systems I've designed and built.
                        </p>
                    </div>

                    <div className="flex gap-3 shrink-0">
                        <button type="button" onClick={() => handleScroll('left')} disabled={!canScrollLeft} aria-label="Previous projects" className={arrowBtn}>
                            <ChevronLeft size={22} />
                        </button>
                        <button type="button" onClick={() => handleScroll('right')} disabled={!canScrollRight} aria-label="Next projects" className={arrowBtn}>
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </motion.div>

                {/* --- Type Filter Tabs --- */}
                {filters.length > 2 && (
                    <div className="flex overflow-x-auto sm:flex-wrap justify-start gap-2 mb-6 w-full pb-2 hide-scrollbar px-1">
                        {filters.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setActiveType(type)}
                                aria-pressed={activeType === type}
                                className={`relative shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeType === type
                                    ? 'text-white shadow-lg shadow-teal-500/30'
                                    : 'bg-gray-100/80 dark:bg-zinc-800/80 dark:text-gray-300 text-gray-700 hover:text-teal-600 dark:hover:text-teal-300 border border-gray-200/50 dark:border-zinc-700/50'
                                    }`}
                            >
                                {activeType === type && (
                                    <motion.div
                                        layoutId="projectTabIndicator"
                                        className="absolute inset-0 bg-teal-600 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    />
                                )}
                                <span className="relative z-10">{type}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* --- Carousel (swipe + arrows) --- */}
                <motion.div
                    key={activeType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 pt-2 pb-8 hide-scrollbar"
                    >
                        {filtered.map((project) => {
                            const demoBtn = demoButtonFor(project)
                            const TypeIcon = typeConfig[project.type]?.icon
                            const hasLinks = project.github || project.download || demoBtn

                            return (
                                <div
                                    key={project.id}
                                    className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group
                                    rounded-3xl overflow-hidden border-2 transition-all duration-300 dark:border-zinc-800/60
                                    border-gray-100 dark:bg-zinc-900/40 bg-white hover:-translate-y-1.5 hover:border-teal-500/50
                                    dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-teal-500/10 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-zinc-900">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Type badge */}
                                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10">
                                            {TypeIcon && <TypeIcon size={12} />}
                                            {project.type}
                                        </span>

                                        {/* Hover overlay button */}
                                        {demoBtn && (
                                            <button
                                                type="button"
                                                onClick={() => openDemo(project)}
                                                aria-label={`${demoBtn.text}: ${project.title}`}
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 cursor-pointer"
                                            >
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold shadow-lg shadow-black/30">
                                                    <demoBtn.Icon size={14} /> {demoBtn.text}
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 sm:p-6 flex flex-col justify-between grow">
                                        <div>
                                            <h3 className="text-lg font-bold mb-2 dark:text-white text-gray-900 group-hover:text-teal-500 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm leading-relaxed mb-4 dark:text-gray-400 text-gray-600 line-clamp-3">
                                                {project.desc}
                                            </p>
                                        </div>

                                        <div>
                                            {project.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-2">
                                                    {project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] font-medium px-2.5 py-0.5 rounded-full font-mono dark:bg-emerald-500/10 bg-teal-500/5 dark:text-emerald-300 text-teal-600"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {hasLinks && (
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t dark:border-zinc-800/80 border-gray-100">
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                            <FaGithub size={14} /> Code
                                                        </a>
                                                    )}
                                                    {demoBtn && (
                                                        <button type="button" onClick={() => openDemo(project)} className={linkBtn}>
                                                            <demoBtn.Icon size={13} /> {demoBtn.text}
                                                        </button>
                                                    )}
                                                    {project.download && (
                                                        <a href={project.download.url} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                                                            <Download size={14} /> {project.download.label}
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>

            {/* --- Demo Popup (Supports Live Sites, YouTube, MP4 Videos & Screenshot Galleries) --- */}
            <AnimatePresence>
                {activeProject && currentDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${activeProject.title} demo`}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30, filter: "blur(6px)" }}
                            animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ scale: 0.95, opacity: 0, y: 30, filter: "blur(6px)" }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl"
                        >
                            {/* Top bar */}
                            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-zinc-800 shrink-0">
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                                        {activeProject.title}
                                    </h3>
                                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate">
                                        {currentDemo.kind === 'site' ? currentDemo.src : currentDemo.label}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {currentDemo.kind === 'site' && (
                                        <div className="hidden sm:flex items-center rounded-full bg-gray-100 dark:bg-zinc-800 p-1">
                                            {[
                                                { key: 'desktop', Icon: Monitor, label: 'Desktop view' },
                                                { key: 'mobile', Icon: Smartphone, label: 'Mobile view' },
                                            ].map(({ key, Icon, label }) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => setDevice(key)}
                                                    aria-label={label}
                                                    aria-pressed={device === key}
                                                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${device === key
                                                        ? 'bg-teal-600 text-white'
                                                        : 'text-gray-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-emerald-400'
                                                        }`}
                                                >
                                                    <Icon size={16} />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {(currentDemo.kind === 'site' || currentDemo.kind === 'youtube') && (
                                        <a
                                            href={activeProject.demos[demoIndex].src}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-teal-600 dark:text-emerald-400 bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 transition-colors"
                                        >
                                            <span className="hidden sm:inline">Open in YouTube / Tab</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => setActiveProject(null)}
                                        aria-label="Close"
                                        className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-colors cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Demo tabs (demos එකකට වැඩි නම්) */}
                            {activeProject.demos.length > 1 && (
                                <div className="flex gap-2 px-4 py-2 border-b border-gray-200 dark:border-zinc-800 overflow-x-auto hide-scrollbar shrink-0">
                                    {activeProject.demos.map((d, i) => (
                                        <button
                                            key={d.label + i}
                                            type="button"
                                            onClick={() => switchDemo(i)}
                                            aria-pressed={demoIndex === i}
                                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${demoIndex === i
                                                ? 'bg-teal-600 text-white'
                                                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-emerald-400'
                                                }`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative grow min-h-0 bg-gray-100 dark:bg-zinc-950 flex justify-center overflow-hidden">

                                {currentDemo.kind === 'site' && (
                                    <>
                                        {!frameLoaded && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-500 dark:text-zinc-400 pointer-events-none">
                                                <Loader2 size={28} className="animate-spin text-teal-500" />
                                                <span className="text-sm">Loading live demo…</span>
                                            </div>
                                        )}
                                        <iframe
                                            key={`${activeProject.id}-${demoIndex}-${device}`}
                                            src={currentDemo.src}
                                            title={`${activeProject.title} live demo`}
                                            onLoad={() => setFrameLoaded(true)}
                                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            className={`h-full bg-white transition-all duration-300 ${device === 'mobile'
                                                ? 'w-[390px] max-w-full border-x border-gray-300 dark:border-zinc-700'
                                                : 'w-full'
                                                }`}
                                        />
                                    </>
                                )}

                                {currentDemo.kind === 'youtube' && (
                                    <iframe
                                        key={`${activeProject.id}-${demoIndex}`}
                                        src={currentDemo.src}
                                        title={`${activeProject.title} demo video`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                )}

                                {currentDemo.kind === 'video' && (
                                    <video
                                        key={`${activeProject.id}-${demoIndex}`}
                                        src={currentDemo.src}
                                        controls
                                        autoPlay
                                        playsInline
                                        className="max-w-full max-h-full"
                                    />
                                )}

                                {currentDemo.kind === 'gallery' && (
                                    <div className="w-full h-full flex flex-col">
                                        <div className="relative grow min-h-0 flex items-center justify-center p-3">
                                            <img
                                                key={slide}
                                                src={currentDemo.images[slide].src}
                                                alt={currentDemo.images[slide].caption || activeProject.title}
                                                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                                            />

                                            {currentDemo.images.length > 1 && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSlide(s => (s - 1 + currentDemo.images.length) % currentDemo.images.length)}
                                                        aria-label="Previous image"
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                                                    >
                                                        <ChevronLeft size={20} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSlide(s => (s + 1) % currentDemo.images.length)}
                                                        aria-label="Next image"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                                                    >
                                                        <ChevronRight size={20} />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {currentDemo.images[slide].caption && (
                                            <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-zinc-300 px-4 pb-2">
                                                {currentDemo.images[slide].caption}
                                                <span className="ml-2 text-gray-400 dark:text-zinc-500">
                                                    {slide + 1} / {currentDemo.images.length}
                                                </span>
                                            </p>
                                        )}

                                        {currentDemo.images.length > 1 && (
                                            <div className="flex gap-2 justify-center px-3 pb-3 overflow-x-auto hide-scrollbar shrink-0">
                                                {currentDemo.images.map((img, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => setSlide(i)}
                                                        aria-label={`Image ${i + 1}`}
                                                        className={`shrink-0 w-16 h-11 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${slide === i
                                                            ? 'border-teal-500 opacity-100'
                                                            : 'border-transparent opacity-50 hover:opacity-100'
                                                            }`}
                                                    >
                                                        <img src={img.src} alt="" className="w-full h-full object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {currentDemo.kind === 'site' && (
                                <div className="px-4 py-2 text-[11px] text-gray-500 dark:text-zinc-400 border-t border-gray-200 dark:border-zinc-800 shrink-0">
                                    Demo එක load වෙන්නේ නැත්නම් හෝ හිස්ව පේනවා නම්, උඩින් <span className="font-semibold">Open in YouTube / Tab</span> click කරන්න.
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx='true'>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    )
}

export default Project