import React, { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
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
                        <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>
                        <span className='text-sm font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider'>Contact Me</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 dark:text-white text-gray-900'>
                        Let's Work <span className='text-teal-600 dark:text-emerald-400'>Together</span>
                    </h2>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch'>

                    {/* වම්පස තීරුව - Contact Information */}
                    <div className="flex flex-col gap-8">

                        {/* මාතෘකාව සහ විස්තරය */}
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
                            <p className="text-gray-400 leading-relaxed">
                                I'm always open to discussing product design work or partnership opportunities. Reach out to me directly via WhatsApp or visit my location.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* WhatsApp Box */}
                            <a
                                href="https://wa.me/94711234567" // මෙතන ඔයාගේ නම්බර් එක දාන්න
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-teal-500/30 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-teal-500 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300">
                                    <FaWhatsapp size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 group-hover:text-teal-400 transition-colors">
                                        WhatsApp
                                    </h3>
                                    <p className="text-white mt-1">Let's chat</p>
                                </div>
                            </a>

                            {/* Location Box */}
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=6.769238,79.94509"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-teal-500/30 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-teal-500 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 group-hover:text-teal-400 transition-colors">
                                        Location
                                    </h3>
                                    <p className="text-white mt-1">Piliyandala, Sri Lanka</p>
                                    <p className="text-xs text-gray-500 mt-1 group-hover:text-teal-500/80 transition-colors">Click for directions</p>
                                </div>
                            </a>

                        </div>

                        {/* Dark Theme Google Map */}
                        <div className="w-full h-64 mt-2 rounded-xl overflow-hidden border border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative group bg-gray-900">
                            {/* Map එක උඩින් යන Dark overlay එක */}
                            <div className="absolute inset-0 bg-gray-900/40 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            
                            <iframe
                                src="https://maps.google.com/maps?q=6.769238,79.94509&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-80 group-hover:invert-0 group-hover:hue-rotate-0 group-hover:contrast-100 transition-all duration-500"
                            ></iframe>
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