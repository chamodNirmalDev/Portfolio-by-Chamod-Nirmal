import React, { useState, useEffect, useCallback } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaTimes, FaReply, FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Messages = () => {
    const [messagesList, setMessagesList] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // 1. Fetch Messages from MongoDB
    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/api/admin/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.success) {
                setMessagesList(result.data || []);
                setUnreadCount(result.unreadCount || 0);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // 2. Select & Mark as Read
    const handleSelectMessage = async (msg) => {
        setSelectedMessage(msg);

        if (!msg.isRead) {
            const token = localStorage.getItem('adminToken');
            try {
                const res = await fetch(`${API_URL}/api/admin/messages/${msg._id}/read`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await res.json();
                if (result.success) {
                    setMessagesList(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
                    setUnreadCount(result.unreadCount);
                }
            } catch (err) {
                console.error('Failed to mark read:', err);
            }
        }
    };

    // 3. Delete Message
    const handleDeleteMessage = async (id, name) => {
        if (!confirm(`Are you sure you want to delete message from ${name}?`)) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/api/admin/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            if (result.success) {
                setMessagesList(prev => prev.filter(m => m._id !== id));
                setUnreadCount(result.unreadCount);
                if (selectedMessage?._id === id) setSelectedMessage(null);
            } else {
                alert(result.error || 'Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        Messages 
                        {unreadCount > 0 && (
                            <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                                {unreadCount} New
                            </span>
                        )}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Read and reply to messages from your portfolio visitors.</p>
                </div>

                <button
                    type="button"
                    onClick={fetchMessages}
                    title="Refresh Messages"
                    className="p-2.5 rounded-xl border border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors cursor-pointer"
                >
                    <FaSyncAlt className={isLoading ? 'animate-spin' : ''} size={14} />
                </button>
            </div>

            {/* Messages List Container */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500 dark:text-gray-400">
                    <Loader2 size={30} className="animate-spin text-teal-500" />
                    <span className="text-sm">Loading messages...</span>
                </div>
            ) : messagesList.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    No messages received yet.
                </div>
            ) : (
                <div className="space-y-4 pb-8">
                    {messagesList.map((msg) => {
                        const dateObj = new Date(msg.createdAt || Date.now());
                        const dateFormatted = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                        const timeFormatted = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                        return (
                            <div 
                                key={msg._id}
                                className={`relative backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 group hover:shadow-md cursor-pointer flex flex-col md:flex-row gap-5 items-start md:items-center
                                    ${msg.isRead 
                                        ? 'bg-white/20 dark:bg-black/10 border-gray-200 dark:border-gray-800 hover:border-teal-500/30' 
                                        : 'bg-white/60 dark:bg-teal-900/10 border-teal-500/30 shadow-sm'
                                    }
                                `}
                                onClick={() => handleSelectMessage(msg)}
                            >
                                {/* Status Icon */}
                                <div className="hidden md:flex items-center justify-center p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    {msg.isRead ? <FaEnvelopeOpen size={18} /> : <FaEnvelope size={18} className="text-teal-500" />}
                                </div>

                                {/* Message Preview */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1 gap-1 md:gap-4">
                                        <h3 className={`text-lg ${msg.isRead ? 'font-medium text-gray-700 dark:text-gray-300' : 'font-bold text-gray-900 dark:text-white'}`}>
                                            {msg.user_name}
                                        </h3>
                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                            <FaCalendarAlt /> {dateFormatted} • {timeFormatted}
                                        </span>
                                    </div>
                                    <p className="text-xs text-teal-600 dark:text-teal-400 mb-2 font-mono">
                                        {msg.user_email}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                        {msg.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button 
                                        onClick={(e) => { 
                                            e.stopPropagation();
                                            handleDeleteMessage(msg._id, msg.user_name);
                                        }}
                                        className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer" 
                                        title="Delete Message">
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Read Message Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Message Details</h3>
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From:</p>
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">{selectedMessage.user_name}</h4>
                                    <a href={`mailto:${selectedMessage.user_email}`} className="text-sm text-teal-600 dark:text-teal-400 hover:underline">
                                        {selectedMessage.user_email}
                                    </a>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Received:</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {new Date(selectedMessage.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(selectedMessage.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Message Content</h4>
                                <div className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-sm md:text-base p-4 bg-gray-50 dark:bg-gray-950/40 rounded-xl border border-gray-100 dark:border-gray-800">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl mt-auto">
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer">
                                Close
                            </button>
                            <a 
                                href={`mailto:${selectedMessage.user_email}?subject=Re: Portfolio Inquiry`}
                                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer">
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