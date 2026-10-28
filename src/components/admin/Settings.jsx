import React, { useState, useEffect, useRef } from 'react';
import { 
    FaUser, FaLock, FaGlobe, FaSave, FaCamera, FaFilePdf, 
    FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaEye, FaEyeSlash, 
    FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaTwitter 
} from 'react-icons/fa';
import { Loader2, CheckCircle2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'about', 'contact', 'social', 'security'
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const avatarInputRef = useRef(null);
    const cvInputRef = useRef(null);

    // Profile & Website Sections State
    const [formData, setFormData] = useState({
        fullName: 'Chamod Nirmal',
        jobTitle: 'Full Stack Developer',
        contactEmail: 'chamod@example.com',
        avatarUrl: '',
        cvUrl: '',
        // Hero
        heroTitlePrefix: "Hello, I'm",
        heroBio: '',
        yearsExperience: 3,
        projectsDone: 30,
        happyClients: 10,
        // About
        aboutTitle: 'Turning Ideas Into',
        aboutSubtitle: 'Digital Reality',
        aboutBio: '',
        // Contact
        whatsappNumber: '94711234567',
        locationText: 'Piliyandala, Sri Lanka',
        mapCoordinates: '6.769238,79.94509',
        // Socials
        socials: {
            linkedin: '',
            github: '',
            youtube: '',
            facebook: '',
            instagram: '',
            tiktok: '',
            twitter: ''
        }
    });

    // Security State
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/profile`);
                const result = await res.json();
                if (result.success && result.data) {
                    setFormData(prev => ({
                        ...prev,
                        ...result.data,
                        socials: { ...prev.socials, ...(result.data.socials || {}) }
                    }));
                }
            } catch (err) {
                console.error('Fetch settings error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // File Handlers (Avatar & CV)
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) return alert('Avatar must be under 2MB');
        const reader = new FileReader();
        reader.onloadend = () => setFormData(prev => ({ ...prev, avatarUrl: reader.result }));
        reader.readAsDataURL(file);
    };

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 4 * 1024 * 1024) return alert('CV file must be under 4MB');
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, cvUrl: reader.result }));
            alert('CV file uploaded and ready to save!');
        };
        reader.readAsDataURL(file);
    };

    // Save All Website Settings
    const handleSaveSettings = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return alert('Session expired. Please log in again.');

        setIsSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (result.success) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                alert(result.error || 'Failed to save settings');
            }
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    // Update Security Credentials
    const handleUpdateCredentials = async (e) => {
        e.preventDefault();
        if (securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
            return alert('New password and confirm password do not match!');
        }

        const token = localStorage.getItem('adminToken');
        if (!token) return alert('Session expired. Please log in again.');

        setIsSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/update-credentials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: securityData.currentPassword,
                    newUsername: securityData.newUsername,
                    newPassword: securityData.newPassword
                })
            });
            const result = await res.json();
            if (result.success) {
                alert('Credentials updated successfully!');
                setSecurityData({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
            } else {
                alert(result.error || 'Failed to update credentials');
            }
        } catch (err) {
            console.error('Update security error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-gray-500">
                <Loader2 size={36} className="animate-spin text-teal-500 mb-3" />
                <p className="text-sm">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Website & Account Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage contents for Hero, About, Contact sections, CV file, and Admin credentials.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 pb-8">
                {/* Navigation Tabs */}
                <div className="w-full lg:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
                    {[
                        { id: 'hero', label: 'Hero Section & CV', icon: FaUser },
                        { id: 'about', label: 'About Section', icon: FaGlobe },
                        { id: 'contact', label: 'Contact & Map Info', icon: FaEnvelope },
                        { id: 'social', label: 'Social Media Links', icon: FaGlobe },
                        { id: 'security', label: 'Security & Login', icon: FaLock },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer text-sm ${activeTab === tab.id ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <tab.icon size={16} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Container */}
                <div className="flex-1">
                    <div className="backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 lg:p-8 shadow-sm">

                        {/* 1. HERO SECTION & CV */}
                        {activeTab === 'hero' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">Hero Section Details</h3>

                                {/* Profile Picture & CV Upload Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40">
                                    {/* Avatar */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative group shrink-0">
                                            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-teal-500 overflow-hidden flex items-center justify-center">
                                                {formData.avatarUrl ? (
                                                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <FaUser size={32} className="text-gray-400" />
                                                )}
                                            </div>
                                            <input type="file" ref={avatarInputRef} accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                                            <button type="button" onClick={() => avatarInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors cursor-pointer">
                                                <FaCamera size={12} />
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800 dark:text-white">Profile Photo</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">JPG/PNG under 2MB</p>
                                        </div>
                                    </div>

                                    {/* CV Chooser */}
                                    <div className="flex flex-col justify-center">
                                        <label className="text-sm font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-1.5">
                                            <FaFilePdf className="text-red-500" /> Upload PDF CV
                                        </label>
                                        <input type="file" ref={cvInputRef} accept="application/pdf" onChange={handleCvUpload} className="hidden" />
                                        <button
                                            type="button"
                                            onClick={() => cvInputRef.current?.click()}
                                            className="px-4 py-2 rounded-xl border border-dashed border-teal-500/50 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <FaFilePdf />
                                            {formData.cvUrl ? 'Replace Uploaded CV (Ready)' : 'Choose PDF from Computer (Max 4MB)'}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title (Typing Animation)</label>
                                        <input type="text" value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Bio Paragraph</label>
                                        <textarea rows="3" value={formData.heroBio} onChange={(e) => setFormData({ ...formData, heroBio: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white leading-relaxed" />
                                    </div>
                                </div>

                                {/* Stats Counter */}
                                <div className="grid grid-cols-3 gap-3 pt-2">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Years Experience</label>
                                        <input type="number" value={formData.yearsExperience} onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Projects Done</label>
                                        <input type="number" value={formData.projectsDone} onChange={(e) => setFormData({ ...formData, projectsDone: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Happy Clients</label>
                                        <input type="number" value={formData.happyClients} onChange={(e) => setFormData({ ...formData, happyClients: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. ABOUT SECTION */}
                        {activeTab === 'about' && (
                            <div className="space-y-5">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">About Section Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Main Heading</label>
                                        <input type="text" value={formData.aboutTitle} onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Highlighted Subtitle (Teal)</label>
                                        <input type="text" value={formData.aboutSubtitle} onChange={(e) => setFormData({ ...formData, aboutSubtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">About Bio Paragraph</label>
                                        <textarea rows="4" value={formData.aboutBio} onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white leading-relaxed" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. CONTACT & MAP */}
                        {activeTab === 'contact' && (
                            <div className="space-y-5">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                            <FaWhatsapp className="text-emerald-500" /> WhatsApp Number (Country code without +)
                                        </label>
                                        <input type="text" value={formData.whatsappNumber} onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })} placeholder="94711234567" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                            <FaEnvelope className="text-teal-500" /> Contact Form Email Address
                                        </label>
                                        <input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-rose-500" /> Display Location
                                        </label>
                                        <input type="text" value={formData.locationText} onChange={(e) => setFormData({ ...formData, locationText: e.target.value })} placeholder="Piliyandala, Sri Lanka" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-rose-500" /> Google Map Coordinates (Lat,Lng)
                                        </label>
                                        <input type="text" value={formData.mapCoordinates} onChange={(e) => setFormData({ ...formData, mapCoordinates: e.target.value })} placeholder="6.769238,79.94509" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. SOCIAL MEDIA LINKS */}
                        {activeTab === 'social' && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">Social Media Links</h3>
                                {[
                                    { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-500' },
                                    { key: 'github', label: 'GitHub', icon: FaGithub, color: 'text-gray-400' },
                                    { key: 'youtube', label: 'YouTube', icon: FaYoutube, color: 'text-red-500' },
                                    { key: 'facebook', label: 'Facebook', icon: FaFacebook, color: 'text-blue-600' },
                                    { key: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'text-pink-500' },
                                    { key: 'tiktok', label: 'TikTok', icon: FaTiktok, color: 'text-gray-300' },
                                    { key: 'twitter', label: 'Twitter / X', icon: FaTwitter, color: 'text-sky-400' },
                                ].map(soc => (
                                    <div key={soc.key}>
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <soc.icon className={soc.color} /> {soc.label} URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.socials[soc.key] || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                socials: { ...formData.socials, [soc.key]: e.target.value }
                                            })}
                                            placeholder={`https://${soc.key}.com/...`}
                                            className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-mono dark:text-white"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SAVE BUTTON FOR CONTENT TABS */}
                        {activeTab !== 'security' && (
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSaveSettings}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : saveSuccess ? <CheckCircle2 size={16} /> : <FaSave size={16} />}
                                    <span>{saveSuccess ? 'Saved Live!' : 'Save Changes'}</span>
                                </button>
                            </div>
                        )}

                        {/* 5. SECURITY & LOGIN TAB */}
                        {activeTab === 'security' && (
                            <form onSubmit={handleUpdateCredentials} className="space-y-5">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">Admin Login Credentials</h3>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">New Username (Leave blank to keep current)</label>
                                    <input
                                        type="text"
                                        value={securityData.newUsername}
                                        onChange={(e) => setSecurityData({ ...securityData, newUsername: e.target.value })}
                                        placeholder="Enter new username"
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password (Required for any change)</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.current ? "text" : "password"}
                                            required
                                            value={securityData.currentPassword}
                                            onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                                            placeholder="Enter current password"
                                            className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white"
                                        />
                                        <button type="button" onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 cursor-pointer">
                                            {showPasswords.current ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">New Password (Min 6 chars)</label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.new ? "text" : "password"}
                                                value={securityData.newPassword}
                                                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                                                placeholder="Enter new password"
                                                className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white"
                                            />
                                            <button type="button" onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 cursor-pointer">
                                                {showPasswords.new ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.confirm ? "text" : "password"}
                                                value={securityData.confirmPassword}
                                                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                                placeholder="Confirm new password"
                                                className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm dark:text-white"
                                            />
                                            <button type="button" onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 cursor-pointer">
                                                {showPasswords.confirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                                    >
                                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <FaSave size={16} />}
                                        <span>Update Credentials</span>
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;