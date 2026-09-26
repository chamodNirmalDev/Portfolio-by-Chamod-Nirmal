import React, { useState } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaTimes, FaReply, FaCalendarAlt } from 'react-icons/fa';

const Messages = () => {
    // තෝරාගත් පණිවිඩය Modal එකේ පෙන්වීම සඳහා State එක
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Dummy Messages Data (පසුව මේවා Backend/Database එකෙන් ලබාගත හැක)
    const messagesList = [
        {
            id: 1,
            sender: "John Doe",
            email: "john.doe@example.com",
            subject: "Looking for a Freelance Developer",
            message: "Hi Chamod, I saw your portfolio and I'm really impressed with your React and Spring Boot skills. I have a 3-month freelance project for an e-commerce platform. Could we schedule a call to discuss the requirements and your availability?",
            date: "26 Sep 2026",
            time: "09:30 AM",
            isRead: false // අලුත් (නොකියවූ) පණිවිඩයක්
        },
        {
            id: 2,
            sender: "Sarah Smith",
            email: "sarah.smith@techcorp.com",
            subject: "Job Interview Invitation",
            message: "Dear Chamod, we are reviewing your application for the Full Stack Developer position at TechCorp. We would like to invite you to an online technical interview next Tuesday. Please let me know if this works for you.",
            date: "25 Sep 2026",
            time: "02:15 PM",
            isRead: true
        },
        {
            id: 3,
            sender: "Mike Johnson",
            email: "mike.j@startup.io",
            subject: "Question about your GitHub project",
            message: "Hello! I was looking at your open-source Hospital Management System on GitHub. I'm having a bit of trouble running the Spring Boot backend on my local machine. Could you point me to the correct application.properties configuration?",
            date: "23 Sep 2026",
            time: "11:45 AM",
            isRead: true
        }
    ];

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        Messages 
                        <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold px-2.5 py-1 rounded-full">
                            1 New
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Read and reply to messages from your portfolio visitors.</p>
                </div>
            </div>

            {/* Messages List Container */}
            <div className="space-y-4 pb-8">
                {messagesList.map((msg) => (
                    <div 
                        key={msg.id}
                        className={`relative backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 group hover:shadow-md cursor-pointer flex flex-col md:flex-row gap-5 items-start md:items-center
                            ${msg.isRead 
                                ? 'bg-white/20 dark:bg-black/10 border-gray-200 dark:border-gray-800 hover:border-teal-500/30' 
                                : 'bg-white/60 dark:bg-teal-900/10 border-teal-500/30 shadow-sm'
                            }
                        `}
                        onClick={() => setSelectedMessage(msg)}
                    >
                        {/* Status Icon */}
                        <div className="hidden md:flex items-center justify-center p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            {msg.isRead ? <FaEnvelopeOpen size={18} /> : <FaEnvelope size={18} className="text-teal-500" />}
                        </div>

                        {/* Message Preview */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1 gap-1 md:gap-4">
                                <h3 className={`text-lg ${msg.isRead ? 'font-medium text-gray-700 dark:text-gray-300' : 'font-bold text-gray-900 dark:text-white'}`}>
                                    {msg.sender}
                                </h3>
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                    <FaCalendarAlt /> {msg.date} • {msg.time}
                                </span>
                            </div>
                            <h4 className={`text-sm mb-2 ${msg.isRead ? 'text-gray-600 dark:text-gray-400' : 'font-semibold text-teal-600 dark:text-teal-400'}`}>
                                {msg.subject}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-1">
                                {msg.message}
                            </p>
                        </div>

                        {/* Actions (Delete button shows on hover) */}
                        <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                                onClick={(e) => { e.stopPropagation(); /* Prevents opening modal when clicking delete */ }}
                                className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" 
                                title="Delete Message">
                                <FaTrash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Read Message Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Message Details</h3>
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable if message is long) */}
                        <div className="p-6 overflow-y-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From:</p>
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">{selectedMessage.sender}</h4>
                                    <a href={`mailto:${selectedMessage.email}`} className="text-sm text-teal-600 dark:text-teal-400 hover:underline">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Received:</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{selectedMessage.date}</p>
                                    <p className="text-xs text-gray-500">{selectedMessage.time}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                                    Subject: {selectedMessage.subject}
                                </h4>
                                <div className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer (Reply & Close) */}
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl mt-auto">
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                Close
                            </button>
                            <a 
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md">
                                <FaReply size={14} /> Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;