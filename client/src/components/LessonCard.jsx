import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

const LessonCard = ({ lesson }) => {
    const { user, userData, refetchUser } = useContext(AuthContext);
    const isPremium = lesson.accessLevel === 'premium';
    const canAccess = !isPremium || userData?.isPremium || userData?.role === 'admin';
    const isFavorite = userData?.favorites?.includes(lesson._id);

    const handleFavorite = async (e) => {
        e.preventDefault();
        if (!user) {
            return toast.error('Please login to save favorites');
        }
        try {
            const token = await auth.currentUser.getIdToken();
            await axios.put(`${import.meta.env.VITE_API_URL}/users/favorites/${user.email}`,
                { lessonId: lesson._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            refetchUser();
            toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className={`group relative card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 rounded-[2.5rem] overflow-hidden border-2 ${isPremium ? 'border-primary/20 shadow-primary/5' : 'border-base-200/50'}`}>
            <figure className="h-64 overflow-hidden relative">
                <img
                    src={lesson.imageURL || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1673&auto=format&fit=crop'}
                    alt={lesson.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${!canAccess ? 'blur-2xl brightness-[0.4] contrast-125' : ''}`}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                    <p className="text-white text-sm font-black tracking-widest uppercase animate-slide-up">Tap to Immerse</p>
                </div>

                {isPremium && (
                    <div className="absolute top-5 right-5 z-20">
                        <div className="badge badge-secondary p-4 font-black text-[10px] tracking-widest rounded-2xl shadow-2xl animate-pulse">
                            PREMIUM ⭐
                        </div>
                    </div>
                )}

                {!canAccess && isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
                        <div className="bg-black/40 backdrop-blur-xl p-5 rounded-[2rem] border border-white/20 shadow-2xl transform group-hover:scale-110 transition-transform duration-700">
                            <p className="text-white font-black text-xs uppercase tracking-[0.2em] mb-1 opacity-70">Exclusive Access</p>
                            <p className="text-white font-black text-lg uppercase tracking-tight">LOCKED CONTENT</p>
                        </div>
                    </div>
                )}

                <div className="absolute top-5 left-5 flex gap-2 z-20">
                    <div className="badge badge-primary bg-primary border-none text-white p-3 font-black text-[9px] tracking-widest rounded-xl uppercase">
                        {lesson.category}
                    </div>
                </div>

                <button
                    onClick={handleFavorite}
                    className={`absolute bottom-5 right-5 z-30 btn btn-circle btn-md shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-90 ${isFavorite ? 'btn-error' : 'bg-base-100/40 backdrop-blur-xl border-white/20 hover:bg-white text-white hover:text-error'}`}
                >
                    {isFavorite ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                </button>
            </figure>

            <div className="card-body p-8 flex flex-col items-start gap-4">
                <h2 className="card-title text-2xl font-black leading-tight tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 text-base-content">
                    {lesson.title}
                </h2>

                <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-white tracking-widest bg-secondary px-3 py-1.5 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {lesson.emotionalTone}
                    </span>
                </div>

                <p className="text-base text-base-content/70 line-clamp-3 font-medium leading-[1.6]">
                    {lesson.description}
                </p>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-base-content/10 to-transparent my-2"></div>

                <div className="flex items-center justify-between w-full mt-auto">
                    <div className="flex items-center gap-4">
                        <div className="avatar ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 rounded-2xl">
                            <div className="w-11 rounded-2xl">
                                {lesson.creatorPhoto ? (
                                    <img src={lesson.creatorPhoto} alt={lesson.creatorName} />
                                ) : (
                                    <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center font-black">
                                        {lesson.creatorName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-base-content tracking-tight">{lesson.creatorName === 'System Admin' ? 'ANM Reazul Islam' : lesson.creatorName}</span>
                            <span className="text-[10px] font-black text-base-content/40 mt-0.5 tracking-wider uppercase">{new Date(lesson.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="card-actions">
                        {canAccess ? (
                            <Link to={`/lessons/${lesson._id}`} className="btn btn-primary rounded-2xl px-8 font-black text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-x-1 transition-all h-12 min-h-0">
                                View
                            </Link>
                        ) : (
                            <Link to={`/payment?redirect=${window.location.pathname}`} className="btn btn-secondary rounded-2xl px-6 font-black text-white h-12 min-h-0 shadow-lg animate-pulse border-none hover:scale-105 transition-transform">
                                UNLOCK
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonCard;
