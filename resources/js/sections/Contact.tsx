import DecryptedText from '@/components/ui/DecryptedText';
import GradientHeading from '@/components/ui/GradientHeading';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            const token = csrfMeta ? csrfMeta.getAttribute('content') : '';

            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setStatus('sent');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-32 px-6 bg-[#050505]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        05 / Contact
                    </span>
                </motion.div>

                <GradientHeading
                    text="Let's build something."
                    className="text-4xl md:text-5xl font-bold leading-tight mb-16"
                />

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Left — info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <p className="text-white/60 leading-relaxed">
                            I'm open to freelance projects, full-time roles, and interesting collaborations. Drop me a line and let's talk.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <div className="text-xs font-mono text-white/30 tracking-widest uppercase mb-1">Email</div>
                                <DecryptedText
                                    text="harshavardhan@example.com"
                                    animateOn="view"
                                    sequential={true}
                                    speed={30}
                                    className="text-white font-mono text-sm"
                                    encryptedClassName="text-purple-400/60 font-mono text-sm"
                                />
                            </div>

                            <div>
                                <div className="text-xs font-mono text-white/30 tracking-widest uppercase mb-2">
                                    Socials
                                </div>
                                <div className="flex gap-4">
                                    {[
                                        { label: 'GitHub', href: 'https://github.com' },
                                        { label: 'LinkedIn', href: 'https://linkedin.com' },
                                        { label: 'Twitter', href: 'https://twitter.com' },
                                    ].map(social => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-mono"
                                        >
                                            {social.label} ↗
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-5"
                    >
                        {[
                            { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                        ].map(field => (
                            <div key={field.name}>
                                <label className="block text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name as keyof typeof form]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300"
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                required
                                rows={5}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-100 disabled:opacity-50 transition-all duration-300"
                        >
                            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent ✓' : 'Send Message'}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-400 text-xs text-center">
                                Something went wrong. Please try again or email directly.
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-5xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
                <span className="text-xs font-mono text-white/20">
                    © {new Date().getFullYear()} Harshavardhan C
                </span>
                <span className="text-xs font-mono text-white/20">Built with Laravel & React Bits</span>
            </motion.div>
        </section>
    );
}
