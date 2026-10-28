import React, { useState, useEffect, useRef } from "react";
import CertificateImg from '../assets/certificates.png';
import computerSkillsImg from '../assets/certificates/computer-basic-skills.jpeg';
import englishDiplomaImg from '../assets/certificates/english-advanced-diploma.jpeg';
import gceEnglishImg from '../assets/certificates/gce-english-forum.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award, Calendar, ExternalLink, GraduationCap,
    ShieldCheck, Languages, CheckCircle2, Clock, Eye, X, Download, Loader2
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const categories = ['All', 'Education', 'Professional', 'Language'];

const categoryIcon = {
    Education: GraduationCap,
    Professional: ShieldCheck,
    Language: Languages,
};

// Fallback Data (Database එකේ දත්ත නැති විට පෙන්වීමට)
const fallbackCertificates = [
    {
        id: 1,
        title: 'BSc (Hons) Software Engineering (Top-up)',
        issuer: 'Birmingham City University',
        date: '2025 – Present',
        category: 'Education',
        status: 'In Progress',
        credentials: [],
    },
    {
        id: 2,
        title: 'Higher Diploma in Software Engineering',
        issuer: 'Java Institute for Advanced Technology',
        date: '2023 – 2025',
        category: 'Education',
        status: 'Completed',
        credentials: [],
    },
    {
        id: 3,
        title: 'AI/ML Engineer Programme (Stages 1–3)',
        issuer: 'SLIIT',
        date: 'Jul – Aug 2026',
        category: 'Professional',
        status: 'Completed',
        credentials: [
            { label: 'Stage 1', url: 'https://code.sliit.org/certificates/ckoslrfxxo' },
            { label: 'Stage 2', url: 'https://code.sliit.org/certificates/1zghcpuf4n' },
            { label: 'Stage 3', url: 'https://code.sliit.org/certificates/p8k6qvscep' },
        ],
    },
    {
        id: 4,
        title: 'Ethical Hacker',
        issuer: 'Cisco',
        date: 'Aug 2026',
        category: 'Professional',
        status: 'Completed',
        credentials: [
            { label: 'Verify', url: 'https://www.credly.com/badges/bdababc2-3824-4f70-8018-efcb365be839' },
        ],
    },
    {
        id: 5,
        title: 'Python Programming',
        issuer: 'University of Moratuwa',
        date: 'Jul 2026',
        category: 'Professional',
        status: 'Completed',
        credentialId: 'xfBCGXDdSD',
        credentials: [
            { label: 'Verify on UoM', url: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php' },
        ],
    },
    {
        id: 6,
        title: 'Python for Beginners',
        issuer: 'University of Moratuwa',
        date: 'Jul 2026',
        category: 'Professional',
        status: 'Completed',
        credentialId: 'm1WoPz8Rm1',
        credentials: [
            { label: 'Verify on UoM', url: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php' },
        ],
    },
    {
        id: 7,
        title: 'Basic Computer Skills Course (6 Months)',
        issuer: 'David Pieris Motor Company (DPMC) – Computer Training Centre',
        date: '',
        category: 'Professional',
        status: 'Completed',
        credentials: [
            {
                label: 'View Certificate',
                url: computerSkillsImg,
                type: 'image',
            },
        ],
    },
    {
        id: 8,
        title: 'Advanced Diploma in English — Distinction',
        issuer: 'British Trinity Academy of English',
        date: 'May 2024',
        category: 'Language',
        status: 'Completed',
        credentialId: 'DMDCN14052024',
        credentials: [
            {
                label: 'View Certificate',
                url: englishDiplomaImg,
                type: 'image',
            },
        ],
    },
    {
        id: 9,
        title: 'Forum of Practically Perfect English — Foundation Test (E Level I-A)',
        issuer: 'GCE International School × Book Bird',
        date: 'Aug – Sep 2014',
        category: 'Language',
        status: 'Completed',
        credentials: [
            {
                label: 'View Certificate',
                url: gceEnglishImg,
                type: 'image',
            },
        ],
    },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.25 }
    }
};

const leftColVariants = {
    hidden: { opacity: 0, x: -60, scale: 0.94, filter: "blur(8px)" },
    visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1, 
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } 
    }
};

const rightColVariants = {
    hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
    visible: { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 } 
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.15, delayChildren: 0.05 } 
    },
    exit: { 
        opacity: 0, 
        y: -15, 
        filter: "blur(6px)", 
        transition: { duration: 0.4, ease: "easeInOut" } 
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97, filter: "blur(4px)" },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    },
};

const linkClass =
    "inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-emerald-400 hover:underline cursor-pointer";

const Certificate = () => {
    const [certificates, setCertificates] = useState(fallbackCertificates);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [copiedId, setCopiedId] = useState(null);
    const [preview, setPreview] = useState(null);

    const listRef = useRef(null);

    // Fetch from MongoDB
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch(`${API_URL}/api/certificates`);
                const result = await res.json();
                if (result.success && result.data && result.data.length > 0) {
                    setCertificates(result.data);
                }
            } catch (err) {
                console.error("Using fallback certificates due to fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const filtered = activeCategory === 'All'
        ? certificates
        : certificates.filter(c => c.category === activeCategory);

    const completedCount = certificates.filter(c => c.status === 'Completed').length;
    const inProgressCount = certificates.length - completedCount;

    const stats = [
        { label: 'Total', value: certificates.length },
        { label: 'Completed', value: completedCount },
        { label: 'In Progress', value: inProgressCount },
    ];

    const handleCopy = (cert) => {
        navigator.clipboard?.writeText(cert.credentialId);
        setCopiedId(cert._id || cert.id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeCategory]);

    useEffect(() => {
        if (!preview) return;
        const onKey = (e) => { if (e.key === 'Escape') setPreview(null); };
        window.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [preview]);

    return (
        <section id="certificates" className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-32">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
                    className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500/15 rounded-full blur-[110px]"
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
                    className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px]"
                />
            </div>

            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="container mx-auto px-4 sm:px-8 lg:px-14 relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-20 max-w-6xl mx-auto">
                    
                    {/* Left: Image + Stats */}
                    <motion.div
                        variants={leftColVariants}
                        className="lg:w-5/12 w-full flex flex-col items-center lg:sticky lg:top-28"
                    >
                        <motion.div 
                            animate={{ y: [0, -8, 0] }} 
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700 rounded-3xl filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>

                            <div className="relative w-56 h-72 sm:w-72 sm:h-96">
                                <img
                                    src={CertificateImg}
                                    alt="Certificates and credentials"
                                    className="w-full h-full object-cover rounded-3xl relative z-10 border border-teal-500/30 shadow-xl transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 border-2 border-teal-500/20 rounded-3xl scale-105 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </motion.div>

                        <div className="mt-10 grid grid-cols-3 gap-3 w-full max-w-sm">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: 0.2 + idx * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.3 } }}
                                    className="text-center py-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-200 dark:border-zinc-800 hover:border-teal-500/40 transition-colors"
                                >
                                    <div className="text-2xl font-bold text-teal-600 dark:text-emerald-400">{stat.value}</div>
                                    <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-zinc-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        variants={rightColVariants}
                        className="lg:w-7/12 w-full flex flex-col items-center lg:items-start"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider">Achievements</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-3 font-bold dark:text-white text-gray-900 text-center lg:text-left">
                            Certifications <span className="text-teal-600 dark:text-emerald-400">& Education</span>
                        </h2>
                        <p className="mb-8 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl text-center lg:text-left leading-relaxed">
                            Academic qualifications and professional certifications synchronized live from MongoDB.
                        </p>

                        {/* Filter Tabs */}
                        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center lg:justify-start gap-2 mb-6 w-full pb-2 hide-scrollbar">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    aria-pressed={activeCategory === category}
                                    className={`relative shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeCategory === category
                                        ? 'text-white shadow-lg shadow-teal-500/30'
                                        : 'bg-gray-100/80 dark:bg-zinc-800/80 dark:text-gray-300 text-gray-700 hover:text-teal-600 dark:hover:text-teal-300 border border-gray-200/50 dark:border-zinc-700/50'
                                        }`}
                                >
                                    {activeCategory === category && (
                                        <motion.div
                                            layoutId="certTabIndicator"
                                            className="absolute inset-0 bg-teal-600 rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 130, damping: 22 }}
                                        />
                                    )}
                                    <span className="relative z-10">{category}</span>
                                </button>
                            ))}
                        </div>

                        {/* Scrollable Certificates List */}
                        <div 
                            ref={listRef}
                            className="w-full max-h-[330px] overflow-y-auto pr-2 cert-scroll"
                        >
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 size={28} className="animate-spin text-teal-500" />
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeCategory}
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-full flex flex-col gap-3 pb-2"
                                    >
                                        {filtered.map(cert => {
                                            const Icon = categoryIcon[cert.category] || Award;
                                            const isDone = cert.status === 'Completed';

                                            return (
                                                <motion.div
                                                    key={cert._id || cert.id}
                                                    variants={itemVariants}
                                                    whileHover={{ scale: 1.01, x: 4, transition: { duration: 0.3 } }}
                                                    className="group p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-200 dark:border-zinc-800 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                                                                <Icon size={20} />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                                                                    {cert.title}
                                                                </h3>
                                                                <span className="text-sm text-gray-600 dark:text-zinc-400 block mt-0.5">
                                                                    {cert.issuer}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 max-sm:border-t max-sm:border-gray-100/50 max-sm:dark:border-zinc-700/30 max-sm:pt-2">
                                                            <div className="flex flex-col items-start sm:items-end gap-1">
                                                                {cert.date && (
                                                                    <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-zinc-400">
                                                                        <Calendar size={13} />
                                                                        <span>{cert.date}</span>
                                                                    </div>
                                                                )}

                                                                {cert.credentialId && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleCopy(cert)}
                                                                        title="Click to copy credential ID"
                                                                        className="text-[11px] font-mono text-gray-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                                                                    >
                                                                        {copiedId === (cert._id || cert.id) ? 'Copied ✓' : `ID: ${cert.credentialId}`}
                                                                    </button>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-wrap items-center sm:justify-end gap-x-3 gap-y-1">
                                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isDone
                                                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                                                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                                                    }`}>
                                                                    {isDone ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                                    {cert.status}
                                                                </span>

                                                                {cert.credentials?.map(link =>
                                                                    link.type === 'image' ? (
                                                                        <button
                                                                            key={link.label}
                                                                            type="button"
                                                                            onClick={() => setPreview({ url: link.url, title: cert.title })}
                                                                            className={linkClass}
                                                                        >
                                                                            {link.label} <Eye size={12} />
                                                                        </button>
                                                                    ) : (
                                                                        <a
                                                                            key={link.label}
                                                                            href={link.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className={linkClass}
                                                                        >
                                                                            {link.label} <ExternalLink size={11} />
                                                                        </a>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Certificate Preview Popup */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        onClick={() => setPreview(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                        role="dialog"
                        aria-modal="true"
                        aria-label={preview.title}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 30, filter: "blur(6px)" }}
                            animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ scale: 0.92, opacity: 0, y: 30, filter: "blur(6px)" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full flex flex-col items-center bg-zinc-900/90 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl"
                        >
                            <button
                                type="button"
                                onClick={() => setPreview(null)}
                                aria-label="Close"
                                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 p-2 rounded-full bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 shadow-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <a 
                                href={preview.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                title="Click to open full size in new tab"
                                className="w-full flex justify-center cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-black/40"
                            >
                                <img
                                    src={preview.url}
                                    alt={preview.title}
                                    className="max-h-[70vh] w-auto max-w-full object-contain hover:scale-[1.02] transition-transform duration-500"
                                />
                            </a>

                            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
                                <p className="text-sm sm:text-base font-medium text-gray-200 text-center sm:text-left">
                                    {preview.title}
                                </p>

                                <div className="flex items-center gap-2 shrink-0">
                                    <a
                                        href={preview.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-zinc-700 transition-colors"
                                    >
                                        <span>Full Size</span>
                                        <ExternalLink size={13} />
                                    </a>

                                    <a
                                        href={preview.url}
                                        download={`${preview.title.replace(/\s+/g, '_')}_Certificate`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white shadow-sm shadow-teal-500/20 transition-colors"
                                    >
                                        <span>Download</span>
                                        <Download size={13} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx='true'>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                .cert-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(20, 184, 166, 0.5) transparent;
                }
                .cert-scroll::-webkit-scrollbar { width: 6px; }
                .cert-scroll::-webkit-scrollbar-track { background: transparent; }
                .cert-scroll::-webkit-scrollbar-thumb {
                    background-color: rgba(20, 184, 166, 0.5);
                    border-radius: 20px;
                }
                .cert-scroll:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(20, 184, 166, 1);
                }
            `}</style>
        </section>
    );
};

export default Certificate;