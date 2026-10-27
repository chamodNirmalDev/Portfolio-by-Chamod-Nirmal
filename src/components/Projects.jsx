import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronLeft, ChevronRight, ExternalLink, Play, X, Monitor, Smartphone,
    Loader2, Download, Images, Cpu, ShoppingCart, AppWindow, Globe,
    CheckCircle2, Clock, Zap, FolderOpen, Brain, Palette, Gamepad2, Layers
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const GAP = 24 // gap-6 = 24px

// Category (project වර්ගය) අනුව icon + color
const categoryConfig = {
    'Web App': { icon: Globe, badge: 'bg-teal-500/90' },
    'E-Commerce': { icon: ShoppingCart, badge: 'bg-sky-500/90' },
    'Desktop App': { icon: AppWindow, badge: 'bg-violet-500/90' },
    'Mobile App': { icon: Smartphone, badge: 'bg-pink-500/90' },
    'IoT': { icon: Cpu, badge: 'bg-orange-500/90' },
    'AI / ML': { icon: Brain, badge: 'bg-fuchsia-500/90' },
    'Designing': { icon: Palette, badge: 'bg-rose-500/90' },
    'Game': { icon: Gamepad2, badge: 'bg-indigo-500/90' },
    'Other': { icon: Layers, badge: 'bg-gray-500/90' }
}

// Status (project තත්ත්වය) අනුව icon + color
const statusConfig = {
    'Active': { icon: Zap, pill: 'bg-emerald-500/90' },
    'In Progress': { icon: Clock, pill: 'bg-amber-500/90' },
    'Completed': { icon: CheckCircle2, pill: 'bg-blue-500/90' }
}

const arrowBtn =
    'p-3 rounded-full border transition-all duration-300 border-gray-300 dark:border-zinc-700 ' +
    'bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md text-gray-800 dark:text-white ' +
    'enabled:hover:border-teal-500 dark:enabled:hover:border-emerald-500 ' +
    'enabled:hover:bg-teal-500 enabled:hover:text-white enabled:hover:shadow-lg enabled:hover:shadow-teal-500/30 ' +
    'disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'

const primaryBtn =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white ' +
    'bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 ' +
    'shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 cursor-pointer'

const ghostBtn =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ' +
    'border border-gray-200 dark:border-zinc-700 dark:text-gray-200 text-gray-700 ' +
    'hover:border-teal-500 hover:text-teal-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400 ' +
    'hover:bg-teal-500/5 transition-all duration-300 cursor-pointer'

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

// Loading skeleton card
const SkeletonCard = () => (
    <div className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800/60 dark:bg-zinc-900/40 bg-white animate-pulse">
        <div className="aspect-video bg-gray-200 dark:bg-zinc-800" />
        <div className="p-6 space-y-3">
            <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="flex gap-2 pt-2">
                <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-zinc-800" />
                <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-zinc-800" />
            </div>
        </div>
    </div>
)

const Project = () => {
    const scrollRef = useRef(null)
    const [projectsData, setProjectsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeType, setActiveType] = useState('All')
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0)

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
                const res = await fetch(`${API_URL}/api/projects`)
                const result = await res.json()
                if (result.success) {
                    const formatted = result.data.map((p, index) => ({
                        id: p._id || index,
                        type: p.category || 'Other',
                        status: p.status || 'Active',
                        image: p.imageUrl || '',
                        title: p.title,
                        desc: p.description,
                        tags: p.technologies || [],
                        github: p.githubLink || '',
                        download: p.download || null,
                        demos: p.liveLink ? [{ label: 'Live Demo', src: p.liveLink }] : []
                    }))
                    setProjectsData(formatted)
                }
            } catch (error) {
                console.error('Error fetching projects:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProjects()
    }, [])

    // Config එකේ පිළිවෙලට, data එකේ තියෙන categories විතරක් පෙන්නනවා
    const knownCategories = Object.keys(categoryConfig).filter(t => projectsData.some(p => p.type === t))
    const extraCategories = [...new Set(projectsData.map(p => p.type))].filter(t => !categoryConfig[t])
    const filters = ['All', ...knownCategories, ...extraCategories]

    const filtered = activeType === 'All'
        ? projectsData
        : projectsData.filter(p => p.type === activeType)

    const countFor = (type) =>
        type === 'All' ? projectsData.length : projectsData.filter(p => p.type === type).length

    const updateArrows = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)

        const card = el.firstElementChild
        const step = card ? card.offsetWidth + GAP : el.clientWidth
        setActiveIndex(Math.round(el.scrollLeft / step))
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

    const currentDemo = activeProject && activeProject.demos?.[demoIndex]
        ? resolveDemo(activeProject.demos[demoIndex])
        : null

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

    const scrollToIndex = (i) => {
        const el = scrollRef.current
        if (!el) return
        const card = el.firstElementChild
        const step = card ? card.offsetWidth + GAP : el.clientWidth
        el.scrollTo({ left: i * step, behavior: 'smooth' })
    }

    return (
        <section id="projects" className="min-h-screen flex items-center pt-20 pb-32 relative overflow-hidden">

            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-10 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-0 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-8 lg:px-14 relative z-10">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 gap-6"
                >
                    <div className="text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-xs sm:text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider">Portfolio</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900">
                            My <span className="bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Projects</span>
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                            Full-stack applications and digital solutions I have designed, built and shipped.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {!isLoading && filtered.length > 0 && (
                            <span className="hidden sm:block text-sm font-mono text-gray-500 dark:text-gray-400 mr-1">
                                {String(Math.min(activeIndex + 1, filtered.length)).padStart(2, '0')}
                                <span className="opacity-50"> / {String(filtered.length).padStart(2, '0')}</span>
                            </span>
                        )}
                        <button type="button" onClick={() => handleScroll('left')} disabled={!canScrollLeft} aria-label="Previous projects" className={arrowBtn}>
                            <ChevronLeft size={22} />
                        </button>
                        <button type="button" onClick={() => handleScroll('right')} disabled={!canScrollRight} aria-label="Next projects" className={arrowBtn}>
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </motion.div>

                {/* --- Filter Tabs --- */}
                {filters.length > 2 && (
                    <div className="flex overflow-x-auto sm:flex-wrap justify-start gap-2 mb-6 w-full pb-2 hide-scrollbar px-1">
                        {filters.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setActiveType(type)}
                                aria-pressed={activeType === type}
                                className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeType === type
                                    ? 'text-white shadow-lg shadow-teal-500/30'
                                    : 'bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md dark:text-gray-300 text-gray-700 hover:text-teal-600 dark:hover:text-teal-300 border border-gray-200/60 dark:border-zinc-700/60'
                                    }`}
                            >
                                {activeType === type && (
                                    <motion.div
                                        layoutId="projectTabIndicator"
                                        className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-600 rounded-full -z-10"
                                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    />
                                )}
                                <span className="relative z-10">{type}</span>
                                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeType === type ? 'bg-white/25' : 'bg-gray-200/80 dark:bg-zinc-700/80'}`}>
                                    {countFor(type)}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* --- Carousel --- */}
                {isLoading ? (
                    <div className="flex gap-6 overflow-hidden px-1 pt-2 pb-8">
                        <SkeletonCard /><SkeletonCard /><SkeletonCard />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-4">
                            <FolderOpen size={30} className="text-teal-500" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 font-semibold">No projects found</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New projects will show up here soon.</p>
                    </div>
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
                            {filtered.map((project, idx) => {
                                const demoBtn = demoButtonFor(project)
                                const cfg = categoryConfig[project.type]
                                const statusCfg = statusConfig[project.status]
                                const StatusIcon = statusCfg?.icon
                                const TypeIcon = cfg?.icon || Globe
                                const badgeColor = cfg?.badge || 'bg-black/60'
                                const hasLinks = project.github || project.download || demoBtn

                                return (
                                    <motion.article
                                        key={project.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.5, delay: Math.min(idx, 3) * 0.08 }}
                                        className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group
                                        rounded-3xl overflow-hidden border transition-all duration-300 dark:border-zinc-800/70
                                        border-gray-200/80 dark:bg-zinc-900/50 bg-white/80 backdrop-blur-md
                                        hover:-translate-y-2 hover:border-teal-500/50 dark:hover:border-emerald-500/50
                                        hover:shadow-2xl hover:shadow-teal-500/15 flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-zinc-900">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-teal-500/15 to-emerald-500/10">
                                                    <TypeIcon size={44} className="text-teal-500/50" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Index number */}
                                            <span className="absolute bottom-3 right-4 text-4xl font-black text-white/20 font-mono select-none">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>

                                            {/* Type badge */}
                                            <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white backdrop-blur-md shadow-md ${badgeColor}`}>
                                                <TypeIcon size={12} />
                                                {project.type}
                                            </span>

                                            {/* Status pill */}
                                            {statusCfg && (
                                                <span className={`absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white backdrop-blur-md shadow-md ${statusCfg.pill}`}>
                                                    <StatusIcon size={11} />
                                                    {project.status}
                                                </span>
                                            )}

                                            {/* Hover overlay button */}
                                            {demoBtn && (
                                                <button
                                                    type="button"
                                                    onClick={() => openDemo(project)}
                                                    aria-label={`${demoBtn.text}: ${project.title}`}
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 cursor-pointer"
                                                >
                                                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 text-gray-900 text-sm font-semibold shadow-xl translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                                        <demoBtn.Icon size={14} className="text-teal-600" /> {demoBtn.text}
                                                    </span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Body */}
                                        <div className="p-5 sm:p-6 flex flex-col justify-between grow">
                                            <div>
                                                <h3 className="text-lg font-bold mb-2 dark:text-white text-gray-900 group-hover:text-teal-500 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm leading-relaxed mb-4 dark:text-gray-400 text-gray-600 line-clamp-3">
                                                    {project.desc}
                                                </p>
                                            </div>

                                            <div>
                                                {project.tags?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {project.tags.slice(0, 5).map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-[10px] font-medium px-2.5 py-1 rounded-full font-mono border border-teal-500/15 dark:bg-emerald-500/10 bg-teal-500/5 dark:text-emerald-300 text-teal-700"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {project.tags.length > 5 && (
                                                            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full font-mono bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400">
                                                                +{project.tags.length - 5}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {hasLinks && (
                                                    <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t dark:border-zinc-800/80 border-gray-100">
                                                        {demoBtn && (
                                                            <button type="button" onClick={() => openDemo(project)} className={primaryBtn}>
                                                                <demoBtn.Icon size={14} /> {demoBtn.text}
                                                            </button>
                                                        )}
                                                        {project.github && (
                                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                                                                <FaGithub size={14} /> Code
                                                            </a>
                                                        )}
                                                        {project.download && (
                                                            <a href={project.download} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                                                                <Download size={14} /> Download
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                )
                            })}
                        </div>

                        {/* Pagination dots */}
                        {filtered.length > 1 && (
                            <div className="flex justify-center gap-2 mt-2">
                                {filtered.map((p, i) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => scrollToIndex(i)}
                                        aria-label={`Go to project ${i + 1}`}
                                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                                            ? 'w-8 bg-linear-to-r from-teal-500 to-emerald-500'
                                            : 'w-2 bg-gray-300 dark:bg-zinc-700 hover:bg-teal-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
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
                        className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl"
                        >
                            {/* Browser-style top bar */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-zinc-800 shrink-0 bg-gray-50 dark:bg-zinc-900">
                                <div className="hidden sm:flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-red-400" />
                                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                                        {activeProject.title}
                                    </h3>
                                    {currentDemo.src && (
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate font-mono">{currentDemo.src}</p>
                                    )}
                                </div>

                                {/* Device toggle (website demos only) */}
                                {currentDemo.kind === 'site' && (
                                    <div className="hidden sm:flex items-center p-1 rounded-lg bg-gray-200/70 dark:bg-zinc-800">
                                        <button
                                            type="button"
                                            onClick={() => setDevice('desktop')}
                                            aria-label="Desktop view"
                                            className={`p-1.5 rounded-md transition-colors cursor-pointer ${device === 'desktop' ? 'bg-white dark:bg-zinc-700 text-teal-600 shadow-sm' : 'text-gray-500'}`}
                                        >
                                            <Monitor size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDevice('mobile')}
                                            aria-label="Mobile view"
                                            className={`p-1.5 rounded-md transition-colors cursor-pointer ${device === 'mobile' ? 'bg-white dark:bg-zinc-700 text-teal-600 shadow-sm' : 'text-gray-500'}`}
                                        >
                                            <Smartphone size={16} />
                                        </button>
                                    </div>
                                )}

                                {currentDemo.kind === 'site' && (
                                    <a
                                        href={currentDemo.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Open in new tab"
                                        title="Open in new tab"
                                        className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-teal-500 hover:text-white transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setActiveProject(null)}
                                    aria-label="Close"
                                    className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="relative grow min-h-0 bg-gray-100 dark:bg-zinc-950 flex justify-center overflow-hidden">
                                {/* Loader */}
                                {(currentDemo.kind === 'site' || currentDemo.kind === 'youtube') && !frameLoaded && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
                                        <Loader2 size={32} className="animate-spin text-teal-500" />
                                        <span className="text-sm">Loading preview...</span>
                                        {currentDemo.kind === 'site' && (
                                            <a
                                                href={currentDemo.src}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-teal-600 dark:text-emerald-400 hover:underline"
                                            >
                                                Not loading? Open in a new tab
                                            </a>
                                        )}
                                    </div>
                                )}

                                {currentDemo.kind === 'site' && (
                                    <iframe
                                        src={currentDemo.src}
                                        title={activeProject.title}
                                        onLoad={() => setFrameLoaded(true)}
                                        className={`h-full bg-white transition-all duration-300 ${device === 'mobile'
                                            ? 'w-95 max-w-full border-x border-gray-300 dark:border-zinc-700 shadow-2xl'
                                            : 'w-full'}`}
                                    />
                                )}

                                {currentDemo.kind === 'youtube' && (
                                    <iframe
                                        src={currentDemo.src}
                                        title={activeProject.title}
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                        onLoad={() => setFrameLoaded(true)}
                                        className="w-full h-full"
                                    />
                                )}

                                {currentDemo.kind === 'video' && (
                                    <video src={currentDemo.src} controls autoPlay className="w-full h-full bg-black" />
                                )}

                                {currentDemo.kind === 'gallery' && (
                                    <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                                        <img
                                            src={currentDemo.images[slide]}
                                            alt={`${activeProject.title} screenshot ${slide + 1}`}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                        {currentDemo.images.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => setSlide(s => (s - 1 + currentDemo.images.length) % currentDemo.images.length)}
                                                    aria-label="Previous screenshot"
                                                    className="absolute left-3 p-2.5 rounded-full bg-black/50 text-white hover:bg-teal-600 transition-colors cursor-pointer"
                                                >
                                                    <ChevronLeft size={22} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSlide(s => (s + 1) % currentDemo.images.length)}
                                                    aria-label="Next screenshot"
                                                    className="absolute right-3 p-2.5 rounded-full bg-black/50 text-white hover:bg-teal-600 transition-colors cursor-pointer"
                                                >
                                                    <ChevronRight size={22} />
                                                </button>
                                                <span className="absolute bottom-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-mono">
                                                    {slide + 1} / {currentDemo.images.length}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Multiple demos tabs */}
                            {activeProject.demos.length > 1 && (
                                <div className="flex gap-2 px-4 py-3 border-t border-gray-200 dark:border-zinc-800 shrink-0 overflow-x-auto hide-scrollbar">
                                    {activeProject.demos.map((d, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => switchDemo(i)}
                                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${i === demoIndex
                                                ? 'bg-teal-600 text-white'
                                                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:text-teal-600'}`}
                                        >
                                            {d.label || `Demo ${i + 1}`}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    )
}

export default Project