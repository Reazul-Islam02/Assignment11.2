import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true);
        try {
            await loginUser(email, password);
            toast.success('Login success!');
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
            toast.success('Google Login success!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200">
                {/* Left Side: Illustration & Quote */}
                <div className="hidden lg:flex flex-1 bg-neutral relative items-center justify-center p-12 text-neutral-content">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                    <div className="relative z-10 text-center max-w-md">
                        <div className="text-6xl mb-8 animate-pulse text-primary">✨</div>
                        <h2 className="text-4xl font-black mb-6 leading-tight">Preserving Human <br /><span className="text-primary italic">Intelligence</span></h2>
                        <p className="text-lg opacity-80 italic mb-8">
                            "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
                        </p>
                        <p className="font-bold opacity-60">— Ralph Waldo Emerson</p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 p-8 lg:p-16">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-black mb-3 text-primary">Welcome Back</h1>
                            <p className="text-base-content/60 font-medium">Continue your journey of wisdom</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-primary/10 transition-all font-medium py-6"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Secret Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-primary/10 transition-all font-medium py-6"
                                    required
                                />
                                <label className="label">
                                    <Link to="#" className="label-text-alt link link-hover opacity-50 font-bold">Forgot password?</Link>
                                </label>
                            </div>

                            <button
                                disabled={loading}
                                className="btn btn-primary w-full rounded-2xl font-black text-lg py-4 h-auto shadow-xl shadow-primary/20 group"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : 'Explore Again'}
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </form>

                        <div className="divider my-10 font-bold opacity-20 capitalize">social access</div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full rounded-2xl border-2 gap-3 font-bold hover:bg-base-200 hover:text-base-content group"
                        >
                            <FaGoogle className="text-xl group-hover:scale-125 transition-transform duration-300" />
                            Continue with Google
                        </button>

                        <p className="text-center mt-12 font-bold text-sm">
                            <span className="opacity-50">Need an account?</span>{' '}
                            <Link to="/register" className="text-primary hover:underline underline-offset-4 decoration-2">Join the Collective</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
