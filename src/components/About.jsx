import { ArrowRight } from 'lucide-react'
import React from 'react'
import { FaGithub, FaInstagram, FaTiktok, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa'
import about from '../assets/hero.png'

const About = () => {

    /* සමාජ මාධ්‍ය දත්ත ලැයිස්තුව (Brand Colors සහිතව) */ 
    const socialLinks = [
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            color: 'hover:text-blue-600 hover:border-blue-600/40'
        },
        {
            icon: FaGithub,
            label: 'GitHub',
            color: 'hover:text-gray-800 dark:hover:text-white hover:border-gray-800/40 dark:hover:border-gray-200/40'
        },
        {
            icon: FaYoutube,
            label: 'YouTube',
            color: 'hover:text-red-500 hover:border-red-500/40'
        },
        {
            icon: FaFacebook,
            label: 'Facebook',
            color: 'hover:text-blue-500 hover:border-blue-500/40'
        },
        {
            icon: FaInstagram,
            label: 'Instagram',
            color: 'hover:text-pink-500 hover:border-pink-500/40'
        },
        {
            icon: FaTiktok,
            label: 'TikTok',
            color: 'hover:text-black dark:hover:text-white hover:border-black/40 dark:hover:border-gray-200/40'
        }
    ]

    return (
        <section id='about' className='min-h-screen flex items-center py-20 px-4 sm:px-6 overflow-hidden relative'>

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
                        I am a dedicated Software Engineering student and a passionate freelance full-stack developer based in Sri Lanka. My expertise spans across React.js, Java, and modern web technologies, allowing me to build everything from dynamic web platforms to scalable applications. Whether it's crafting intuitive user interfaces or designing secure backend architectures, I am committed to delivering high-quality, user-centric solutions.
                    </p>

                    {/* සමාජ මාධ්‍ය බොත්තම් පෙළගැස්ම */}
                    <div className='flex flex-wrap justify-center lg:justify-start gap-4 mb-8'>
                        {socialLinks.map((social, index) => {
                            const IconComponent = social.icon
                            return (
                                <a
                                    key={index}
                                    href='#'
                                    aria-label={social.label}
                                    data-aos='zoom-in'
                                    data-aos-delay={index * 150} // අයිකන් මතු වීමේ වේගය තරමක් අඩු කර ඇත (ලස්සනට පෙනීමට)
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
                                    border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50
                                    backdrop-blur-sm dark:text-gray-300 text-gray-700 transition-all duration-300
                                    hover:scale-110 hover:shadow-lg ${social.color}`}>
                                    <IconComponent />
                                </a>
                            )
                        })}
                    </div>

                    {/* "Let's Talk" බොත්තම - Teal වර්ණයෙන් */}
                    <a href="#contact" data-aos='fade-up' data-aos-delay='300'>
                        <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                                border-2 dark:border-emerald-500 border-teal-600 dark:text-white text-gray-800
                                hover:text-white dark:hover:text-white font-semibold
                                dark:hover:bg-emerald-500 hover:bg-teal-600 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)]
                                transition-all duration-300 transform hover:scale-105 whitespace-nowrap'>
                            Let's Talk
                            <ArrowRight size={18} />
                        </button>
                    </a>
                </div>

                {/* පින්තූරය රඳවන ප්‍රධාන රාමුව */}
                <div className='relative order-1 lg:order-2 flex justify-center' data-aos='fade-left'>
                    <div className='relative w-full max-w-sm sm:max-w-md'>

                        {/* පින්තූරය පිටුපස ඇති ආලෝකය සහ හැඩය - Teal වර්ණයෙන් */}
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700
                            rounded-[40%_60%_60%/40%_60%_70%] filter blur-xl opacity-40 animate-pulse'>
                        </div>
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700
                            rounded-[40%_60%_60%/40%_60%_70%] transform rotate-3 scale-105'>
                        </div>

                        {/* ප්‍රධාන පින්තූරය */}
                        <img src={about} alt="About"
                            className='relative z-10 rounded-[40%_60%_60%/40%_60%_70%] shadow-2xl w-full
                            h-auto object-cover border-2 border-teal-500/30 backdrop-blur-sm'/>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About