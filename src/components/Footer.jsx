import React from 'react'
import {Link} from 'react-router-dom'
import { FaCog, FaGithub, FaHeart, FaLinkedin, FaLock, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            className='relative border-t bg-linear-to-br from-teal-400 to-white
            dark:bg-linear-to-br dark:from-emerald-950 dark:to-black py-6'>

            <div className='container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4'>

                <div>
                    <h3 className='text-xl text-teal-600 font-bold dark:text-emerald-400'>
                        Portfolio
                    </h3>
                    <p className='text-xs'>Software Engineer</p>
                </div>

                <div className='flex gap-4 items-center'>
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
                    
                    {/* Footer එකේ එකතු කළ කුඩා අගුල (Lock icon) නිර්මාණය කරන්නේ සහ එය ක්‍රියාත්මක කරන්නේ
                            <Link to="/admin">: මේක සාමාන්‍ය HTML වල තියෙන <a> (Anchor) ලින්ක් එකක් වගේමයි. හැබැයි තියෙන ප්‍රධානම විශේෂත්වය වෙන්නේ, මේක ක්ලික් කළාම වෙබ් අඩවිය ආයෙත් මුල ඉඳන් Load (Refresh) වෙන්නේ නැහැ. ඒ වෙනුවට කිසිම ප්‍රමාදයකින් තොරව ක්ෂණිකවම අපි App.jsx එකේ හදපු /admin කියන පාරට (Admin Login පිටුවට) ඔයාව අරගෙන යනවා
                             */}
                    <Link 
                        to='/admin/login' 
                        className='hover:text-teal-500 dark:hover:text-emerald-400 transition-colors'>
                        <FaCog size={20} />
                    </Link>
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