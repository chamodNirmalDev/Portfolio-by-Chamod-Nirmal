import React, { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaBriefcase } from 'react-icons/fa';
import { SiFreelancer } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle');

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const response = await fetch('https://portfolio-backend-orcin-zeta.vercel.app/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus('sent');
                setFormData({
                    user_name: '',
                    user_email: '',
                    message: ''
                });
                setTimeout(() => setFormStatus('idle'), 3000);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Email send error:", error);
            setFormStatus('idle');
            alert("Oops! Something went wrong. Please check if the backend server is running.");
        }
    };

    return (
        <section id='contacts' className='py-24 relative overflow-hidden min-h-screen flex items-center'>

            {/* Ambient Background Glows */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className='absolute top-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]'></motion.div>
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className='absolute bottom-10 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]'></motion.div>
            </div>

            <div className='container mx-auto px-6 max-w-6xl relative z-10'>

                {/* --- Main Centered Title --- */}
                <div className='text-center mb-16' data-aos='fade-up'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5'>
                        <span className='w-2 h-2 rounded-full bg-teal-500 animate-pulse'></span>
                        <span className='text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider'>Contact Me</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 dark:text-white text-gray-900'>
                        Let's Work <span className='text-teal-600 dark:text-emerald-400'>Together</span>
                    </h2>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch'>

                    {/* --- Left Column: Contact Info Card --- */}
                    <div 
                        className='flex flex-col justify-between gap-8 dark:bg-zinc-900/50 bg-white/60 p-8 sm:p-10 rounded-3xl border dark:border-zinc-800 border-gray-100 backdrop-blur-md shadow-2xl shadow-teal-500/5 order-2 lg:order-1' 
                        data-aos='fade-right'
                    >
                        <div>
                            <h3 className='text-2xl font-bold dark:text-white text-gray-900 mb-4'>Get In Touch</h3>
                            <p className='text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8'>
                                I'm always open to discussing product design work or partnership opportunities. Reach out to me directly via email or WhatsApp.
                            </p>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <a href="mailto:chamodnirmal54@gmail.com" className='flex items-center gap-4 p-4 rounded-2xl dark:bg-zinc-950/50 bg-white/80 border dark:border-zinc-800 border-gray-100 hover:border-teal-500/50 transition-colors group'>
                                    <div className='p-3 rounded-full bg-teal-500/10 text-teal-600 dark:text-emerald-400 group-hover:bg-teal-500 group-hover:text-white transition-colors'>
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5'>Email</p>
                                        <p className='text-sm font-medium text-gray-900 dark:text-white'>Drop a line</p>
                                    </div>
                                </a>

                                <a href="https://wa.me/94700000000" target="_blank" rel="noopener noreferrer" className='flex items-center gap-4 p-4 rounded-2xl dark:bg-zinc-950/50 bg-white/80 border dark:border-zinc-800 border-gray-100 hover:border-green-500/50 transition-colors group'>
                                    <div className='p-3 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors'>
                                        <FaWhatsapp size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5'>WhatsApp</p>
                                        <p className='text-sm font-medium text-gray-900 dark:text-white'>Let's chat</p>
                                    </div>
                                </a>

                                <div className='flex items-center gap-4 p-4 rounded-2xl dark:bg-zinc-950/50 bg-white/80 border dark:border-zinc-800 border-gray-100 sm:col-span-2'>
                                    <div className='p-3 rounded-full bg-teal-500/10 text-teal-600 dark:text-emerald-400'>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5'>Location</p>
                                        <p className='text-sm font-medium text-gray-900 dark:text-white'>Piliyandala, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pt-6 border-t dark:border-zinc-800 border-gray-200'>
                            <p className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4'>Find me on</p>
                            <div className='flex flex-wrap gap-3'>
                                <a href="#" target="_blank" rel="noopener noreferrer" className='p-3 rounded-full dark:bg-zinc-800/80 bg-gray-100 text-gray-600 dark:text-gray-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all'>
                                    <FaLinkedin size={20} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className='p-3 rounded-full dark:bg-zinc-800/80 bg-gray-100 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all'>
                                    <FaGithub size={20} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className='p-3 rounded-full dark:bg-zinc-800/80 bg-gray-100 text-gray-600 dark:text-gray-400 hover:text-[#29B2FE] dark:hover:text-[#29B2FE] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all'>
                                    <SiFreelancer size={20} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className='p-3 rounded-full dark:bg-zinc-800/80 bg-gray-100 text-gray-600 dark:text-gray-400 hover:text-[#22C55E] dark:hover:text-[#22C55E] hover:bg-green-50 dark:hover:bg-green-900/20 transition-all'>
                                    <FaBriefcase size={20} />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* --- Right Column: The Form Card --- */}
                    <form
                        onSubmit={handleFormSubmit}
                        className='flex flex-col gap-5 dark:bg-zinc-900/50 bg-white/60 p-8 sm:p-10 rounded-3xl border dark:border-zinc-800 border-gray-100 backdrop-blur-md shadow-2xl shadow-teal-500/5 order-1 lg:order-2 h-full'
                        data-aos='fade-left'
                    >
                        <h3 className='text-2xl font-bold dark:text-white text-gray-900 mb-2'>Send me a message</h3>

                        <input
                            type='text'
                            name='user_name'
                            value={formData.user_name}
                            onChange={handleChange}
                            placeholder='Your Name'
                            required
                            className='w-full px-5 py-4 rounded-xl border outline-hidden text-base transition-all dark:border-zinc-800 border-gray-200 dark:bg-zinc-950/50 bg-white/80 dark:text-white text-gray-800 focus:border-teal-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-teal-500'
                        />

                        <input
                            type='email'
                            name='user_email'
                            value={formData.user_email}
                            onChange={handleChange}
                            placeholder='Your Email'
                            required
                            className='w-full px-5 py-4 rounded-xl border outline-hidden text-base transition-all dark:border-zinc-800 border-gray-200 dark:bg-zinc-950/50 bg-white/80 dark:text-white text-gray-800 focus:border-teal-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-teal-500'
                        />

                        <textarea
                            rows='5'
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Tell me about your project...'
                            required
                            className='w-full px-5 py-4 rounded-xl border outline-hidden text-base transition-all dark:border-zinc-800 border-gray-200 dark:bg-zinc-950/50 bg-white/80 dark:text-white text-gray-800 focus:border-teal-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-teal-500 resize-none grow'
                        />

                        <button
                            type='submit'
                            disabled={formStatus !== 'idle'}
                            className='relative overflow-hidden inline-flex items-center justify-center h-14 mt-2 rounded-xl text-white font-semibold text-base bg-teal-600 hover:bg-teal-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300 w-full disabled:opacity-90 disabled:cursor-not-allowed'
                        >
                            <AnimatePresence mode="wait">
                                {formStatus === 'idle' && (
                                    <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </motion.div>
                                )}

                                {formStatus === 'sending' && (
                                    <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Sending...</span>
                                    </motion.div>
                                )}

                                {formStatus === 'sent' && (
                                    <motion.div key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-100">
                                        <CheckCircle2 size={20} />
                                        <span>Message Sent!</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
}

export default Contact;