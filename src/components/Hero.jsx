import React from 'react'
import hero from '../assets/hero.png'
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import CV from '../assets/cv.pdf'
import { DownloadIcon, Mail } from 'lucide-react'

const Hero = () => {
    const socialIcons = [
        { icon: FaLinkedin, alt: 'Linkdin', link: '#' },
        { icon: FaGithub, alt: 'Github', link: '#' },
        { icon: FaFacebook, alt: 'Facebook', link: '#' },
        { icon: FaYoutube, alt: 'Youtube', link: '#' },
        { icon: FaInstagram, alt: 'Instagram', link: '#' }
    ]

    return (
        // පහළින් ඇති Navbar එකට ඉඩ දීම සඳහා pb-28 (Padding Bottom) අලුතින් එකතු කර ඇත
        <section id='home' className='min-h-screen flex items-center relative overflow-hidden pb-28 lg:pb-20'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-12 lg:mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
                    
                    {/* වම් පස පින්තූර කොටස */}
                    <div className='lg:w-2/5 w-full flex justify-center' data-aos='fade-right'>
                        <div className='relative group'>
                            <div className='absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-full
                            filter blur-2xl opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500'/>
                            <div className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-4
                                border-white/5 shadow-2xl z-10'>
                                <img src={hero}
                                    alt='profile'
                                    className='w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500' />

                                <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-110
                                    group-hover:scale-120 transition-transform duration-500'></div>
                                <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-120
                                    group-hover:scale-140 transition-transform duration-500'></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* දකුණු පස අකුරු කොටස */}
                    <div className='lg:w-3/5 w-full flex flex-col items-center lg:items-start text-center lg:text-left'
                        data-aos='fade-left'>
                        
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5 '>
                            {/* රතු පාට තිත Teal වර්ණයට වෙනස් කර ඇත */}
                            <span className='w-2 h-2 rounded-full dark:bg-red-500 bg-red-800  animate-pulse'></span>
                            <span className='text-sm font-medium dark:text-teal-300 text-teal-800'>
                                Available for work
                            </span>
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 dark:text-white text-gray-800'>
                            Hello, I'm <span className='text-teal-700 dark:text-teal-400'>Chamod</span>
                        </h1>

                        <h2 className='text-xl sm:text-2xl font-mono mb-4 dark:text-emerald-500 text-emerald-700'>
                            <span className='text-teal-700 dark:text-teal-400'>&lt; </span>
                            Full Stack Developer
                            <span className='text-teal-700 dark:text-teal-400'> &gt;</span>
                        </h2>

                        <p className='mb-6 leading-relaxed max-w-md lg:max-w-lg dark:text-emerald-100/80 text-emerald-950'>
                            As a Full-Stack Software Engineer, I bridge the gap between design and robust engineering.
                             I specialize in developing modern web applications and mobile apps using React and Java 
                             ecosystems. I thrive on solving complex problems, writing clean code, and delivering custom
                             software solutions that help businesses and individuals achieve their digital goals.
                        </p>

                        <div className='flex gap-10 mb-7'>
                            {[
                                {number: '3+', label: "Years Experience"},
                                {number: '30+', label: "Projects Done"},
                                {number: '10+', label: "Happy Clients"}
                            ].map((stat,index) => (
                                <div key={index} className='text-center'>
                                    <div className='text-3xl font-bold dark:text-emerald-100 text-teal-900'>{stat.number}</div>
                                    <div className='text-base dark:text-emerald-100/70 text-teal-800'>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col sm:flex-row gap-10 w-full sm:w-auto'>
                            <a href={CV} download className='w-full sm:w-auto'>
                                {/* Shadow පන්තියේ අඩු වී තිබූ ']' වරහන එකතු කර ඇත */}
                                <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                                text-white font-semibold bg-linear-to-r from-teal-500 to-emerald-600 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] 
                                transition-all duration-300 transform hover:scale-105 whitespace-nowrap'>
                                    <DownloadIcon size={18}/> Download CV
                                </button>
                            </a>
                            <a href="#contact" className='w-full sm:w-auto'>
                                {/* Shadow පන්තියේ අඩු වී තිබූ ']' වරහන එකතු කර ඇත */}
                                <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                                border-2 dark:border-teal-500 border-teal-600 dark:text-emerald-100 text-teal-900 
                                font-semibold dark:hover:bg-emerald-600 hover:bg-teal-600 hover:text-white hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] 
                                transition-all duration-300 transform hover:scale-105 whitespace-nowrap'>
                                    <Mail size={18}/> Hire Me
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero