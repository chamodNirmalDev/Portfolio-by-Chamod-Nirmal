import React from 'react'
import hero from '../assets/hero.png'
const Hero = () => {

    return(
        <section id='home' className='min-h-screen flex items-center relative overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-12 lg:mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
                    <div className='lg:w-2/5 w-full flex justify-center' data-aos='fade-right'>
                        <div className='relative group'>
                            <div className='absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-700 rounded-full
                            filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500'/>
                                <div className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96'>
                                    <img src={hero} className='w-full h-full object-cover rounded-full
                                    relative z-10 transform group-hover:scale-105 transition-transform duration-500' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default Hero