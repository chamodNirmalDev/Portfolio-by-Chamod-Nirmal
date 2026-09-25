import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {

    /*"Popup එක (Modal එක) දැනට පෙන්වනවාද? නැද්ද?" කියන එක මතක තියාගන්න සහ ඒක පාලනය කරන්න අවශ්‍ය ස්විච් එකක් (Switch) හදාගන්න එකයි.
        මෙහි වරහන් ඇතුළේ ඇති false යන්නෙන් කියන්නේ ආරම්භක අගයයි. වෙබ් පිටුව මුලින්ම ලෝඩ් වෙද්දී අර "Add New Project" ෆෝම් එක (Popup එක) තිරයේ පෙන්වන්න අවශ්‍ය නැහැනේ. ඒක හැංගිලා තියෙන්න ඕනේ. ඒ නිසා අපි මුලින්ම අගය 'වැරදියි' හෙවත් false කියලා දෙනවා.
        isModalOpen (දත්තය මතක තබා ගන්නා පෙට්ටිය): මේක තමයි අර false කියන අගය දාගෙන ඉන්න විචල්‍යය (Variable එක).මේකේ අගය false වෙලා තියෙනකම් අර Popup ෆෝම් එක හැංගිලා තියෙනවා.මේකේ අගය true වුණොත්, කේතයෙන් ස්වයංක්‍රීයවම අර Popup ෆෝම් එක තිරය මතුපිටින් පෙන්වනවා.
        setModalOpen (අගය වෙනස් කරන රිමෝට් එක): මේක තමයි අර isModalOpen කියන පෙට්ටියේ තියෙන අගය වෙනස් කරන්න React වලින් අපිට දෙන ෆන්ක්ෂන් එක (Function). හරියට ටීවී එකේ චැනල් මාරු කරන රිමෝට් එක වගේ. */
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='flex-1 p-6 overflow-y-auto relative'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Projects Management</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Manage your portfolio projects and case studies</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className='flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                        hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5'>
                    <FaPlus size={14} />
                    <span>Add New Projects</span>
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8'>

                <div className='relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl 
                    overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group'>
                    <div className='h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity'>
                        <div className='absolute inset-0 bg-linear-to-r from-teal-500/20 to-emerald-500/20 flex items-center justify-center'>
                            <span className='text-teal-700/50 dark:text-teal-300/50 font-bold tracking-widest uppercase'>
                                Project Iamge
                            </span>
                        </div>
                    </div>

                    <div className='p-5'>
                        <div className='flex justify-between items-start mb-2'>
                            <h3 className='text-lg font-bold text-gray-800 dark:text-white line-clamp-1'>E-commerce Web Apps</h3>
                            <span className='px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10
                            dark:text-emerald-400 rounded-full'>Active</span>
                        </div>
                        <p className='text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2'>
                            A full-stack e-commerce marketplace built with React, Spring Boot, and MySQL featuring a complete admin dashboard.
                        </p>
                        <div className='flex flex-wrap gap-2 mb-5'>
                            <span className='text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/10'>React.js</span>
                            <span className='text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/10'>Spring Boot</span>
                            <span className='text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/10'>My SQL</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3'>
                                <button className='text-gray-400 hover:bg-gray-800 dark:hover:text-white transition-colors' title='View Source'><FaGithub size={18} /></button>
                                <button className='text-gray-300 hover:text-teal-500 transition-colors' title='Live Preview'><FaExternalLinkAlt size={16} /></button>
                            </div>
                            <div className='flex gap-2 pt-4 border-t border-teal-500/10'>
                                <button className='p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors' title='Edit Project'><FaEdit size={16} /></button>
                                <button className='p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors' title='Delete Project'><FaTrash size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                            <span className="text-blue-700/50 dark:text-blue-300/50 font-bold tracking-widest uppercase">Project Image</span>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">Portfolio Website</h3>
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 rounded-full">Completed</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            Personal portfolio website with a custom CMS admin dashboard using modern web technologies.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                            <span className="text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/10">React</span>
                            <span className="text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/10">Tailwind</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-teal-500/10">
                            <div className="flex gap-3">
                                <button className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors" title="View Source"><FaGithub size={18} /></button>
                                <button className="text-gray-400 hover:text-teal-500 transition-colors" title="Live Preview"><FaExternalLinkAlt size={16} /></button>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit Project"><FaEdit size={16} /></button>
                                <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Project"><FaTrash size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
