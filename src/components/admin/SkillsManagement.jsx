import React, { useState, useEffect, useCallback } from 'react';
import { 
    FaPlus, FaEdit, FaTrash, FaTimes, FaCode, FaServer, 
    FaPaintBrush, FaDatabase, FaMobileAlt, FaDesktop, 
    FaBrain, FaRobot, FaTools, FaSyncAlt 
} from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const CATEGORY_OPTIONS = [
    'Web Based', 'Frontend', 'Backend', 'Mobile Dev',
    'Desktop App', 'Database', 'AI & ML', 'Robotics & IoT', 'Tools'
];

// කැටගරියට අනුව ගැළපෙන default Icon සහ Color තේරීම
const getCategoryIcon = (category) => {
    switch (category) {
        case 'Frontend':
        case 'Web Based':
            return { Icon: FaCode, color: 'text-blue-500 bg-blue-100 dark:bg-blue-500/10' };
        case 'Backend':
            return { Icon: FaServer, color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10' };
        case 'Database':
            return { Icon: FaDatabase, color: 'text-amber-500 bg-amber-100 dark:bg-amber-500/10' };
        case 'Mobile Dev':
            return { Icon: FaMobileAlt, color: 'text-purple-500 bg-purple-100 dark:bg-purple-500/10' };
        case 'Desktop App':
            return { Icon: FaDesktop, color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-500/10' };
        case 'AI & ML':
            return { Icon: FaBrain, color: 'text-rose-500 bg-rose-100 dark:bg-rose-500/10' };
        case 'Robotics & IoT':
            return { Icon: FaRobot, color: 'text-teal-500 bg-teal-100 dark:bg-teal-500/10' };
        case 'Tools':
            return { Icon: FaTools, color: 'text-orange-500 bg-orange-100 dark:bg-orange-500/10' };
        default:
            return { Icon: FaPaintBrush, color: 'text-teal-500 bg-teal-100 dark:bg-teal-500/10' };
    }
};

const initialFormState = {
    name: '',
    category: 'Frontend',
    proficiency: 85,
    desc: ''
};

const SkillsManagement = () => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [formData, setFormData] = useState(initialFormState);
    const [isSaving, setIsSaving] = useState(false);

    // 1. Fetch All Skills from MongoDB
    const fetchSkills = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/skills`);
            const data = await res.json();
            if (data.success) {
                setSkills(data.data || []);
            }
        } catch (err) {
            console.error('Failed to load skills:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    // Input Changes හැසිරවීම
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'proficiency' ? Number(value) : value
        }));
    };

    // Modal විවෘත කිරීම (Add New හෝ Edit සඳහා)
    const openModal = (skill = null) => {
        if (skill) {
            setEditingSkillId(skill._id);
            setFormData({
                name: skill.name || '',
                category: skill.categories?.[0] || 'Frontend',
                proficiency: skill.proficiency ?? 85,
                desc: skill.desc || ''
            });
        } else {
            setEditingSkillId(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSkillId(null);
        setFormData(initialFormState);
    };

    // 2. Add New Skill හෝ Update Skill (Submit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!token) {
            alert('Admin login token missing. Please log in again.');
            return;
        }

        setIsSaving(true);
        const payload = {
            name: formData.name.trim(),
            categories: [formData.category],
            proficiency: formData.proficiency,
            desc: formData.desc.trim()
        };

        try {
            const endpoint = editingSkillId 
                ? `${API_URL}/api/admin/skills/${editingSkillId}`
                : `${API_URL}/api/admin/skills`;

            const method = editingSkillId ? 'PUT' : 'POST';

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
                fetchSkills(); // ලැයිස්තුව Refresh කිරීම
            } else {
                alert(result.error || 'Failed to save skill');
            }
        } catch (err) {
            console.error('Error saving skill:', err);
            alert('Server error occurred while saving skill');
        } finally {
            setIsSaving(false);
        }
    };

    // 3. Delete Skill
    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/api/admin/skills/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const result = await res.json();
            if (result.success) {
                setSkills(prev => prev.filter(s => s._id !== id));
            } else {
                alert(result.error || 'Failed to delete skill');
            }
        } catch (err) {
            console.error('Error deleting skill:', err);
        }
    };

    return (
        <div className="flex-1 p-6 overflow-y-auto relative">
            
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Skills Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Add, update, or remove your technical skills synced directly with MongoDB Atlas.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={fetchSkills}
                        title="Refresh Skills"
                        className="p-2.5 rounded-xl border border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors cursor-pointer"
                    >
                        <FaSyncAlt className={isLoading ? 'animate-spin' : ''} size={14} />
                    </button>

                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 cursor-pointer">
                        <FaPlus size={14} />
                        <span>Add New Skill</span>
                    </button>
                </div>
            </div>

            {/* Skills Grid */}
            {isLoading ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-sm">
                    Loading skills from database...
                </div>
            ) : skills.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-sm">
                    No skills found in database. Click "Add New Skill" to add one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {skills.map((skill) => {
                        const mainCategory = skill.categories?.[0] || 'Frontend';
                        const { Icon, color } = getCategoryIcon(mainCategory);

                        return (
                            <div 
                                key={skill._id} 
                                className="relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-lg ${color}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{skill.name}</h3>
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{mainCategory}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Edit & Delete Actions */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button 
                                            onClick={() => openModal(skill)}
                                            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer" 
                                            title="Edit"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(skill._id, skill.name)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer" 
                                            title="Delete"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>

                                {skill.desc && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                                        {skill.desc}
                                    </p>
                                )}
                                
                                {/* Progress Bar */}
                                <div className="mt-2">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-gray-700 dark:text-gray-300 text-xs">Proficiency</span>
                                        <span className="font-bold text-teal-600 dark:text-teal-400 text-xs">{skill.proficiency ?? 85}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 shadow-inner overflow-hidden">
                                        <div 
                                            className="bg-linear-to-r from-teal-500 to-emerald-500 h-2 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)] transition-all duration-500" 
                                            style={{ width: `${skill.proficiency ?? 85}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add / Edit Skill Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-md">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {editingSkillId ? 'Edit Skill' : 'Add New Skill'}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., React.js, Spring Boot" 
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white" 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <select 
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white"
                                    >
                                        {CATEGORY_OPTIONS.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                                        <span>Proficiency Percentage</span>
                                        <span className="text-teal-600 dark:text-teal-400 font-bold">{formData.proficiency}%</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        name="proficiency"
                                        min="10" 
                                        max="100" 
                                        value={formData.proficiency}
                                        onChange={handleChange}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-teal-500 mt-2" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
                                    <textarea 
                                        name="desc"
                                        rows="2"
                                        value={formData.desc}
                                        onChange={handleChange}
                                        placeholder="Brief description of experience with this tech..."
                                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white text-sm"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
                                <button 
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : editingSkillId ? 'Update Skill' : 'Save Skill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsManagement;