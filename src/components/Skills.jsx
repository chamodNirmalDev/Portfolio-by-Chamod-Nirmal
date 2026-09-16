import React from 'react'

const Skills = () => {

    /* දත්ත ගබඩාව */ 
const skills = [
    { name: 'Java', percentage: 90, color: '#f89820' },          // Java Orange
    { name: 'Python', percentage: 85, color: '#3776AB' },        // Python Blue
    { name: 'HTML', percentage: 95, color: '#E34F26' },          // HTML Red/Orange
    { name: 'PHP', percentage: 80, color: '#777BB4' },           // PHP Purple
    { name: 'React JS', percentage: 90, color: '#61DAFB' },      // React Light Blue
    { name: 'Node JS', percentage: 85, color: '#339933' },       // Node Green
    { name: 'Bootstrap', percentage: 85, color: '#7952B3' },     // Bootstrap Purple
    { name: 'Tailwind CSS', percentage: 95, color: '#06B6D4' },  // Tailwind Teal
    { name: 'MySQL', percentage: 85, color: '#4479A1' },         // MySQL Blue
    { name: 'MongoDB', percentage: 80, color: '#47A248' },       // MongoDB Green
    { name: 'JavaScript', percentage: 90, color: '#F7DF1E' },    // JS Yellow
    { name: 'React Native', percentage: 85, color: '#61DAFB' },  // React Native Blue
    { name: 'Arduino', percentage: 75, color: '#00979D' }        // Arduino Teal
]

    return (
        /* ප්‍රධාන රාමුව සහ පසුබිම් ආලෝකය (Teal වර්ණයට වෙනස් කර ඇත) 
           Navbar එකෙන් වැසීම වැළැක්වීමට pt-20 pb-32 යොදා ඇත */ 
        <section id='skills' className='min-h-screen flex items-center pt-20 pb-32 lg:pb-40 px-4 sm:px-6 relative overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 right-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl'></div>
            </div>

            <div className='max-w-6xl mx-auto w-full relative z-10'>
                <div className='text-center mb-16' data-aos='fade-up'>

                    {/* මාතෘකා ලාංඡනය (Teal වර්ණයට වෙනස් කර ඇත) */}
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10
                    border border-teal-500/30 mb-5'>
                        <span className='w-2 h-2 rounded-full bg-teal-500 animate-pulse'></span>
                        <span className='text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider'>
                            Expertise
                        </span>
                    </div>

                    {/* ප්‍රධාන මාතෘකාව (Teal සහ Emerald වර්ණයට වෙනස් කර ඇත) */}
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900'>
                        My <span className='text-teal-600 dark:text-emerald-400'>
                            Skills
                        </span>
                    </h2>
                    
                    {/* හැඳින්වීමේ ඡේදය */}
                    <p className='mt-4 text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed'>
                        Here is a quick overview of my technical expertise and the core technologies I use to build robust and scalable digital solutions.
                    </p>
                </div>

                {/* කුසලතා පෙළගැස්ම සහ ගණනය කිරීම් */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
                    {skills.map((skill, index) => {
                        const radius = 60
                        const circumference = 2 * Math.PI * radius
                        const offset = circumference - (skill.percentage / 100) * circumference
                        const size = 150
                        
                        return (
                            <div
                                key={index}
                                className='flex flex-col items-center group'
                                data-aos='fade-up'
                                data-aos-delay={index * 100}>
                                
                                <div 
                                    className='relative'
                                    style={{width: size, height: size}}>
                                    
                                    {/* ප්‍රස්ථාරය ඇඳීම (SVG Circles) */}
                                    <svg 
                                        className='transform -rotate-90'
                                        width={size}
                                        height={size}>
                                        <circle
                                            cx={size/2}
                                            cy={size/2}
                                            r={radius}
                                            fill='none'
                                            stroke='#e5e7eb'
                                            strokeWidth='10'
                                            className='dark:stroke-gray-700 transition-colors duration-300'>
                                        </circle>
                                        
                                        <circle
                                            cx={size/2}
                                            cy={size/2}
                                            r={radius}
                                            fill='none'
                                            stroke={skill.color}
                                            strokeWidth='10'
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap='round'
                                            className='transition-all duration-1000 ease-out drop-shadow-md group-hover:drop-shadow-xl'
                                            style={{transition: 'stroke-dashoffset 1.5s ease-in-out'}}>
                                        </circle>
                                    </svg>

                                    {/* ප්‍රතිශතය පෙන්වීම */}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='text-center transition-transform duration-300 group-hover:scale-110'>
                                            <span className='text-3xl font-bold dark:text-white text-gray-900'>
                                                {skill.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* තාක්ෂණයේ නම */}
                                <h3 className='mt-4 text-base font-semibold text-center dark:text-gray-200 text-gray-900 transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-emerald-400'>
                                    {skill.name}
                                </h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Skills