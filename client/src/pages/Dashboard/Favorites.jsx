import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { auth } from '../../firebase';
import LessonCard from '../../components/LessonCard';
import toast from 'react-hot-toast';

const Favorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user?.email) return;
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/favorites/${user.email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavorites(response.data);
            } catch (error) {
                console.error(error);
                // toast.error('Failed to load favorites'); // Suppress if just empty
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [user]);

    if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-error to-pink-500">
                    Your Wisdom Collection
                </h2>
                <p className="text-base-content/60 max-w-xl mx-auto font-medium">
                    A curated space for the lessons that resonated with you the most. Revisit these insights whenever you need a boost.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
                    <div className="text-7xl mb-6 opacity-20">💝</div>
                    <h3 className="text-2xl font-bold mb-2">Your collection is empty</h3>
                    <p className="text-base-content/50 max-w-sm mx-auto mb-8">
                        Explore the library and favorite lessons that touch your heart to see them here.
                    </p>
                    <Link to="/lessons" className="btn btn-primary rounded-2xl px-12 shadow-xl shadow-primary/20">
                        Explore Library
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map(lesson => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
