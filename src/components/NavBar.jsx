import React, { useState } from 'react'
import { FaCertificate, FaCode, FaEnvelope, FaHome, FaProjectDiagram, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { name: 'Home', link: '#home', icon: FaHome },
        { name: 'About', link: '#about', icon: FaUser },
        { name: 'Skills', link: '#skills', icon: FaCode },
        { name: 'Certificates', link: '#Certificates', icon: FaCertificate },
        { name: 'Projects', link: '#Projects', icon: FaProjectDiagram },
        { name: 'Contacts', link: '#Contacts', icon: FaEnvelope },
    ]
    return (
        <div className='fixed z-50 bottom-0 left-0 right-0 flex justify-center'>
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='relative w-[95%] max-w-4xl mb-4'
            >
                {/* මෙනුවේ පසුබිම: Light mode දී සුදු සහ ලා Teal මිශ්‍රිත වීදුරු පෙනුමක්ද, Dark mode දී තද අළු සහ තද Teal මිශ්‍රිත පෙනුමක්ද ලබාදෙයි */}
                {/* මෙනුවේ බෝඩරය: Light වලදී ලා Teal (teal-200) පාටින්ද, Dark වලදී තද Emerald (emerald-800) පාටින්ද දිස්වේ */}
                <div className='relative backdrop-blur-xl rounded-2xl shadow-2xl px-3 py-2 transition-colors duration-500 
                    bg-linear-to-r from-white/70 to-teal-50/70 border border-teal-200/50 
                    dark:from-gray-950/80 dark:to-teal-950/80 dark:border-emerald-800/30'>

                    <div className='absolute -top-5 right-3'>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}

                            // Toggle බොත්තම: Light වලදී සුදු පසුබිමක් සහ ලා Teal බෝඩරයක් ද, Dark වලදී තද අළු පසුබිමක් සහ තද Teal බෝඩරයක් ද යෙදේ
                            className='p-2 rounded-full transition-colors backdrop-blur-sm shadow-md
                                bg-white border border-teal-100
                                dark:bg-gray-900 dark:border-teal-900'>
                            {darkMode ? (
                                // Dark mode සක්‍රිය නම් ඉර (Sun) කහ පාටින් (yellow-400) පෙන්වයි
                                <Sun className='w-4 lg:w-5 h-4 lg:h-5 text-yellow-400' />
                            ) : (
                                // Light mode සක්‍රිය නම් හඳ (Moon) Teal පාටින් (teal-700) පෙන්වයි
                                <Moon className='w-4 lg:w-5 h-4 lg:h-5 text-teal-700' />
                            )}
                        </motion.button>
                    </div>
                    <div className='flex items-center justify-around gap-1'>
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.name
                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.link}
                                    onClick={() => setActiveTab(item.name)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className='flex flex-col items-center gap-0.5
                                            py-1.5 px-2 relative group flex-1'>
                                    {isActive && (
                                        <motion.div
                                            layoutId='activeTab'
                                            // සක්‍රිය පිටුව පෙන්වන ඉර: Light mode හිදී Teal පාටින් (teal-600) සහ Dark mode හිදී දීප්තිමත් Emerald පාටින් (emerald-400) පෙන්වයි
                                            className='absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full
                                                bg-teal-600 dark:bg-emerald-400'
                                            transition={{ duration: 0.3 }}
                                        >
                                        </motion.div>
                                    )}
                                    <Icon
                                        className={`w-5 h-6 transition-all
                                                duration-300 ${isActive
                                                    // පිටුව සක්‍රිය (Active) නම්: Light වලදී තද Teal (teal-700), Dark වලදී ලා Emerald (emerald-300) පාටින් අයිකනය පෙන්වයි
                                                ? 'text-teal-700 dark:text-emerald-300'
                                                    // පිටුව අක්‍රිය නම්: 40% ක් බොඳ වූ Teal/Emerald වර්ණයකින් පෙන්වන අතර, Hover කළ විට නැවතත් පැහැදිලි වර්ණයට හැරේ
                                                : 'text-teal-900/40 group-hover:text-teal-700 dark:text-emerald-100/40 dark:group-hover:text-emerald-300'
                                            }`} />

                                    <span className={`text-[10px] font-medium transition-all duration-300
                                                    ${isActive
                                                // පිටුව සක්‍රිය (Active) නම්: අකුරු සඳහා ද Light වලදී තද Teal, Dark වලදී ලා Emerald වර්ණය යෙදේ
                                            ? 'text-teal-700 dark:text-emerald-300'
                                                // පිටුව අක්‍රිය නම්: අකුරු ද 40% ක් බොඳ වී පෙන්වන අතර Hover කළ විට පැහැදිලි වේ
                                            : 'text-teal-900/40 group-hover:text-teal-700 dark:text-emerald-100/40 dark:group-hover:text-emerald-300'
                                        }`}>
                                        {item.name}
                                    </span>
                                </motion.a>
                            )
                        })}
                    </div>
                </div>

            </motion.nav>
        </div>
    )
}

export default Navbar;