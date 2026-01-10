import { useEffect, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaRocket, FaGem } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import Lottie from 'lottie-react';
import confettiAnimation from '../../assets/confetti.json';
import LessonCard from '../../components/LessonCard';

const Success = () => {
    const { user, loading, refetchUser, userData } = useContext(AuthContext);
    const [premiumLessons, setPremiumLessons] = useState([]);
    const [loadingLessons, setLoadingLessons] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/dashboard';

    useEffect(() => {
        if (loading) return;

        const verifyPayment = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                await axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Refresh the global user data to show Premium badge immediately
                refetchUser();

                // Redirect after a short delay to let them see the success message
                setTimeout(() => {
                    navigate(redirectUrl);
                }, 5000);
            } catch (error) {
                console.error('Payment verification failed:', error);
            }
        };

        const fetchPremiumLessons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons?category=&search=&emotionalTone=&page=1&limit=3`);
                // Filter only premium ones if the API returns mixed (though usually we'd want a specific endpoint)
                const lessons = response.data.lessons.filter(l => l.accessLevel === 'premium');
                setPremiumLessons(lessons);
            } catch (error) {
                console.error('Error fetching showcase lessons:', error);
            } finally {
                setLoadingLessons(false);
            }
        };

        verifyPayment();
        fetchPremiumLessons();
    }, [user, loading, refetchUser, navigate, redirectUrl]);

    return (
        <div className="min-h-screen bg-base-100 pb-20 relative overflow-hidden">
            {/* Celebration Animation */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <Lottie
                    animationData={confettiAnimation}
                    loop={false}
                    className="w-full h-full"
                />
            </div>

            <div className="container mx-auto px-6 py-16 lg:py-24 space-y-24">
                {/* Success Message Header */}
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-success/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner shadow-success/20 animate-bounce-slow">
                            <FaCheckCircle className="text-6xl text-success" />
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl animate-pulse">
                            <FaGem className="text-xl" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl lg:text-8xl font-black tracking-tightest">
                            <span className="text-success">ACCESS</span> GRANTED
                        </h1>
                        <p className="text-2xl text-base-content/60 max-w-2xl mx-auto font-medium leading-relaxed">
                            Welcome to the elite collective. Your <span className="text-secondary font-black">PREMIUM ETERNAL</span> membership is now active. The full legacy of human wisdom is now yours to explore.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to={redirectUrl} className="btn btn-neutral btn-lg h-[72px] rounded-3xl px-12 font-black text-xl shadow-2xl transition-all hover:scale-105">
                                RETURN TO EXPERIENCE
                            </Link>
                            <Link to="/lessons" className="btn btn-primary btn-lg h-[72px] rounded-3xl px-12 font-black text-xl shadow-2xl shadow-primary/20 transition-all hover:scale-105">
                                EXPLORE ALL LESSONS
                            </Link>
                        </div>
                        <p className="text-base-content/30 font-bold tracking-widest uppercase text-xs animate-pulse">
                            Redirecting you in 5 seconds...
                        </p>
                    </div>
                </div>

                {/* Immediate Value Showcase */}
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-content/5 pb-10">
                        <div>
                            <h2 className="text-4xl font-black mb-2 tracking-tight">Unlocked Excellence</h2>
                            <p className="text-xl text-base-content/40 font-medium italic">Start your premium journey with these immediate insights.</p>
                        </div>
                        <div className="flex items-center gap-4 text-secondary font-black tracking-widest uppercase text-xs">
                            <FaRocket /> NOW UNLOCKED FOR YOU
                        </div>
                    </div>

                    {loadingLessons ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[400px] bg-base-200/50 rounded-[2.5rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {premiumLessons.length > 0 ? (
                                premiumLessons.map(lesson => (
                                    <div key={lesson._id} className="transform hover:scale-105 transition-transform duration-500">
                                        <LessonCard lesson={lesson} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 bg-base-200/20 rounded-[3rem] text-center border-2 border-dashed border-base-200">
                                    <p className="text-base-content/30 font-black tracking-widest uppercase">Fetching Exclusive Content...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Success;
