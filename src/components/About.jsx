import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'

const About = () => {

    const socialIcons = [
        {
            icon: FaLinkedin,
            label: 'LinkdIn',
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
            color: 'hover:text-red-500 hover:border-blue-500/40'
        },
        {
            icon: FaFacebook,
            label: 'Facebook',
            color: 'hover:text-blue-500 hover:border-blue-500/40'
        },
        {
            icon: FaInstagram,
            label: 'Instagram',
            color: 'hover:text-pink-500 hover:border-blue-500/40'
        },
        {
            icon: FaTiktok,
            label: 'TikTok',
            color: 'hover:text-black dark:hover:text-white hover:border-black/40 dark:hover:border-gray-200/40'
        }
    ]

    return(
        <section >
            
        </section>
    )
}

export default About