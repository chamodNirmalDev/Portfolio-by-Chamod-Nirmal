import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    ChevronLeft, ChevronRight, ExternalLink, Play, X, Monitor, Smartphone, 
    Loader2, Download, Images, Cpu, ShoppingCart, AppWindow, Globe 
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const typeConfig = {
    'E-Commerce': { icon: ShoppingCart },
    'Desktop App': { icon: AppWindow },
    'IoT': { icon: Cpu },
    'Web': { icon: Globe },
    'Active': { icon: Globe },
    'Completed': { icon: Globe }
}

const GAP = 24 // gap-6 = 24px

const arrowBtn =
    "p-3 rounded-full border-2 transition-all duration-300 border-gray-300 dark:border-zinc-600 " +
    "text-gray-800 dark:text-white enabled:hover:border-teal-500 dark:enabled:hover:border-emerald-500 " +
    "enabled:hover:bg-teal-500/10 dark:enabled:hover:bg-emerald-500/10 " +
    "disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"

const linkBtn =
    "inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 " +
    "dark:text-gray-400 text-gray-600 dark:hover:text-teal-400 hover:text-teal-600 cursor-pointer"

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
    const [projectsData, setProjectsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeType, setActiveType] = useState('All')
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    // Demo popup state
    const [activeProject, setActiveProject] = useState(null)
    const [demoIndex, setDemoIndex] = useState(0)
    const [device, setDevice] = useState('desktop')
    const [frameLoaded, setFrameLoaded] = useState(false)
    const [slide, setSlide] = useState(0)

    // Fetch Projects from MongoDB Backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/api/projects`);
                const result = await res.json();
                if (result.success) {
                    // DB එකේ fields සමඟ Frontend එකට ගැලපෙන ලෙස map කරගැනීම
                    const formatted = result.data.map((p, index) => ({
                        id: p._id || index,
                        type: p.status || 'Active',
                        image: p.imageUrl || '',
                        title: p.title,
                        desc: p.description,
                        tags: p.technologies || [],
                        github: p.githubLink || '',
                        download: p.download || null,
                        demos: p.liveLink ? [{ label: 'Live Demo', src: p.liveLink }] : []
                    }));
                    setProjectsData(formatted);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filters = ['All', ...Object.keys(typeConfig).filter(t => projectsData.some(p => p.type === t))]

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
    }, [updateArrows, projectsData])

    useEffect(() => {
        scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
        updateArrows()
    }, [activeType, updateArrows])

    const currentDemo = activeProject && activeProject.demos?.[demoIndex] ? resolveDemo(activeProject.demos[demoIndex]) : null

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
                            Full-stack applications and digital solutions synced live from MongoDB database.
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

                {/* --- Carousel --- */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={36} className="animate-spin text-teal-500" />
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-12">No projects found.</p>
                ) : (
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
                                const TypeIcon = typeConfig[project.type]?.icon || Globe
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
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                                                    Project Image
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Type badge */}
                                            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10">
                                                <TypeIcon size={12} />
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
                                                        {project.tags.map((tag, i) => (
                                                            <span
                                                                key={i}
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
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* --- Demo Popup Modal --- */}
            <AnimatePresence>
                {activeProject && currentDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl"
                        >
                            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-zinc-800 shrink-0">
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                                    {activeProject.title}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setActiveProject(null)}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="relative grow min-h-0 bg-gray-100 dark:bg-zinc-950 flex justify-center overflow-hidden">
                                {currentDemo.kind === 'site' && (
                                    <iframe
                                        src={currentDemo.src}
                                        title={activeProject.title}
                                        className="w-full h-full bg-white"
                                    />
                                )}
                                {currentDemo.kind === 'youtube' && (
                                    <iframe
                                        src={currentDemo.src}
                                        title={activeProject.title}
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
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

export default Project;