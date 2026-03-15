import DecryptedText from '@/components/ui/DecryptedText';
import FieldBrackets from '@/components/ui/FieldBrackets';
import GradientHeading from '@/components/ui/GradientHeading';
import { Turnstile } from '@marsidev/react-turnstile';
import { motion } from 'motion/react';
import { lazy, Suspense, useState } from 'react';

const PixelSnow = lazy(() => import('@/components/ui/PixelSnow'));

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'rate-limited'>('idle');
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

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
                body: JSON.stringify({ ...form, 'cf-turnstile-response': turnstileToken }),
            });

            if (response.ok) {
                setStatus('sent');
                setForm({ name: '', email: '', message: '' });
                setTurnstileToken(null);
            } else if (response.status === 429) {
                setStatus('rate-limited');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative py-16 md:py-32 px-6 bg-[#050505] overflow-hidden">
            {/* Pixel Snow background */}
            <div className="absolute inset-0 pointer-events-none">
                <Suspense fallback={null}>
                    <PixelSnow
                        color="#a855f7"
                        density={0.18}
                        speed={0.8}
                        brightness={1.2}
                        variant="snowflake"
                        pixelResolution={180}
                        depthFade={10}
                    />
                </Suspense>
            </div>

            <div className="relative max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        06 / Contact
                    </span>
                </motion.div>

                <GradientHeading
                    text="Let's build something."
                    className="text-4xl md:text-5xl font-bold leading-tight mb-16"
                />

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* Left — info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <p className="text-white/60 leading-relaxed">
                            {/* I'm open to freelance projects, full-time roles, and interesting collaborations.  */}
                            Drop me a line and let's talk.
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
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { label: 'GitHub', href: 'https://github.com/harsha2805' },
                                        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshavardhan2805' },
                                        { label: 'Stack Overflow', href: 'https://stackoverflow.com/users/20165200/harshavardhan' },
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
                                <FieldBrackets>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={form[field.name as keyof typeof form]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                                    />
                                </FieldBrackets>
                            </div>
                        ))}

                        <div>
                            <label className="block text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                                Message
                            </label>
                            <FieldBrackets>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300 resize-none"
                                />
                            </FieldBrackets>
                        </div>

                        <Turnstile
                            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                            onSuccess={setTurnstileToken}
                            onExpire={() => setTurnstileToken(null)}
                            options={{ theme: 'dark' }}
                        />

                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'rate-limited' || !turnstileToken}
                            className={`group relative w-full py-3.5 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed ${
                                status === 'sent'
                                    ? 'bg-emerald-500/15 border border-emerald-400/30 text-emerald-300'
                                    : 'bg-white/[0.06] border border-white/10 hover:border-purple-500/30 text-white hover:bg-white/[0.1]'
                            }`}
                            style={{
                                boxShadow: status === 'sent'
                                    ? '0 0 30px rgba(16,185,129,0.15)'
                                    : undefined,
                            }}
                        >
                            {/* Hover shimmer */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                            <span className="relative flex items-center justify-center gap-2 tracking-wide">
                                {status === 'sending' ? (
                                    <>
                                        Sending
                                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
                                        </svg>
                                    </>
                                ) : status === 'sent' ? (
                                    <>
                                        Message Sent
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>

                        {status === 'rate-limited' && (
                            <p className="text-amber-400 text-xs text-center">
                                Too many attempts. Please try again later.
                            </p>
                        )}
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
                className="relative max-w-5xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
                <span className="text-xs font-mono text-white/20">
                    © {new Date().getFullYear()} Harshavardhan C
                </span>
                <span className="text-xs font-mono text-white/20">Built with Laravel & React Bits & Claude</span>
            </motion.div>
        </section>
    );
}
