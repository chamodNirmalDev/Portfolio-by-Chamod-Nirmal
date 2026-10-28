import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaLock, FaGlobe, FaSave, FaCamera, FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaCheckCircle } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef(null);

    // Profile & Socials State
    const [profileData, setProfileData] = useState({
        fullName: '',
        jobTitle: '',
        contactEmail: '',
        bio: '',
        avatarUrl: '',
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

    // Password Change State
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // 1. Fetch Profile Data on Load
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/profile`);
                const result = await res.json();
                if (result.success && result.data) {
                    setProfileData({
                        fullName: result.data.fullName || '',
                        jobTitle: result.data.jobTitle || '',
                        contactEmail: result.data.contactEmail || '',
                        bio: result.data.bio || '',
                        avatarUrl: result.data.avatarUrl || '',
                        socials: {
                            linkedin: result.data.socials?.linkedin || '',
                            github: result.data.socials?.github || '',
                            youtube: result.data.socials?.youtube || '',
                            facebook: result.data.socials?.facebook || '',
                            instagram: result.data.socials?.instagram || '',
                            tiktok: result.data.socials?.tiktok || '',
                            twitter: result.data.socials?.twitter || ''
                        }
                    });
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // 2. Avatar File Chooser
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert('Avatar image must be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData(prev => ({ ...prev, avatarUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // 3. Save Profile & Social Changes
    const handleSaveProfileAndSocials = async () => {
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
                body: JSON.stringify(profileData)
            });

            const result = await res.json();
            if (result.success) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                alert(result.error || 'Failed to update settings');
            }
        } catch (err) {
            console.error('Save settings error:', err);
            alert('Something went wrong. Please check your backend connection.');
        } finally {
            setIsSaving(false);
        }
    };

    // 4. Change Password Handler
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return alert('New password and confirm password do not match!');
        }
        if (passwords.newPassword.length < 6) {
            return alert('New password must be at least 6 characters long.');
        }

        const token = localStorage.getItem('adminToken');
        if (!token) return alert('Session expired. Please log in again.');

        setIsSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                })
            });

            const result = await res.json();
            if (result.success) {
                alert('Password changed successfully!');
                setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                alert(result.error || 'Failed to change password');
            }
        } catch (err) {
            console.error('Password change error:', err);
            alert('Error updating password.');
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
            
            {/* Top Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account information, public socials, and login credentials.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 pb-8">
                
                {/* Left Sidebar for Settings Tabs */}
                <div className="w-full lg:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
                    <button 
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer ${activeTab === 'profile' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <FaUser size={18} /> Profile Info
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActiveTab('social')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer ${activeTab === 'social' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <FaGlobe size={18} /> Social Links
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer ${activeTab === 'security' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                        <FaLock size={18} /> Security
                    </button>
                </div>

                {/* Right Content Area */}
                <div className="flex-1">
                    <div className="backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-6 lg:p-8 shadow-sm">
                        
                        {/* 1. Profile Tab Content */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Profile Information</h3>
                                
                                {/* Profile Picture Upload */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-teal-500 overflow-hidden flex items-center justify-center">
                                            {profileData.avatarUrl ? (
                                                <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaUser size={40} className="text-gray-400" />
                                            )}
                                        </div>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            accept="image/*" 
                                            onChange={handleAvatarUpload} 
                                            className="hidden" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 p-2 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors cursor-pointer"
                                            title="Upload Photo">
                                            <FaCamera size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">Profile Picture</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended size: 500x500px. Maximum size: 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={profileData.fullName}
                                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                                        <input 
                                            type="text" 
                                            value={profileData.jobTitle}
                                            onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address (For Contact / Notifications)</label>
                                        <input 
                                            type="email" 
                                            value={profileData.contactEmail}
                                            onChange={(e) => setProfileData({ ...profileData, contactEmail: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio / Short Description</label>
                                        <textarea 
                                            rows="4" 
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="button"
                                        onClick={handleSaveProfileAndSocials}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-50">
                                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : saveSuccess ? <FaCheckCircle size={16} /> : <FaSave size={16} />}
                                        <span>{saveSuccess ? 'Saved Successfully!' : 'Save Changes'}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 2. Social Links Tab Content */}
                        {activeTab === 'social' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Social Media Links</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaLinkedin className="text-blue-500" /> LinkedIn Profile URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.linkedin}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, linkedin: e.target.value } })}
                                            placeholder="https://linkedin.com/in/..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaGithub className="text-gray-400" /> GitHub Profile URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.github}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, github: e.target.value } })}
                                            placeholder="https://github.com/..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaYoutube className="text-red-500" /> YouTube Channel URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.youtube}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, youtube: e.target.value } })}
                                            placeholder="https://youtube.com/@..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaFacebook className="text-blue-600" /> Facebook Profile URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.facebook}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, facebook: e.target.value } })}
                                            placeholder="https://facebook.com/..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaInstagram className="text-pink-500" /> Instagram Profile URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.instagram}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, instagram: e.target.value } })}
                                            placeholder="https://instagram.com/..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaTiktok className="text-gray-300" /> TikTok Profile URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.tiktok}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, tiktok: e.target.value } })}
                                            placeholder="https://tiktok.com/@..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                                            <FaTwitter className="text-sky-400" /> Twitter / X URL
                                        </label>
                                        <input 
                                            type="url" 
                                            value={profileData.socials.twitter}
                                            onChange={(e) => setProfileData({ ...profileData, socials: { ...profileData.socials, twitter: e.target.value } })}
                                            placeholder="https://twitter.com/..." 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm font-mono" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="button"
                                        onClick={handleSaveProfileAndSocials}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-50">
                                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : saveSuccess ? <FaCheckCircle size={16} /> : <FaSave size={16} />}
                                        <span>{saveSuccess ? 'Saved Successfully!' : 'Save Social Links'}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 3. Security Tab Content */}
                        {activeTab === 'security' && (
                            <form onSubmit={handleChangePassword} className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Change Password</h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                        <input 
                                            type="password" 
                                            required
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                            placeholder="Enter current password" 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                        <input 
                                            type="password" 
                                            required
                                            value={passwords.newPassword}
                                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            placeholder="Enter new password (min. 6 characters)" 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            required
                                            value={passwords.confirmPassword}
                                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                            placeholder="Confirm new password" 
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-50">
                                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <FaSave size={16} />}
                                        <span>Update Password</span>
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