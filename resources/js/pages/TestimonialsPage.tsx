import Grainient from '@/components/ui/Grainient';
import axios from 'axios';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join('');
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({ name: '', role: '', email: '', quote: '' });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [step, setStep] = useState<'form' | 'verify' | 'done'>('form');
    const [pendingId, setPendingId] = useState<number | null>(null);
    const [pendingEmail, setPendingEmail] = useState('');

    const [code, setCode] = useState('');
    const [verifyStatus, setVerifyStatus] = useState<'idle' | 'verifying' | 'error'>('idle');
    const [verifyError, setVerifyError] = useState('');

    useEffect(() => {
        axios.get<Testimonial[]>('/testimonials/data').then(res => {
            setTestimonials(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('sending');
        setErrors({});

        try {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            const token = csrfMeta ? csrfMeta.getAttribute('content') : '';

            const res = await axios.post<{ id: number }>('/testimonials/submit', form, {
                headers: {
                    'X-CSRF-TOKEN': token ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            setPendingId(res.data.id);
            setPendingEmail(form.email);
            setForm({ name: '', role: '', email: '', quote: '' });
            setSubmitStatus('idle');
            setStep('verify');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.status === 422) {
                const validationErrors = err.response.data.errors as Record<string, string[]>;
                const flat: Record<string, string> = {};
                for (const key in validationErrors) {
                    flat[key] = validationErrors[key][0];
                }
                setErrors(flat);
                setSubmitStatus('idle');
            } else {
                setSubmitStatus('error');
            }
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setVerifyStatus('verifying');
        setVerifyError('');

        try {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            const token = csrfMeta ? csrfMeta.getAttribute('content') : '';

            await axios.post('/testimonials/verify', { id: pendingId, code }, {
                headers: {
                    'X-CSRF-TOKEN': token ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            setStep('done');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setVerifyError(err.response.data.message);
            } else {
                setVerifyError('Something went wrong. Please try again.');
            }
            setVerifyStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] px-6 py-20">
            <div className="max-w-5xl mx-auto">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white/70 transition-colors duration-300 tracking-widest uppercase"
                    >
                        <span>←</span> Back to Portfolio
                    </Link>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        What people say
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
                        All Reviews
                    </h1>
                    <p className="mt-4 text-white/40 text-sm max-w-md">
                        Words from clients, collaborators, and teammates I've had the privilege of working with.
                    </p>
                </motion.div>

                {/* Reviews grid */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-48 rounded-2xl bg-white/[0.03] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-5">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                                className="relative overflow-hidden rounded-2xl"
                            >
                                {/* Grainient per card */}
                                <div className="absolute inset-0 opacity-90">
                                    <Grainient
                                        color1="#a855f7"
                                        color2="#7c3aed"
                                        color3="#3b0764"
                                        grainAmount={0.07}
                                        grainScale={3.5}
                                        timeSpeed={0.08}
                                        warpStrength={0.6}
                                        warpFrequency={3.5}
                                        contrast={1.2}
                                        saturation={1.0}
                                        zoom={0.8}
                                        colorBalance={i * 0.04}
                                    />
                                </div>

                                <div className="relative p-7 flex flex-col gap-5 h-full">
                                    {/* Quote */}
                                    <p className="text-white/85 text-sm leading-relaxed font-light flex-1">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/25 flex items-center justify-center shrink-0">
                                            <span className="text-white text-[10px] font-semibold">
                                                {getInitials(t.name)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-semibold leading-none mb-0.5">
                                                {t.name}
                                            </div>
                                            <div className="text-white/45 text-xs font-mono">
                                                {t.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Submit a review */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-20 pt-16 border-t border-white/5"
                >
                    <h2 className="text-2xl font-bold text-white mb-2">Leave a Review</h2>
                    <p className="text-white/40 text-sm mb-10">
                        Your review will be visible after approval.
                    </p>

                    {step === 'done' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl border border-purple-500/20 bg-purple-500/5 px-8 py-10 text-center"
                        >
                            <p className="text-white font-semibold text-lg mb-1">Thank you!</p>
                            <p className="text-white/50 text-sm">Your review is pending approval and will appear shortly.</p>
                        </motion.div>
                    )}

                    {step === 'verify' && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-xl"
                        >
                            <p className="text-white/60 text-sm mb-8">
                                We emailed a 6-digit code to{' '}
                                <span className="text-white font-mono">{pendingEmail}</span>.
                                Enter it below to confirm your review.
                            </p>

                            <form onSubmit={handleVerify} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono tracking-widest placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                                    />
                                    {verifyError && (
                                        <p className="mt-1 text-xs text-red-400">{verifyError}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={verifyStatus === 'verifying'}
                                    className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-100 disabled:opacity-50 transition-all duration-300"
                                >
                                    {verifyStatus === 'verifying' ? 'Verifying...' : 'Verify Email'}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 'form' && (
                        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
                            {[
                                { name: 'name', label: 'Name', placeholder: 'Your name' },
                                { name: 'role', label: 'Role', placeholder: 'e.g. Founder, Acme Corp' },
                                { name: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
                            ].map(field => (
                                <div key={field.name}>
                                    <label className="block text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type ?? 'text'}
                                        name={field.name}
                                        value={form[field.name as 'name' | 'role' | 'email']}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                                    />
                                    {errors[field.name] && (
                                        <p className="mt-1 text-xs text-red-400">{errors[field.name]}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label className="block text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                                    Review
                                </label>
                                <textarea
                                    name="quote"
                                    value={form.quote}
                                    onChange={handleChange}
                                    placeholder="Share your experience working with me..."
                                    required
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300 resize-none"
                                />
                                {errors.quote && (
                                    <p className="mt-1 text-xs text-red-400">{errors.quote}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={submitStatus === 'sending'}
                                className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-100 disabled:opacity-50 transition-all duration-300"
                            >
                                {submitStatus === 'sending' ? 'Submitting...' : 'Submit Review'}
                            </button>

                            {submitStatus === 'error' && (
                                <p className="text-red-400 text-xs">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
