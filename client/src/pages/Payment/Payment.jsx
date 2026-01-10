import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import { useLocation, Link } from 'react-router-dom';

const Payment = () => {
    const { userData } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/dashboard';

    const handleCheckout = async () => {
        if (!auth.currentUser) {
            toast.error('Please login to upgrade');
            return;
        }
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
                redirectUrl: redirectUrl
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            window.location.href = response.data.url;
        } catch (error) {
            console.error(error);
            toast.error('Payment initiation failed');
        }
    };

    if (userData?.isPremium) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl border border-secondary">
                    <div className="card-body items-center text-center">
                        <div className="text-6xl mb-4">⭐</div>
                        <h2 className="card-title text-2xl font-bold text-secondary">You are Premium!</h2>
                        <p>Thank you for your support. You have access to all content.</p>
                        <div className="card-actions justify-end mt-6">
                            <button className="btn btn-outline btn-secondary" disabled>Lifetime Access Active</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Upgrade to Premium</h1>
                <p className="text-xl text-base-content/60 mb-12">Unlock exclusive insights and share unlimited wisdom with our community.</p>

                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">
                    {/* Free Plan */}
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary/20 transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
                        <div className="card-body items-center text-center p-10 flex flex-col justify-between">
                            <div>
                                <h2 className="card-title text-2xl font-black mb-2 opacity-80 group-hover:opacity-100 transition-opacity">Standard</h2>
                                <div className="flex items-baseline justify-center gap-1 my-8">
                                    <span className="text-6xl font-black tracking-tighter">$0</span>
                                    <span className="text-base-content/40 font-medium">/forever</span>
                                </div>
                                <ul className="text-left space-y-5 mb-10 text-base-content/70">
                                    <li className="flex items-start gap-3">
                                        <span className="text-success mt-1">✅</span>
                                        <span className="text-sm font-medium leading-relaxed">Access all public lessons anytime</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-success mt-1">✅</span>
                                        <span className="text-sm font-medium leading-relaxed">Create and manage up to 5 lessons</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-success mt-1">✅</span>
                                        <span className="text-sm font-medium leading-relaxed">Join the global wisdom community</span>
                                    </li>
                                </ul>
                            </div>
                            <button className="btn btn-ghost btn-outline w-full rounded-2xl border-2 font-bold opacity-50" disabled>Current Plan</button>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="card bg-base-100 shadow-2xl border-[3px] border-primary scale-105 rounded-[2.5rem] relative overflow-hidden group/premium">
                        <div className="absolute top-0 right-0 bg-primary text-primary-content px-6 py-2 rounded-bl-[1.5rem] font-black text-[10px] tracking-widest uppercase z-10 shadow-lg">
                            RECOMMENDED
                        </div>
                        <div className="card-body items-center text-center p-10 flex flex-col justify-between">
                            <div>
                                <h2 className="card-title text-3xl font-black text-primary mb-2">Premium Lifetime</h2>
                                <div className="flex items-baseline justify-center gap-1 my-8">
                                    <span className="text-7xl font-black text-primary tracking-tighter">$15</span>
                                    <span className="text-base-content/40 font-medium">/one-time</span>
                                </div>
                                <ul className="text-left space-y-5 mb-10">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 text-xl animate-pulse">✨</span>
                                        <span className="font-bold text-base-content/80 leading-relaxed uppercase tracking-tight text-sm">Unlimited </span>
                                        <span className="text-sm text-base-content/60 leading-relaxed -ml-2">lesson creation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 text-xl">✨</span>
                                        <span className="font-bold text-base-content/80 leading-relaxed uppercase tracking-tight text-sm">Full Access </span>
                                        <span className="text-sm text-base-content/60 leading-relaxed -ml-2">to premium content</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 text-xl">✨</span>
                                        <span className="font-bold text-base-content/80 leading-relaxed uppercase tracking-tight text-sm">Official </span>
                                        <span className="text-sm text-base-content/60 leading-relaxed -ml-2">Premium Badge</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 text-xl">✨</span>
                                        <span className="font-bold text-base-content/80 leading-relaxed uppercase tracking-tight text-sm">Priority </span>
                                        <span className="text-sm text-base-content/60 leading-relaxed -ml-2">Community Support</span>
                                    </li>
                                </ul>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="btn border-none w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl shadow-primary/40 hover:shadow-primary/60 rounded-2xl text-white font-black text-lg py-4 h-auto transform hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider"
                            >
                                Get Premium Access
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
