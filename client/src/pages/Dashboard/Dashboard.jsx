import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FaPlus, FaBook, FaStar, FaCrown, FaGem, FaRocket, FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';
import LessonCard from '../../components/LessonCard';

const Dashboard = () => {
    const { userData } = useContext(AuthContext);
    const [premiumShowcase, setPremiumShowcase] = useState([]);
    const [loadingShowcase, setLoadingShowcase] = useState(true);

    useEffect(() => {
        const fetchShowcase = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons?page=1&limit=3`);
                const lessons = response.data.lessons.filter(l => l.accessLevel === 'premium');
                setPremiumShowcase(lessons);
            } catch (error) {
                console.error("Error fetching dashboard showcase:", error);
            } finally {
                setLoadingShowcase(false);
            }
        };

        if (userData?.isPremium) {
            fetchShowcase();
        }
    }, [userData?.isPremium]);

    const stats = [
        {
            label: 'Archive Contributions',
            value: userData?.createdLessons || 0,
            icon: <FaBook className="text-primary" />,
            color: 'bg-primary/10'
        },
        {
            label: 'Saved Wisdom',
            value: userData?.favorites?.length || 0,
            icon: <FaStar className="text-secondary" />,
            color: 'bg-secondary/10'
        },
        {
            label: 'Membership Tier',
            value: userData?.isPremium ? 'ETERNAL' : 'JOURNEYMAN',
            icon: <FaCrown className={userData?.isPremium ? 'text-amber-500' : 'text-gray-400'} />,
            color: userData?.isPremium ? 'bg-amber-500/10' : 'bg-gray-100'
        }
    ];

    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            {/* Conditional Premium Header */}
            {userData?.isPremium ? (
                <div className="relative overflow-hidden rounded-[3rem] bg-neutral text-neutral-content p-12 lg:p-20 shadow-3xl group">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-[3000ms]"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-[3000ms]"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-amber-500/20 rounded-[1.8rem] flex items-center justify-center text-amber-500 shadow-inner shadow-amber-500/20 animate-pulse">
                                <FaGem className="text-4xl" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.4em] opacity-50 mb-1">PREMIUM ACCESS VERIFIED</p>
                                <h1 className="text-5xl lg:text-7xl font-black tracking-tightest leading-none">THE ETERNAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">ARCHIVE</span></h1>
                            </div>
                        </div>
                        <p className="text-xl lg:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed">
                            Welcome, <span className="text-white font-black">{userData?.name}</span>. Your consciousness is now globally synchronized with every fragment of wisdom in the archive.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/dashboard/add-lesson" className="btn btn-primary bg-amber-500 hover:bg-amber-600 border-none btn-lg rounded-2xl px-10 font-black text-xs tracking-widest uppercase">
                                <FaPlus /> ADD NEW LESSON
                            </Link>
                            <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest">
                                <FaShieldAlt className="text-amber-500" /> PROTECTED BY INNER CIRCLE
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <header className="space-y-4">
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tightest">Welcome back, <span className="text-primary">{userData?.name || 'User'}</span>!</h1>
                    <p className="text-xl text-base-content/60 font-medium">Your journeyman path is evolving. Continue documenting your legacy.</p>
                </header>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="card bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition-all duration-500 group rounded-[2.5rem]">
                        <div className="card-body flex-row items-center gap-6 p-8">
                            <div className={`p-5 rounded-[1.5rem] ${stat.color} text-3xl group-hover:scale-110 transition-transform duration-500`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-base-content/30 uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                                <p className="text-4xl font-black tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Display: Premium Showcase vs Standard CTA */}
            {userData?.isPremium ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500 pt-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-content/5 pb-10">
                        <div>
                            <h2 className="text-4xl font-black mb-2 tracking-tight">Eternal Insights</h2>
                            <p className="text-xl text-base-content/40 font-medium italic">Premium content curated for your status.</p>
                        </div>
                        <div className="flex items-center gap-4 text-amber-500 font-black tracking-widest uppercase text-xs">
                            <FaRocket className="animate-bounce" /> ELITE ARCHIVE ACCESS ACTIVE
                        </div>
                    </div>

                    {loadingShowcase ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[400px] bg-base-200/50 rounded-[2.5rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {premiumShowcase.map(lesson => (
                                <LessonCard key={lesson._id} lesson={lesson} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-br from-primary via-primary-focus to-secondary text-primary-content p-12 lg:p-20 rounded-[4rem] shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                        <div className="space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-3 px-5 py-2 bg-black/20 rounded-full text-xs font-black tracking-[0.3em] uppercase">
                                <FaCrown className="text-amber-500" /> EVOLVE YOUR LEGACY
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-black leading-none tracking-tightest">UNLIMITED <br /> CONSCIOUSNESS</h2>
                            <p className="text-xl lg:text-2xl text-white/80 font-medium leading-relaxed">
                                Join the elite collective. Unlock high-dimensional wisdom and contribute infinitely to the global archive.
                            </p>
                        </div>
                        <Link to="/payment?redirect=/dashboard" className="btn bg-white text-primary btn-lg h-[80px] rounded-3xl px-12 border-none font-black text-xl hover:bg-neutral hover:text-white transform hover:-translate-y-2 transition-all duration-300 shadow-2xl">
                            GO PREMIUM NOW
                        </Link>
                    </div>
                </div>
            )}

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-base-100 border border-base-200 shadow-xl rounded-[2.5rem] overflow-hidden group">
                    <div className="card-body p-10">
                        <div className="flex items-center gap-6 mb-8 text-primary">
                            <div className="w-16 h-16 rounded-[1.2rem] bg-primary/10 flex items-center justify-center text-3xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                <FaBook />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-base-content">Archives Control</h2>
                        </div>
                        <p className="text-lg text-base-content/60 font-medium mb-10 leading-relaxed">Master your documented wisdom. View, distill, or refine your existing life lessons.</p>
                        <div className="card-actions justify-end">
                            <Link to="/dashboard/my-lessons" className="btn btn-ghost hover:bg-primary/10 hover:text-primary rounded-2xl px-10 font-black h-16 min-h-0 border-2 border-primary/20">
                                MANAGE MY ARCHIVES
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-200 shadow-xl rounded-[2.5rem] overflow-hidden group">
                    <div className="card-body p-10">
                        <div className="flex items-center gap-6 mb-8 text-secondary">
                            <div className="w-16 h-16 rounded-[1.2rem] bg-secondary/10 flex items-center justify-center text-3xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                <FaStar />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-base-content">Universal Favorites</h2>
                        </div>
                        <p className="text-lg text-base-content/60 font-medium mb-10 leading-relaxed">Your curated constellation of insights. Revisit the wisdom that resonates most profoundly.</p>
                        <div className="card-actions justify-end">
                            <Link to="/dashboard/my-favorites" className="btn btn-ghost hover:bg-secondary/10 hover:text-secondary rounded-2xl px-10 font-black h-16 min-h-0 border-2 border-secondary/20">
                                OPEN VAULT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
