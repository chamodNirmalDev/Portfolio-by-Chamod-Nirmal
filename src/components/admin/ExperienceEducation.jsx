import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaBuilding, FaUniversity } from 'react-icons/fa';

const ExperienceEducation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dummy Experience Data
    const experienceList = [
        {
            id: 1,
            title: "Full Stack Developer",
            organization: "Tech Solutions Inc.",
            duration: "2024 - Present",
            description: "Developing scalable web applications using React and Spring Boot. Managing database architecture and deploying microservices."
        },
        {
            id: 2,
            title: "Frontend Developer Intern",
            organization: "Creative Web Agency",
            duration: "2023 - 2024",
            description: "Assisted in building responsive user interfaces using HTML, CSS, JavaScript, and React. Collaborated with UI/UX designers."
        }
    ];

    // Dummy Education Data
    const educationList = [
        {
            id: 1,
            title: "BSc (Hons) in Software Engineering",
            organization: "University of Technology",
            duration: "2021 - 2025",
            description: "Focusing on software architecture, full-stack development, and database management systems. Current GPA: 3.8"
        },
        {
            id: 2,
            title: "Advanced Diploma in IT",
            organization: "National IT Institute",
            duration: "2019 - 2021",
            description: "Completed comprehensive coursework in programming fundamentals, networking, and web development."
        }
    ];

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Experience & Education</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your professional journey and academic qualifications.</p>
                </div>
                
                {/* Add New Record Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5">
                    <FaPlus size={14} />
                    <span>Add New Record</span>
                </button>
            </div>

            {/* Main Content Grid (Two Columns on Large Screens) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                
                {/* Column 1: Experience */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-teal-500/20 pb-3">
                        <FaBriefcase className="text-teal-500" /> Work Experience
                    </h3>
                    
                    <div className="space-y-6">
                        {experienceList.map((exp) => (
                            <div key={exp.id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">{exp.title}</h4>
                                    
                                    {/* Actions */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><FaEdit size={14} /></button>
                                        <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><FaTrash size={14} /></button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm font-medium text-teal-600 dark:text-teal-400">
                                    <span className="flex items-center gap-1.5"><FaBuilding /> {exp.organization}</span>
                                    <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>
                                    <span className="flex items-center gap-1.5 text-gray-500"><FaCalendarAlt /> {exp.duration}</span>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Education */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-teal-500/20 pb-3">
                        <FaGraduationCap className="text-emerald-500" /> Education
                    </h3>
                    
                    <div className="space-y-6">
                        {educationList.map((edu) => (
                            <div key={edu.id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">{edu.title}</h4>
                                    
                                    {/* Actions */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><FaEdit size={14} /></button>
                                        <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><FaTrash size={14} /></button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    <span className="flex items-center gap-1.5"><FaUniversity /> {edu.organization}</span>
                                    <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>
                                    <span className="flex items-center gap-1.5 text-gray-500"><FaCalendarAlt /> {edu.duration}</span>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {edu.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Add New Record Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Record</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <div className="p-6 space-y-5">
                            
                            {/* Record Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Record Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
                                        <input type="radio" name="recordType" defaultChecked className="text-teal-500 focus:ring-teal-500" />
                                        <span>Work Experience</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
                                        <input type="radio" name="recordType" className="text-emerald-500 focus:ring-emerald-500" />
                                        <span>Education</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title / Role / Degree</label>
                                <input type="text" placeholder="e.g., Software Engineer or BSc in IT" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization / Institution</label>
                                <input type="text" placeholder="e.g., Google or University of Colombo" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                    <input type="text" placeholder="e.g., Jan 2022" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                    <input type="text" placeholder="e.g., Present or Dec 2024" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea rows="3" placeholder="Briefly describe your responsibilities or achievements..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white"></textarea>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                Cancel
                            </button>
                            <button className="px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md">
                                Save Record
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceEducation;