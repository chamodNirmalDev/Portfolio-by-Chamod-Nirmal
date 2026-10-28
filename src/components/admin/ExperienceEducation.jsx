import React, { useState, useEffect, useCallback } from 'react';
import { 
    FaPlus, FaEdit, FaTrash, FaTimes, FaGraduationCap, 
    FaAward, FaCalendarAlt, FaBuilding, FaSyncAlt, FaExternalLinkAlt, FaLanguage 
} from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const CATEGORIES = ['Education', 'Professional', 'Language'];

const initialForm = {
    title: '',
    issuer: '',
    date: '',
    category: 'Professional',
    status: 'Completed',
    credentialId: '',
    credentialLabel: 'Verify',
    credentialUrl: ''
};

const ExperienceEducation = () => {
    const [certificates, setCertificates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(initialForm);
    const [isSaving, setIsSaving] = useState(false);

    // 1. Fetch All from /api/certificates
    const fetchCertificates = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/certificates`);
            const data = await res.json();
            if (data.success) {
                setCertificates(data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch certificates:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCertificates();
    }, [fetchCertificates]);

    // Open Add / Edit Modal
    const openModal = (cert = null) => {
        if (cert) {
            setEditingId(cert._id);
            const firstCred = cert.credentials?.[0] || {};
            setFormData({
                title: cert.title || '',
                issuer: cert.issuer || '',
                date: cert.date || '',
                category: cert.category || 'Professional',
                status: cert.status || 'Completed',
                credentialId: cert.credentialId || '',
                credentialLabel: firstCred.label || 'Verify',
                credentialUrl: firstCred.url || ''
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

    // Save or Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!token) return alert('Session expired. Please log in again.');

        setIsSaving(true);

        const payload = {
            title: formData.title.trim(),
            issuer: formData.issuer.trim(),
            date: formData.date.trim(),
            category: formData.category,
            status: formData.status,
            credentialId: formData.credentialId.trim(),
            credentials: formData.credentialUrl ? [{
                label: formData.credentialLabel.trim() || 'Verify',
                url: formData.credentialUrl.trim(),
                type: 'link'
            }] : []
        };

        try {
            const endpoint = editingId 
                ? `${API_URL}/api/admin/certificates/${editingId}`
                : `${API_URL}/api/admin/certificates`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            if (result.success) {
                closeModal();
                fetchCertificates();
            } else {
                alert(result.error || 'Failed to save record');
            }
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    // Delete
    const handleDelete = async (id, title) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
        const token = localStorage.getItem('adminToken');

        try {
            const res = await fetch(`${API_URL}/api/admin/certificates/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                setCertificates(prev => prev.filter(item => item._id !== id));
            } else {
                alert(result.error || 'Failed to delete record');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const educationList = certificates.filter(c => c.category === 'Education');
    const professionalList = certificates.filter(c => c.category === 'Professional' || c.category === 'Language');

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Certifications & Education Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Add, edit, or delete degrees and certifications shown on your live portfolio.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={fetchCertificates}
                        title="Refresh Records"
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
            ) : certificates.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    No certificates or education records found in MongoDB. Click "Add New Record" to add your first entry.
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                    
                    {/* Education Column */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-teal-500/20 pb-3">
                            <FaGraduationCap className="text-emerald-500" /> Academic Degrees & Diplomas
                        </h3>
                        {educationList.length === 0 ? (
                            <p className="text-sm text-gray-400">No education entries added yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {educationList.map((edu) => (
                                    <div key={edu._id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-base font-bold text-gray-800 dark:text-white leading-snug">{edu.title}</h4>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button onClick={() => openModal(edu)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"><FaEdit size={14} /></button>
                                                <button onClick={() => handleDelete(edu._id, edu.title)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"><FaTrash size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-2">{edu.issuer}</div>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5"><FaCalendarAlt /> {edu.date || 'Ongoing'}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">{edu.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Professional & Language Certifications Column */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-teal-500/20 pb-3">
                            <FaAward className="text-teal-500" /> Professional Certifications
                        </h3>
                        {professionalList.length === 0 ? (
                            <p className="text-sm text-gray-400">No certifications added yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {professionalList.map((cert) => (
                                    <div key={cert._id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-base font-bold text-gray-800 dark:text-white leading-snug">{cert.title}</h4>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button onClick={() => openModal(cert)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"><FaEdit size={14} /></button>
                                                <button onClick={() => handleDelete(cert._id, cert.title)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"><FaTrash size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-2">{cert.issuer}</div>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5"><FaCalendarAlt /> {cert.date}</span>
                                            <div className="flex items-center gap-2">
                                                {cert.credentialId && <span className="font-mono text-[11px] text-gray-400">ID: {cert.credentialId}</span>}
                                                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-500 border border-teal-500/20 font-semibold">{cert.category}</span>
                                            </div>
                                        </div>
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
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {editingId ? 'Edit Certificate / Degree' : 'Add New Certificate / Degree'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title / Degree Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., BSc (Hons) Software Engineering or Ethical Hacker" 
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuer / University</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.issuer}
                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                    placeholder="e.g., Birmingham City University or Cisco" 
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm"
                                    >
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <select 
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm"
                                    >
                                        <option value="Completed">Completed</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date / Period</label>
                                    <input 
                                        type="text" 
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        placeholder="e.g., Aug 2026" 
                                        className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credential ID (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={formData.credentialId}
                                        onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                        placeholder="e.g., xfBCGXDdSD" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verification / Certificate URL</label>
                                    <input 
                                        type="text" 
                                        value={formData.credentialUrl}
                                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                        placeholder="https://credly.com/..." 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
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