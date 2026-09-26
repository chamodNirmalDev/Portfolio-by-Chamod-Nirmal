import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const fullText = "<Chamod/>";

    useEffect(() => {
        // 1. Code Typing Animation
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 150); // අකුරෙන් අකුර Type වෙන වේගය (මිලි තත්පර)

        // 2. Percentage Counter Animation (0 to 100)
        let currentCount = 0;
        const countInterval = setInterval(() => {
            currentCount += Math.floor(Math.random() * 10) + 1; // Random විදිහට අගය වැඩි වෙයි
            if (currentCount > 100) currentCount = 100;
            
            setCount(currentCount);

            if (currentCount === 100) {
                clearInterval(countInterval);
                
                // 100% වුණාට පස්සේ තත්පර 1ක් ඉඳලා Loading ඉවරයි කියලා App.jsx එකට කියනවා
                setTimeout(() => {
                    onLoadingComplete();
                }, 1000); 
            }
        }, 120); // ගණන් කරන වේගය

        return () => {
            clearInterval(typingInterval);
            clearInterval(countInterval);
        };
    }, [onLoadingComplete]);

    return (
        <motion.div 
            // 100% වුණාම මේ සම්පූර්ණ තිරයම උඩට Slide වෙලා යන්න දෙන Animation එක
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950 text-white font-mono"
        >
            {/* Background Glow Effect */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <div className='w-64 h-64 rounded-full bg-teal-500/10 blur-[100px]'/>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Typing Text */}
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wider text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-500">
                    {text}
                    <motion.span 
                        animate={{ opacity: [0, 1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block ml-1 w-1 h-8 md:h-12 bg-teal-400"
                    />
                </h1>

                {/* Loading Line & Percentage */}
                <div className="flex flex-col items-center w-48 mt-8">
                    <div className="flex justify-between w-full text-xs text-teal-500 mb-2 font-semibold">
                        <span>Loading...</span>
                        <span>{count}%</span>
                    </div>
                    {/* Progress Bar Background */}
                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        {/* Progress Bar Fill */}
                        <motion.div 
                            className="h-full bg-linear-to-r from-teal-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${count}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;