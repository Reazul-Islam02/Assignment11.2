import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { auth } from '../firebase';
import { FaHeart, FaRegHeart, FaArrowLeft, FaGem, FaUser, FaCalendarAlt, FaTag } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LessonDetails = () => {
    const { id } = useParams();
    const { user, userData } = useContext(AuthContext);
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
                setLesson(response.data);

                // Check if favorite
                if (userData?.favorites?.includes(id)) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error('Error fetching lesson:', error);
                toast.error('Failed to load lesson details');
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id, userData]);

    const handleFavorite = async () => {
        if (!user) {
            toast.error('Please login to favorite lessons');
            return navigate('/login');
        }

        try {
            const token = await auth.currentUser.getIdToken();
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/favorites/${user.email}`, {
                lessonId: id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsFavorite(!isFavorite);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Something went wrong');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-primary font-medium">Unlocking wisdom...</p>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Lesson not found</h2>
                <Link to="/lessons" className="btn btn-primary">Back to Library</Link>
            </div>
        );
    }

    const canAccess = lesson.accessLevel === 'free' || userData?.isPremium;

    return (
        <div className="min-h-screen bg-base-100 pb-32">
            {/* Cinematic Header / Banner */}
            <div className="relative h-[60vh] lg:h-[75vh] min-h-[500px] overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <img
                        src={lesson.imageURL || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1673&auto=format&fit=crop'}
                        alt={lesson.title}
                        className={`w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[3000ms] ${!canAccess ? 'blur-2xl brightness-50' : 'brightness-75'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                <div className="absolute top-10 left-10 lg:left-20 z-20">
                    <button onClick={() => navigate(-1)} className="btn btn-circle btn-lg bg-base-100/20 backdrop-blur-2xl border-white/10 hover:bg-white text-white hover:text-primary transition-all duration-500 shadow-2xl">
                        <FaArrowLeft />
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-10 lg:p-20 z-10">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap gap-4 mb-8 animate-in slide-in-from-bottom-10 duration-700">
                            <span className="badge badge-primary bg-primary/20 backdrop-blur-md border-none text-primary px-6 py-4 h-auto rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-xl">{lesson.category}</span>
                            <span className="badge badge-secondary bg-secondary/20 backdrop-blur-md border-none text-secondary px-6 py-4 h-auto rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-xl">{lesson.emotionalTone}</span>
                            {lesson.accessLevel === 'premium' && (
                                <span className="badge bg-amber-500/20 backdrop-blur-md border-none text-amber-500 px-6 py-4 h-auto rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-xl flex gap-3">
                                    <FaGem className="animate-pulse" /> ETERNAL ACCESS
                                </span>
                            )}
                        </div>
                        <h1 className="text-6xl lg:text-[120px] font-black mb-6 leading-[0.85] tracking-tightest text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-20 duration-[1000ms]">
                            {lesson.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 lg:px-20 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        <div className="bg-base-100/80 backdrop-blur-3xl shadow-3xl rounded-[4rem] p-10 lg:p-20 border border-base-200/50 relative">
                            {/* Favorite Button Floating */}
                            <div className="absolute top-10 right-10">
                                <button
                                    onClick={handleFavorite}
                                    className={`btn btn-circle btn-lg h-20 w-20 shadow-3xl shadow-error/20 border-none transition-all duration-700 transform hover:scale-110 active:scale-95 ${isFavorite ? 'bg-error text-white' : 'bg-base-200/50 hover:bg-error/10 text-error'}`}
                                >
                                    {isFavorite ? <FaHeart size={32} /> : <FaRegHeart size={32} />}
                                </button>
                            </div>

                            {!canAccess ? (
                                <div className="py-20 text-center space-y-10 animate-in zoom-in duration-1000">
                                    <div className="w-32 h-32 bg-secondary/10 rounded-[2.5rem] flex items-center justify-center mx-auto text-secondary text-6xl shadow-inner shadow-secondary/20 animate-bounce-slow">
                                        <FaGem />
                                    </div>
                                    <div>
                                        <h2 className="text-5xl font-black mb-6 tracking-tight text-white drop-shadow-xl">Locked Wisdom</h2>
                                        <p className="text-xl text-white/70 max-w-xl mx-auto font-medium leading-[1.8] drop-shadow-md">
                                            This lesson contains deep realizations reserved for the collective inner circle. Upgrade to Premium to unlock this experience and thousands of other life-changing stories.
                                        </p>
                                    </div>
                                    <Link to={`/payment?redirect=/lessons/${id}`} className="btn btn-secondary btn-lg h-[80px] rounded-3xl px-16 shadow-2xl shadow-secondary/40 font-black text-xl hover:translate-y-[-4px] transition-all duration-500 scale-110">
                                        UPGRADE TO PREMIUM
                                    </Link>
                                </div>
                            ) : (
                                <div className="animate-in fade-in duration-[1500ms]">
                                    <div className="flex items-center gap-6 mb-16">
                                        <div className="avatar">
                                            <div className="w-20 rounded-[1.8rem] shadow-2xl ring-4 ring-primary/20 ring-offset-4 ring-offset-base-100">
                                                <img src={lesson.creatorPhoto || `https://ui-avatars.com/api/?name=${lesson.creatorName}&background=random&size=256`} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.4em] mb-1">CUSTODIAN OF WISDOM</p>
                                            <h4 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/50 truncate">
                                                {lesson.creatorName === 'System Admin' ? 'ANM Reazul Islam' : lesson.creatorName}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="relative group/text">
                                        <span className="absolute -left-10 top-0 text-9xl text-primary font-serif opacity-10 group-hover:opacity-20 transition-opacity">“</span>
                                        <div className="lesson-content py-10 text-2xl lg:text-3xl leading-[1.8] text-base-content/80 whitespace-pre-wrap font-serif italic tracking-tight">
                                            {lesson.description}
                                        </div>
                                        <span className="absolute -right-4 bottom-0 text-9xl text-secondary font-serif opacity-10 group-hover:opacity-20 transition-opacity self-end mt-10 ml-auto block text-right">”</span>
                                    </div>

                                    <div className="mt-20 flex flex-wrap gap-12 text-sm font-black opacity-40 hover:opacity-100 transition-opacity duration-1000">
                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-primary text-lg" />
                                            <span className="uppercase tracking-widest">{new Date(lesson.createdAt).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaTag className="text-secondary text-lg" />
                                            <span className="uppercase tracking-widest">{lesson.visibility} ARCHIVE ACCESS</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Interaction */}
                        {canAccess && (
                            <div className="bg-primary text-primary-content p-16 lg:p-24 rounded-[4rem] shadow-3xl relative overflow-hidden group/cta">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-[2000ms]"></div>
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-[2000ms]"></div>

                                <div className="relative z-10">
                                    <h3 className="text-5xl lg:text-7xl font-black mb-8 leading-none tracking-tightest max-w-2xl">Did this echo <br /><span className="text-white/40 italic">in your heart?</span></h3>
                                    <p className="text-2xl opacity-80 mb-12 max-w-2xl font-medium leading-relaxed">
                                        Human wisdom grows when shared. Take a moment to distill your own experiences into a legacy for others.
                                    </p>
                                    <Link to="/dashboard/add-lesson" className="btn bg-white text-primary btn-lg h-[72px] rounded-3xl px-12 border-none font-black text-xl hover:bg-white/90 transform hover:-translate-y-2 transition-all duration-300">
                                        SHARE YOUR JOURNEY
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block space-y-12">
                        <div className="bg-base-100/50 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-base-200/50 sticky top-40 transition-all hover:shadow-primary/5">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-primary">The Collective Philosophy</h3>
                            <ul className="space-y-10">
                                <li className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                        <FaUser className="text-lg" />
                                    </div>
                                    <p className="text-sm font-bold text-base-content/60 leading-relaxed group-hover:text-base-content transition-colors">Authentic voices shared by humanity, for humanity.</p>
                                </li>
                                <li className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                        <FaTag className="text-lg" />
                                    </div>
                                    <p className="text-sm font-bold text-base-content/60 leading-relaxed group-hover:text-base-content transition-colors">Precisely architected domains of wisdom.</p>
                                </li>
                                <li className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                        <FaGem className="text-lg" />
                                    </div>
                                    <p className="text-sm font-bold text-base-content/60 leading-relaxed group-hover:text-base-content transition-colors">Premium insights for the dedicated path of growth.</p>
                                </li>
                            </ul>

                            <div className="mt-16 pt-10 border-t border-base-content/5">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-6">WISDOM GUARDIANS</h4>
                                <div className="flex justify-center">
                                    <div className="avatar-group -space-x-8">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="avatar border-4 border-base-100 hover:z-50 transition-all hover:-translate-y-2">
                                                <div className="w-14"><img src={`https://i.pravatar.cc/150?u=${i + 10}`} /></div>
                                            </div>
                                        ))}
                                        <div className="avatar placeholder border-4 border-base-100">
                                            <div className="bg-neutral text-neutral-content w-14 font-black text-xs uppercase"><span>+9k</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonDetails;
