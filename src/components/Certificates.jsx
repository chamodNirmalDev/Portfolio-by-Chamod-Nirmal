import React from "react";
import CertificateImg from '../assets/certificates.png';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: 20 }, // දකුණේ සිට වමට මතු වීමට y වෙනුවට x යොදා ඇත
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4
        }
    }
};

const Certificate = () => {
    const certificates = [
        { id: 1, title: 'BSc (Hons) Top-up in Software Engineering', issuer: 'Birmingham City University', date: '2026', credentialUrl: '#' },
        { id: 2, title: 'Professional Diploma in Software Engineering', issuer: 'Java Institute for Advanced Technology', date: '2025', credentialUrl: '#' },
        { id: 3, title: 'Frontend Web Development (React & Tailwind)', issuer: 'HackerRank', date: '2025', credentialUrl: '#' },
        { id: 4, title: 'Full-Stack Development (Java & MySQL)', issuer: 'Coursera', date: '2024', credentialUrl: '#' },
        { id: 5, title: 'Ethical Hacking Essentials', issuer: 'Cisco Networking Academy', date: '2026', credentialUrl: '#' },
        { id: 6, title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025', credentialUrl: '#' },
        { id: 7, title: 'React Native Mobile App Development', issuer: 'Udemy', date: '2025', credentialUrl: '#' },
        { id: 8, title: 'Advanced Database Management', issuer: 'Oracle', date: '2024', credentialUrl: '#' },
    ];

    return (
        <section id="certificates" className="min-h-screen flex items-center relative overflow-hidden py-20">
            
            <div className="container mx-auto px-4 sm:px-8 lg:px-14">
                
                {/* 
                    වෙනස් කළ ස්ථානය:
                    max-w-6xl යොදා මුළු අන්තර්ගතයම තිරයේ මැදට ගෙන ඇත.
                    lg:gap-24 මගින් පින්තූරය සහ ලැයිස්තුව අතර පරතරය වැඩි කර ඇත.
                */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-6xl mx-auto">
                    
                    {/* --- Left Column & Image Wrapper --- */}
                    {/* lg:w-5/12 යොදා පින්තූරයේ කොටස මඳක් කුඩා කර ඇත */}
                    <div className="lg:w-5/12 w-full flex justify-center lg:justify-end" data-aos='fade-right'>
                        <div className="relative group">
                            
                            {/* Glowing Background Effect */}
                            <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700 rounded-full filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                            {/* Image Container */}
                            <div className="relative w-56 h-72 sm:w-80 sm:h-96 lg:w-80 lg:h-96">
                                <img
                                    src={CertificateImg}
                                    alt="Certificates"
                                    className="w-full h-full object-cover rounded-full relative z-10 transform group-hover:scale-105 transition-transform duration-500" 
                                />

                                {/* Decorative Animated Rings */}
                                <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500' />
                                <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-125 group-hover:scale-150 transition-transform duration-500' />
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Content & Scrollable Certificates List --- */}
                    {/* lg:w-7/12 යොදා ලැයිස්තුවට ඉඩ ලබා දී ඇත */}
                    <div className="lg:w-7/12 w-full flex flex-col items-center lg:items-start" data-aos='fade-left'>
                        
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                            <span className="text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider">Achievements</span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-8 font-bold dark:text-white text-gray-900 text-center lg:text-left">
                            My <span className="text-teal-600 dark:text-emerald-400">Certificates</span>
                        </h2>

                        {/* Scrollable Certificates List */}
                        <motion.div
                            variants={containerVariants}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ amount: 0.1 }}
                            className="w-full max-h-[420px] sm:max-h-[480px] overflow-y-auto pr-2 sm:pr-4 
                                       border-t border-b border-gray-200/50 dark:border-zinc-800/50 
                                       scrollbar-thin scrollbar-thumb-teal-600/50 scrollbar-track-transparent hover:scrollbar-thumb-teal-600 transition-colors"
                        >
                            {certificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    variants={itemVariants}
                                    className={`p-3 sm:p-4 flex flex-col justify-between group relative transition-colors duration-300 hover:bg-teal-500/5 dark:hover:bg-teal-500/10 
                                        ${index < certificates.length - 1 ? 'border-b' : ''} border-gray-200/50 dark:border-zinc-800/50`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        
                                        {/* Icon & Title Group */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                                <Award size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {cert.title}
                                                </h3>
                                                <span className="text-sm font-medium text-gray-600 dark:text-zinc-400 block mt-0.5">
                                                    {cert.issuer}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Date & Link Group */}
                                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1.5 shrink-0 max-sm:border-t max-sm:border-gray-100/50 max-sm:dark:border-zinc-700/30 max-sm:pt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-zinc-400">
                                                <Calendar size={13} />
                                                <span>{cert.date}</span>
                                            </div>

                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                                            >
                                                Verify <ExternalLink size={11} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar CSS */}
            <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: rgba(20, 184, 166, 0.5); /* Teal 500 with opacity */
                    border-radius: 20px;
                }
                .scrollbar-thin:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(20, 184, 166, 1);
                }
            `}</style>
            
        </section>
    );
};

export default Certificate;