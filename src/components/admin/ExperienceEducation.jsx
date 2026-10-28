import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
    FaPlus, FaEdit, FaTrash, FaTimes, FaGraduationCap, 
    FaAward, FaCalendarAlt, FaSyncAlt, FaImage, FaExternalLinkAlt, FaUpload 
} from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const CATEGORIES = ['Education', 'Professional', 'Language'];

const initialForm = {
    title: '',
    issuer: '',
    startDate: '',
    endDate: '',
    category: 'Professional',
    status: 'Completed',
    credentialId: '',
    credentialType: 'image', // 'image' හෝ 'link'
    credentialLabel: 'View Certificate',
    credentialUrl: ''
};

const ExperienceEducation = () => {
    const [certificates, setCertificates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(initialForm);
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // 1. Fetch All Certificates & Degrees from MongoDB
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

    // File Chooser Handler (Base64 conversion)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Vercel serverless payload limit ගැටළු මඟහරවා ගැනීමට 1.5MB සීමාව
        if (file.size > 1.5 * 1024 * 1024) {
            alert('File size exceeds 1.5MB. Please choose a smaller image or use an external URL.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImagePreview(base64String);
            setFormData(prev => ({
                ...prev,
                credentialUrl: base64String
            }));
        };
        reader.readAsDataURL(file);
    };

    // Modal විවෘත කිරීම
    const openModal = (cert = null) => {
        if (cert) {
            setEditingId(cert._id);
            const firstCred = cert.credentials?.[0] || {};
            const credType = firstCred.type || (firstCred.url ? 'link' : 'image');
            const credUrl = firstCred.url || '';

            // පවතින "2023 – 2025" හෝ "Jul – Aug 2026" වැනි දිනයන් Start සහ End වලට වෙන් කර ගැනීම
            const dateParts = (cert.date || '').split(/–|-/).map(s => s.trim());
            const start = dateParts[0] || '';
            const end = dateParts[1] || '';

            setFormData({
                title: cert.title || '',
                issuer: cert.issuer || '',
                startDate: start,
                endDate: end,
                category: cert.category || 'Professional',
                status: cert.status || 'Completed',
                credentialId: cert.credentialId || '',
                credentialType: credType,
                credentialLabel: firstCred.label || (credType === 'image' ? 'View Certificate' : 'Verify'),
                credentialUrl: credUrl
            });
            setImagePreview(credType === 'image' && credUrl ? credUrl : null);
        } else {
            setEditingId(null);
            setFormData(initialForm);
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData(initialForm);
        setImagePreview(null);
    };

    // Save or Update Record
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!token) return alert('Session expired. Please log in again.');

        setIsSaving(true);

        // Start Date සහ End Date දෙකම තිබේ නම් "Start – End" ලෙස සකස් කිරීම
        const formattedDate = formData.startDate && formData.endDate
            ? `${formData.startDate} – ${formData.endDate}`
            : formData.startDate || formData.endDate || '';

        const payload = {
            title: formData.title.trim(),
            issuer: formData.issuer.trim(),
            date: formattedDate.trim(),
            category: formData.category,
            status: formData.status,
            credentialId: formData.credentialId.trim(),
            credentials: formData.credentialUrl.trim() ? [{
                label: formData.credentialLabel.trim() || (formData.credentialType === 'image' ? 'View Certificate' : 'Verify'),
                url: formData.credentialUrl.trim(),
                type: formData.credentialType
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

    // Delete Record
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
            
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Certifications & Education Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage degrees, online badges, and certificates with popup image previews.
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

            {/* List / Cards Section */}
            {isLoading ? (
                <div className="flex justify-center py-24">
                    <Loader2 size={32} className="animate-spin text-teal-500" />
                </div>
            ) : certificates.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    No certificates found in MongoDB. Click "Add New Record" to add your first entry.
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
                            <FaAward className="text-teal-500" /> Professional & Language Certifications
                        </h3>
                        {professionalList.length === 0 ? (
                            <p className="text-sm text-gray-400">No certifications added yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {professionalList.map((cert) => {
                                    const cred = cert.credentials?.[0];
                                    return (
                                        <div key={cert._id} className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-base font-bold text-gray-800 dark:text-white leading-snug">{cert.title}</h4>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button onClick={() => openModal(cert)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"><FaEdit size={14} /></button>
                                                    <button onClick={() => handleDelete(cert._id, cert.title)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"><FaTrash size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-2">{cert.issuer}</div>
                                            
                                            <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                                                <span className="flex items-center gap-1.5"><FaCalendarAlt /> {cert.date}</span>
                                                
                                                <div className="flex items-center gap-2">
                                                    {cred && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-teal-600 dark:text-emerald-400 font-mono">
                                                            {cred.type === 'image' ? <FaImage size={10} /> : <FaExternalLinkAlt size={9} />}
                                                            {cred.label}
                                                        </span>
                                                    )}
                                                    <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-500 border border-teal-500/20 font-semibold">{cert.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add / Edit Modal */}
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
                                    placeholder="e.g., Advanced Diploma in English or Ethical Hacker" 
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuer / Institute</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.issuer}
                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                    placeholder="e.g., British Trinity Academy or Cisco" 
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                />
                            </div>

                            {/* Category & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            </div>

                            {/* Start Date & End Date Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                    <input 
                                        type="text" 
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        placeholder="e.g., 2023 or May 2024" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        placeholder="e.g., 2025 or Present" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credential ID (Optional)</label>
                                <input 
                                    type="text" 
                                    value={formData.credentialId}
                                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                    placeholder="e.g., DMDCN14052024" 
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                />
                            </div>

                            {/* Credential Action Type Selection */}
                            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Certificate Action / Verification Type
                                </label>
                                
                                <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="credentialType" 
                                            value="image" 
                                            checked={formData.credentialType === 'image'}
                                            onChange={() => {
                                                setFormData({ ...formData, credentialType: 'image', credentialLabel: 'View Certificate' });
                                            }}
                                            className="text-teal-500"
                                        />
                                        <span>Upload / Image Preview (View Certificate)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="credentialType" 
                                            value="link" 
                                            checked={formData.credentialType === 'link'}
                                            onChange={() => {
                                                setFormData({ ...formData, credentialType: 'link', credentialLabel: 'Verify' });
                                                setImagePreview(null);
                                            }}
                                            className="text-teal-500"
                                        />
                                        <span>External Verification URL (Credly / Portal)</span>
                                    </label>
                                </div>

                                {formData.credentialType === 'image' ? (
                                    <div className="space-y-3 pt-2">
                                        {/* File Chooser Button */}
                                        <div>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                accept="image/*" 
                                                onChange={handleFileChange} 
                                                className="hidden" 
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 border-2 border-dashed border-teal-500/40 hover:border-teal-500 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 font-medium text-sm transition-colors cursor-pointer"
                                            >
                                                <FaUpload size={14} />
                                                <span>Choose Image from Computer (Max 1.5MB)</span>
                                            </button>
                                        </div>

                                        {/* Preview Thumbnail if selected */}
                                        {imagePreview && (
                                            <div className="flex items-center gap-3 p-2 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="w-14 h-14 object-cover rounded-lg border border-teal-500/30"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">Image Selected</p>
                                                    <p className="text-[11px] text-emerald-500 font-semibold">Ready to save</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview(null);
                                                        setFormData(prev => ({ ...prev, credentialUrl: '' }));
                                                    }}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        )}

                                        {/* Or enter Direct URL */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                Or Paste External Image URL:
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.credentialUrl.startsWith('data:') ? '' : formData.credentialUrl}
                                                onChange={(e) => {
                                                    const url = e.target.value;
                                                    setFormData({ ...formData, credentialUrl: url });
                                                    setImagePreview(url || null);
                                                }}
                                                placeholder="https://.../certificate.jpg"
                                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-white font-mono"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Button Label</label>
                                            <input 
                                                type="text" 
                                                value={formData.credentialLabel}
                                                onChange={(e) => setFormData({ ...formData, credentialLabel: e.target.value })}
                                                placeholder="Verify"
                                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-white"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Verification Link URL</label>
                                            <input 
                                                type="text" 
                                                value={formData.credentialUrl}
                                                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                                placeholder="https://www.credly.com/..."
                                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-white font-mono"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer text-sm">Cancel</button>
                                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 text-sm">
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