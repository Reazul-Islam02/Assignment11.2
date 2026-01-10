import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return toast.error("Password must be 6+ chars, with uppercase and lowercase.");
        }

        setLoading(true);
        try {
            await createUser(email, password);
            await updateUserProfile(name, photo);
            toast.success('Registration success!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            toast.success('Google Signup success!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4">
            <div className="flex flex-col lg:flex-row-reverse w-full max-w-5xl bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200">
                {/* Right Side: Illustration & Quote */}
                <div className="hidden lg:flex flex-1 bg-secondary relative items-center justify-center p-12 text-secondary-content">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    <div className="relative z-10 text-center max-w-md">
                        <div className="text-6xl mb-8 animate-bounce">✍️</div>
                        <h2 className="text-4xl font-black mb-6 leading-tight">Start Your <br /><span className="text-base-100 italic">Wisdom Log</span></h2>
                        <p className="text-lg opacity-80 italic mb-8">
                            "Learning is the only thing the mind never exhausts, never fears, and never regrets."
                        </p>
                        <p className="font-bold opacity-60">— Leonardo da Vinci</p>
                    </div>
                </div>

                {/* Left Side: Register Form */}
                <div className="flex-1 p-8 lg:p-16">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-black mb-3 text-secondary">Start Sharing</h1>
                            <p className="text-base-content/60 font-medium">Create your mentor profile today</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-secondary/10 transition-all font-medium py-6"
                                    required
                                />
                            </div>

                            <div className="form-control md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Avatar URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    placeholder="https://..."
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-secondary/10 transition-all font-medium py-6"
                                />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-secondary/10 transition-all font-medium py-6"
                                    required
                                />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Master Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-secondary/10 transition-all font-medium py-6"
                                    required
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="btn btn-secondary w-full md:col-span-2 rounded-2xl font-black text-lg py-4 h-auto shadow-xl shadow-secondary/20 group mt-4"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : 'Begin Journey'}
                                <span className="ml-2 group-hover:-translate-y-1 transition-transform">🚀</span>
                            </button>
                        </form>

                        <div className="divider my-8 font-bold opacity-20 capitalize">alternative access</div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full rounded-2xl border-2 gap-3 font-bold hover:bg-base-200 hover:text-base-content group"
                        >
                            <FaGoogle className="text-xl group-hover:rotate-[360deg] transition-transform duration-700" />
                            Signup with Google
                        </button>

                        <p className="text-center mt-8 font-bold text-sm">
                            <span className="opacity-50">Already a member?</span>{' '}
                            <Link to="/login" className="text-secondary hover:underline underline-offset-4 decoration-2">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
