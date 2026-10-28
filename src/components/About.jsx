import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaInstagram, FaTiktok, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa';
import about from '../assets/hero.png';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const About = () => {
    const [socials, setSocials] = useState({});

    // Fetch live social links from backend/MongoDB
    useEffect(() => {
        fetch(`${API_URL}/api/profile`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data?.socials) {
                    setSocials(data.data.socials);
                }
            })
            .catch(err => console.error('Error fetching socials in About:', err));
    }, []);

    // සමාජ මාධ්‍ය දත්ත ලැයිස්තුව (Backend එකෙන් ලැබෙන සජීවී URLs සහිතව)
    const socialLinks = [
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            color: 'hover:text-blue-600 hover:border-blue-600/40',
            url: socials.linkedin || 'https://www.linkedin.com/in/chamod-nirmal-79113528a'
        },
        {
            icon: FaGithub,
            label: 'GitHub',
            color: 'hover:text-gray-800 dark:hover:text-white hover:border-gray-800/40 dark:hover:border-gray-200/40',
            url: socials.github || 'https://github.com/chamodNirmalDev'
        },
        {
            icon: FaYoutube,
            label: 'YouTube',
            color: 'hover:text-red-500 hover:border-red-500/40',
            url: socials.youtube || 'https://www.youtube.com/@chamodnirmal3476'
        },
        {
            icon: FaFacebook,
            label: 'Facebook',
            color: 'hover:text-blue-500 hover:border-blue-500/40',
            url: socials.facebook || 'https://www.facebook.com/chamod.nirmal.792'
        },
        {
            icon: FaInstagram,
            label: 'Instagram',
            color: 'hover:text-pink-500 hover:border-pink-500/40',
            url: socials.instagram || 'https://www.instagram.com/chamod.nirmal.792/'
        },
        {
            icon: FaTiktok,
            label: 'TikTok',
            color: 'hover:text-black dark:hover:text-white hover:border-black/40 dark:hover:border-gray-200/40',
            url: socials.tiktok || 'https://www.tiktok.com/@chamod.nirmal90'
        }
    ];

    return (
        <section id='about' className='min-h-screen flex items-center py-20 pt-2 px-4 sm:px-6 overflow-hidden relative'>

            <div className='max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10'>

                {/* අකුරු පෙන්වන වම්පස තීරුව */}
                <div className='order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left' data-aos='fade-right'>

                    {/* "About Me" ලාංඡනය / Badge - Teal වර්ණයෙන් */}
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4'>
                        <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>
                        <span className='text-xs sm:text-sm font-semibold tracking-wider uppercase dark:text-emerald-300 text-teal-600'>
                            About Me
                        </span>
                    </div>

                    {/* ප්‍රධාන මාතෘකාව */}
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 dark:text-white text-gray-900 leading-tight'>
                        Turning Ideas Into
                        <span className='text-teal-600 dark:text-emerald-400 block'>
                            Digital Reality
                        </span>
                    </h2>

                    {/* යාවත්කාලීන කළ වෘත්තීය විස්තර ඡේදය */}
                    <p className='text-base lg:text-lg mb-8 leading-relaxed dark:text-gray-300 text-gray-700 max-w-xl'>
                        Hi, I'm Chamod Nirmal, a Freelance Full-Stack Developer based in Sri Lanka, currently pursuing my BSc
                        in Software Engineering at Birmingham City University. I specialize in building secure and scalable applications
                        using React.js, Node.js, and Java, turning complex ideas into elegant digital solutions.
                    </p>

                    {/* සමාජ මාධ්‍ය බොත්තම් පෙළගැස්ම */}
                    <div className='flex flex-wrap justify-center lg:justify-start gap-4 mb-8'>
                        {socialLinks.map((social, index) => {
                            const IconComponent = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    data-aos='zoom-in'
                                    data-aos-delay={index * 150}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
                                    border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50
                                    backdrop-blur-sm dark:text-gray-300 text-gray-700 transition-all duration-300
                                    hover:scale-110 hover:shadow-lg cursor-pointer ${social.color}`}>
                                    <IconComponent />
                                </a>
                            );
                        })}
                    </div>

                    {/* "Let's Talk" බොත්තම */}
                    <a href="#contacts" data-aos='fade-up' data-aos-delay='300'>
                        <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                                border-2 dark:border-emerald-500 border-teal-600 dark:text-white text-gray-800
                                hover:text-white dark:hover:text-white font-semibold
                                dark:hover:bg-emerald-500 hover:bg-teal-600 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)]
                                transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer'>
                            Let's Talk
                            <ArrowRight size={18} />
                        </button>
                    </a>
                </div>

                {/* පින්තූරය රඳවන ප්‍රධාන රාමුව */}
                <div className='relative order-1 lg:order-2 flex justify-center' data-aos='fade-left'>
                    <div className='relative w-full max-w-sm sm:max-w-md'>

                        {/* පින්තූරය පිටුපස ඇති ආලෝකය සහ හැඩය */}
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700
                            rounded-[40%_60%_60%/40%_60%_70%] filter blur-xl opacity-40 animate-pulse'>
                        </div>
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700
                            rounded-[40%_60%_60%/40%_60%_70%] transform rotate-3 scale-105'>
                        </div>

                        {/* ප්‍රධාන පින්තූරය */}
                        <img 
                            src={about} 
                            alt="About"
                            className='relative z-10 rounded-[40%_60%_60%/40%_60%_70%] shadow-2xl w-full
                            h-auto object-cover border-2 border-teal-500/30 backdrop-blur-sm'
                        />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default About;