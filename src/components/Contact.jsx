import React, { useState, useEffect } from 'react';
import { Send, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle');
    const [contactInfo, setContactInfo] = useState({
        whatsappNumber: '94711234567',
        locationText: 'Piliyandala, Sri Lanka',
        mapCoordinates: '6.769238,79.94509'
    });

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    // Fetch dynamic contact info from MongoDB
    useEffect(() => {
        fetch(`${API_URL}/api/profile`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setContactInfo({
                        whatsappNumber: data.data.whatsappNumber || '94711234567',
                        locationText: data.data.locationText || 'Piliyandala, Sri Lanka',
                        mapCoordinates: data.data.mapCoordinates || '6.769238,79.94509'
                    });
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const response = await fetch(`${API_URL}/api/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setFormStatus('sent');
                setFormData({ user_name: '', user_email: '', message: '' });
                setTimeout(() => setFormStatus('idle'), 3000);
            } else {
                throw new Error(data.error || 'Failed to send');
            }
        } catch (error) {
            console.error("Email send error:", error);
            setFormStatus('idle');
            alert(error.message || "Failed to send message.");
        }
    };

    return (
        <section id='contacts' className='py-24 relative overflow-hidden min-h-screen flex items-center'>
            <div className='container mx-auto px-6 max-w-6xl relative z-10'>
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
                    
                    {/* Left: Contact Info */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">Get In Touch</h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                I'm always open to discussing product design work or partnership opportunities. Reach out to me directly via WhatsApp or visit my location.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Dynamic WhatsApp */}
                            <a
                                href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-teal-500/40 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                                    <FaWhatsapp size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-400 group-hover:text-teal-400">WhatsApp</h3>
                                    <p className="text-white text-sm mt-0.5">Let's chat</p>
                                </div>
                            </a>

                            {/* Dynamic Location */}
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.mapCoordinates}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-teal-500/40 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-400 group-hover:text-teal-400">Location</h3>
                                    <p className="text-white text-sm mt-0.5 truncate max-w-[130px]">{contactInfo.locationText}</p>
                                    <p className="text-[11px] text-gray-500">Click for directions</p>
                                </div>
                            </a>
                        </div>

                        {/* Dynamic Dark Theme Google Map */}
                        <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-800 shadow-md relative group bg-gray-900">
                            <iframe
                                src={`https://maps.google.com/maps?q=${contactInfo.mapCoordinates}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
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

                    {/* Right: Message Form */}
                    <form
                        onSubmit={handleFormSubmit}
                        className='flex flex-col gap-4 dark:bg-zinc-900/50 bg-white/60 p-8 rounded-3xl border dark:border-zinc-800 border-gray-100 backdrop-blur-md shadow-xl'
                    >
                        <h3 className='text-2xl font-bold dark:text-white text-gray-900 mb-2'>Send me a message</h3>
                        <input type='text' name='user_name' value={formData.user_name} onChange={handleChange} placeholder='Your Name' required className='w-full px-5 py-3.5 rounded-xl border dark:border-zinc-800 border-gray-200 dark:bg-zinc-950/50 bg-white/80 dark:text-white text-gray-800 text-sm' />
                        <input type='email' name='user_email' value={formData.user_email} onChange={handleChange} placeholder='Your Email' required className='w-full px-5 py-3.5 rounded-xl border dark:border-zinc-800 border-gray-200 dark:bg-zinc-950/50 bg-white/80 dark:text-white text-gray-800 text-sm' />
                        <textarea rows='5' name='message' value={formData.message} onChange={handleChange} placeholder='Tell me about your project...' required className='w-full px-5 py-3.5 rounded-xl border dark:border-zinc-800 border-gray-200 dark:bg-zinc-950/50 bg-white/80 dark:text-white text-gray-800 text-sm resize-none grow' />

                        <button
                            type='submit'
                            disabled={formStatus !== 'idle'}
                            className='inline-flex items-center justify-center h-12 rounded-xl text-white font-semibold text-sm bg-teal-600 hover:bg-teal-700 transition-colors w-full cursor-pointer disabled:opacity-80'
                        >
                            <AnimatePresence mode="wait">
                                {formStatus === 'idle' && (
                                    <motion.div key="idle" className="flex items-center gap-2">
                                        <Send size={16} /> <span>Send Message</span>
                                    </motion.div>
                                )}
                                {formStatus === 'sending' && (
                                    <motion.div key="sending" className="flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin" /> <span>Sending...</span>
                                    </motion.div>
                                )}
                                {formStatus === 'sent' && (
                                    <motion.div key="sent" className="flex items-center gap-2 text-white">
                                        <CheckCircle2 size={18} /> <span>Message Sent!</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Contact;