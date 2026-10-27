import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const ProjectsManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        status: 'Active',
        githubLink: '',
        liveLink: '',
        imageUrl: ''
    });

    // Fetch Projects from Backend
    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/api/projects`);
            const result = await res.json();
            if (result.success) {
                setProjects(result.data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save New Project
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            const res = await fetch(`${API_URL}/api/admin/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                setIsModalOpen(false);
                setFormData({
                    title: '',
                    description: '',
                    technologies: '',
                    status: 'Active',
                    githubLink: '',
                    liveLink: '',
                    imageUrl: ''
                });
                fetchProjects(); // Refresh list
            } else {
                alert(result.error || 'Failed to save project');
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    // Delete Project
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const token = localStorage.getItem('adminToken');

        try {
            const res = await fetch(`${API_URL}/api/admin/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const result = await res.json();
            if (result.success) {
                fetchProjects(); // Refresh list
            } else {
                alert(result.error || 'Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className='flex-1 p-6 overflow-y-auto relative'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Projects Management</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Manage your portfolio projects and case studies from MongoDB</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className='flex items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                        hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 cursor-pointer'>
                    <FaPlus size={14} />
                    <span>Add New Projects</span>
                </button>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                <p className="text-gray-500 dark:text-gray-400">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No projects found in database.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8'>
                    {projects.map((project) => (
                        <div key={project._id} className='relative backdrop-blur-md bg-white/40 dark:bg-black/20 border border-teal-500/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group'>
                            <div className='h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity'>
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className='absolute inset-0 bg-linear-to-r from-teal-500/20 to-emerald-500/20 flex items-center justify-center'>
                                        <span className='text-teal-700/50 dark:text-teal-300/50 font-bold tracking-widest uppercase'>
                                            Project Image
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='p-5'>
                                <div className='flex justify-between items-start mb-2'>
                                    <h3 className='text-lg font-bold text-gray-800 dark:text-white line-clamp-1'>{project.title}</h3>
                                    <span className='px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-full'>
                                        {project.status}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2'>
                                    {project.description}
                                </p>
                                <div className='flex flex-wrap gap-2 mb-5'>
                                    {project.technologies?.map((tech, i) => (
                                        <span key={i} className='text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/10'>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex justify-between items-center pt-4 border-t border-teal-500/10'>
                                    <div className='flex gap-3'>
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors' title='View Source'>
                                                <FaGithub size={18} />
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className='text-gray-300 hover:text-teal-500 transition-colors' title='Live Preview'>
                                                <FaExternalLinkAlt size={16} />
                                            </a>
                                        )}
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={() => handleDelete(project._id)} className='p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer' title='Delete Project'>
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
                    <div className='bg-white dark:bg-gray-900 border border-teal-500/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>

                        <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800'>
                            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>Add New Project</h3>
                            <button onClick={() => setIsModalOpen(false)} className='text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer'>
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Project Title</label>
                                <input
                                    type='text'
                                    name='title'
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder='e.g., Hospital Management System'
                                    className='w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Description</label>
                                <textarea
                                    rows='3'
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder='Briefly describe the project...'
                                    className='w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white'
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Technologies (Comma separated)</label>
                                    <input
                                        type='text'
                                        name='technologies'
                                        value={formData.technologies}
                                        onChange={handleChange}
                                        placeholder='React, Spring Boot, MySQL'
                                        className='w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Status</label>
                                    <select
                                        name='status'
                                        value={formData.status}
                                        onChange={handleChange}
                                        className='w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white'
                                    >
                                        <option value="Active">Active</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>GitHub Link</label>
                                    <input
                                        type='text'
                                        name='githubLink'
                                        value={formData.githubLink}
                                        onChange={handleChange}
                                        placeholder='https://github.com/...'
                                        className='w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Live Demo</label>
                                    <input
                                        type='text'
                                        name='liveLink'
                                        value={formData.liveLink}
                                        onChange={handleChange}
                                        placeholder='https://...'
                                        className='w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-white'
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Project Image</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, imageUrl: reader.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold 
                file:bg-teal-500 file:text-white hover:file:bg-teal-600 text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
                                    />
                                </div>
                                {formData.imageUrl && (
                                    <div className="mt-2 w-20 h-12 rounded-lg overflow-hidden border border-teal-500/30">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className='flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800'>
                                <button
                                    type='button'
                                    onClick={() => setIsModalOpen(false)}
                                    className='px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-5 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer'>
                                    Save Project
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManagement;