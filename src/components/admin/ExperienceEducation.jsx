import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaBuilding, FaUniversity, FaSyncAlt } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const initialForm = {
    type: 'experience',
    title: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: ''
};

const ExperienceEducation = () => {
    const [timeline, setTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(initialForm);
    const [isSaving, setIsSaving] = useState(false);

    const fetchTimeline = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/timeline`);
            const data = await res.json();
            if (data.success) {
                setTimeline(data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch timeline:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTimeline();
    }, [fetchTimeline]);

    const openModal = (record = null) => {
        if (record) {
            setEditingId(record._id);
            setFormData({
                type: record.type || 'experience',
                title: record.title || '',
                organization: record.organization || '',
                startDate: record.startDate || '',
                endDate: record.endDate || '',
                description: record.description || ''
            });
        } else {
            setEditingId(null);
            setFormData(initialForm);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData(initialForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!token) return alert('Session expired. Please log in again.');

        setIsSaving(true);
        try {
            const endpoint = editingId 
                ? `${API_URL}/api/admin/timeline/${editingId}`
                : `${API_URL}/api/admin/timeline`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                closeModal();
                fetchTimeline();
            } else {
                alert(result.error || 'Failed to save record');
            }
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!confirm(`Delete "${title}"?`)) return;
        const token = localStorage.getItem('adminToken');

        try {
            const res = await fetch(`${API_URL}/api/admin/timeline/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                setTimeline(prev => prev.filter(item => item._id !== id));
            } else {
                alert(result.error || 'Failed to delete record');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const experienceList = timeline.filter(item => item.type === 'experience');
    const educationList = timeline.filter(item => item.type === 'education');

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Experience & Education</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your professional journey and academic qualifications from MongoDB.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={fetchTimeline}
                        title="Refresh"
                        className="p-2.5 rounded-xl border border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors cursor-pointer"
                    >
                        <FaSyncAlt className={isLoading ? 'animate-spin' : ''} size={14} />
                    </button>

                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 cursor-pointer">
                        <FaPlus size={14} />
                        <span>Add New Record</span>
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-24">
                    <Loader2 size={32} className="animate-spin text-teal-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                    {/* Experience Column */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-teal-500/20 pb-3">
                            <FaBriefcase className="text-teal-500" /> Work Experience
                        </h3>
                        {experienceList.length === 0 ? (
                            <p className="text-sm text-gray-400">No experience records added.</p>
                        ) : (
                            <div className="space-y-6">
                                {experienceList.map((exp) => (
                                    <div key={exp._id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white">{exp.title}</h4>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button onClick={() => openModal(exp)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"><FaEdit size={14} /></button>
                                                <button onClick={() => handleDelete(exp._id, exp.title)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"><FaTrash size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm font-medium text-teal-600 dark:text-teal-400">
                                            <span className="flex items-center gap-1.5"><FaBuilding /> {exp.organization}</span>
                                            {exp.duration && (
                                                <>
                                                    <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>
                                                    <span className="flex items-center gap-1.5 text-gray-500"><FaCalendarAlt /> {exp.duration}</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Education Column */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-teal-500/20 pb-3">
                            <FaGraduationCap className="text-emerald-500" /> Education
                        </h3>
                        {educationList.length === 0 ? (
                            <p className="text-sm text-gray-400">No education records added.</p>
                        ) : (
                            <div className="space-y-6">
                                {educationList.map((edu) => (
                                    <div key={edu._id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white">{edu.title}</h4>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button onClick={() => openModal(edu)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"><FaEdit size={14} /></button>
                                                <button onClick={() => handleDelete(edu._id, edu.title)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"><FaTrash size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                            <span className="flex items-center gap-1.5"><FaUniversity /> {edu.organization}</span>
                                            {edu.duration && (
                                                <>
                                                    <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>
                                                    <span className="flex items-center gap-1.5 text-gray-500"><FaCalendarAlt /> {edu.duration}</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {editingId ? 'Edit Record' : 'Add New Record'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Record Type</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
                                            <input 
                                                type="radio" 
                                                name="type" 
                                                value="experience"
                                                checked={formData.type === 'experience'}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="text-teal-500 focus:ring-teal-500" 
                                            />
                                            <span>Work Experience</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
                                            <input 
                                                type="radio" 
                                                name="type" 
                                                value="education"
                                                checked={formData.type === 'education'}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="text-emerald-500 focus:ring-emerald-500" 
                                            />
                                            <span>Education</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title / Role / Degree</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Software Engineer or BSc in IT" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization / Institution</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        placeholder="e.g., Google or University of Colombo" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" 
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                        <input 
                                            type="text" 
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            placeholder="e.g., Jan 2022" 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                        <input 
                                            type="text" 
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            placeholder="e.g., Present or Dec 2024" 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <textarea 
                                        rows="3" 
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Briefly describe your responsibilities or achievements..." 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer">Cancel</button>
                                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50">
                                    {isSaving ? 'Saving...' : editingId ? 'Update Record' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceEducation;