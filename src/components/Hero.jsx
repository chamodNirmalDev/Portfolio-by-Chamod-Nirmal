import React from 'react'
import hero from '../assets/hero.png'
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
const Hero = () => {

    const socialIcons = [
        {icon: FaLinkedin, alt: 'Linkdin', link:'#'},
        {icon: FaGithub, alt: 'Github', link:'#'},
        {icon: FaFacebook, alt: 'Facebook', link:'#'},
        {icon: FaYoutube, alt: 'Youtube', link:'#'},
        {icon: FaInstagram, alt: 'Instagram', link:'#'}
    ]

    return(
        <section id='home' className='min-h-screen flex items-center relative overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-12 lg:mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
                    <div className='lg:w-2/5 w-full flex justify-center' data-aos='fade-right'>
                        <div className='relative group'>
                            <div className='absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-full
                            filter blur-2xl opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500'/>
                                <div className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-4
                                border-white/5 shadow-2xl z-10'>
                                    <img src={hero}
                                    alt='profile'
                                    className='w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default Hero