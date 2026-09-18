import React from 'react'
import { FaGithub, FaHeart, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer
            className='border-t bg-linear-to-br from-teal-400 to-white
            dark:bg-linear-to-br dark:from-emerald-950 dark:to-black py-6'>
            
            <div className='container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
                
                <div>
                    <h3 className='text-xl text-teal-600 font-bold dark:text-emerald-400'>
                        Portfolio
                    </h3>
                    <p className='text-xs'>Software Engineer</p>
                </div>

                <div className='flex gap-4'>
                    <a
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:text-teal-500 dark:hover:text-emerald-400 transition-colors'>
                        <FaGithub size={20} />
                    </a>
                    <a
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:text-teal-500 dark:hover:text-emerald-400 transition-colors'>
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:text-teal-500 dark:hover:text-emerald-400 transition-colors'>
                        <FaTwitter size={20} />
                    </a>
                </div>

                <p className='text-xs flex items-center gap-1'>
                    {currentYear} Made with <FaHeart className='text-red-500' /> by <span className='font-semibold text-teal-600 dark:text-emerald-400'>Chamod</span>
                </p>
            </div>
            
            <div className='h-24'></div>
        </footer>
    )
}

export default Footer