import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaInstagram, FaTiktok, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const iconMap = {
    linkedin: { icon: FaLinkedin, color: 'hover:text-blue-600', label: 'LinkedIn' },
    github: { icon: FaGithub, color: 'hover:text-gray-800 dark:hover:text-white', label: 'GitHub' },
    youtube: { icon: FaYoutube, color: 'hover:text-red-500', label: 'YouTube' },
    facebook: { icon: FaFacebook, color: 'hover:text-blue-500', label: 'Facebook' },
    instagram: { icon: FaInstagram, color: 'hover:text-pink-500', label: 'Instagram' },
    tiktok: { icon: FaTiktok, color: 'hover:text-black dark:hover:text-white', label: 'TikTok' }
};

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/profile`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setAboutData(data.data);
                }
            })
            .catch(err => console.error('Error fetching about data:', err));
    }, []);

    if (!aboutData) return null; if (!aboutData) {
        return (
            <section id='about' className='min-h-[50vh] flex items-center justify-center relative overflow-hidden'>
                <div className='w-8 h-8 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin'></div>
            </section>
        );
    }

    // Database එකේ සැබවින්ම link එකක් ඇති social media පමණක් පෙන්වයි
    const activeSocialLinks = Object.entries(aboutData.socials || {})
        .filter(([key, url]) => url && url.trim() !== '' && iconMap[key])
        .map(([key, url]) => ({
            ...iconMap[key],
            url
        }));

    return (
        <section id='about' className='min-h-screen flex items-center py-20 pt-2 px-4 sm:px-6 overflow-hidden relative'>
            <div className='max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10'>

                {/* වම්පස අකුරු කොටස */}
                <div className='order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left' data-aos='fade-right'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4'>
                        <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>
                        <span className='text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-emerald-300'>About Me</span>
                    </div>

                    {(aboutData.aboutTitle || aboutData.aboutSubtitle) && (
                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 dark:text-white text-gray-900 leading-tight'>
                            {aboutData.aboutTitle}{' '}
                            {aboutData.aboutSubtitle && (
                                <span className='text-teal-600 dark:text-emerald-400 block'>{aboutData.aboutSubtitle}</span>
                            )}
                        </h2>
                    )}

                    {aboutData.aboutBio && (
                        <p className='text-base lg:text-lg mb-8 leading-relaxed dark:text-gray-300 text-gray-700 max-w-xl'>
                            {aboutData.aboutBio}
                        </p>
                    )}

                    {/* Database එකේ ලින්ක්ස් තිබේ නම් පමණක් පෙන්වන Social Media Icons */}
                    {activeSocialLinks.length > 0 && (
                        <div className='flex flex-wrap justify-center lg:justify-start gap-4 mb-8'>
                            {activeSocialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm dark:text-gray-300 text-gray-700 transition-all hover:scale-110 cursor-pointer ${social.color}`}
                                    >
                                        <IconComponent />
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    <a href="#contacts">
                        <button className='inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-teal-600 dark:border-emerald-500 text-gray-800 dark:text-white font-semibold hover:bg-teal-600 dark:hover:bg-emerald-500 hover:text-white transition-all cursor-pointer'>
                            Let's Talk <ArrowRight size={18} />
                        </button>
                    </a>
                </div>

                {/* දකුණුපස පින්තූර රාමුව */}
                <div className='relative order-1 lg:order-2 flex justify-center items-center w-full' data-aos='fade-left'>
                    <div className='relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[430px] max-w-full flex items-center justify-center'>
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700 rounded-[40%_60%_60%/40%_60%_70%] filter blur-xl opacity-40 animate-pulse'></div>
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700 rounded-[40%_60%_60%/40%_60%_70%] transform rotate-3 scale-105'></div>

                        <div className='relative z-10 w-full h-full rounded-[40%_60%_60%/40%_60%_70%] overflow-hidden border-2 border-teal-500/40 shadow-2xl bg-gray-900 flex items-center justify-center'>
                            {aboutData.avatarUrl ? (
                                <img
                                    src={aboutData.avatarUrl}
                                    alt="About Profile"
                                    className='w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700'
                                />
                            ) : null}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;