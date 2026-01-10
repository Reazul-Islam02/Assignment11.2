import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus, FaEye } from 'react-icons/fa';

const MyLessons = () => {
    const { user } = useContext(AuthContext);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyLessons = async () => {
            if (!user?.email) return;
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/my-lessons/${user.email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLessons(response.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load lessons');
            } finally {
                setLoading(false);
            }
        };
        fetchMyLessons();
    }, [user]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this lesson?')) return;
        try {
            const token = await auth.currentUser.getIdToken();
            await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLessons(lessons.filter(lesson => lesson._id !== id));
            toast.success('Lesson deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete lesson');
        }
    };

    if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl lg:text-5xl font-black mb-2 text-primary">My Wisdom Vault</h2>
                    <p className="text-base-content/60 font-medium">Manage and monitor the impact of your shared lessons.</p>
                </div>
                <Link to="/dashboard/add-lesson" className="btn btn-primary rounded-2xl px-8 shadow-xl shadow-primary/20 gap-2 h-auto py-4">
                    <FaPlus /> New Lesson
                </Link>
            </div>

            {lessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
                    <div className="text-7xl mb-6 opacity-20">📜</div>
                    <h3 className="text-2xl font-bold mb-2">No lessons published yet</h3>
                    <p className="text-base-content/50 max-w-sm mx-auto mb-8">
                        The world is waiting for your story. Start by creating your very first life lesson.
                    </p>
                    <Link to="/dashboard/add-lesson" className="btn btn-primary rounded-2xl px-12 shadow-xl shadow-primary/20">
                        Begin Your Legacy
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100/50 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border border-base-200">
                    <table className="table table-lg">
                        <thead className="bg-base-200/50">
                            <tr className="text-base-content/70">
                                <th className="rounded-tl-[2.5rem] pl-8">Lesson</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Access</th>
                                <th className="rounded-tr-[2.5rem] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map(lesson => (
                                <tr key={lesson._id} className="hover:bg-base-200/30 transition-colors">
                                    <td className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={lesson.imageURL || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=100&auto=format&fit=crop'} alt={lesson.title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg line-clamp-1">{lesson.title}</div>
                                                <div className="text-xs opacity-50 font-bold uppercase tracking-wider">{new Date(lesson.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost border-primary/20 text-primary font-bold px-4 py-3 h-auto rounded-xl">{lesson.category}</span>
                                    </td>
                                    <td>
                                        <div className={`badge ${lesson.visibility === 'public' ? 'badge-success/10 text-success' : 'badge-ghost'} font-black gap-2 p-3 h-auto border-none`}>
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${lesson.visibility === 'public' ? 'bg-success' : 'bg-gray-400'}`}></div>
                                            {lesson.visibility}
                                        </div>
                                    </td>
                                    <td>
                                        {lesson.accessLevel === 'premium' ? (
                                            <span className="flex items-center gap-2 text-secondary font-black bg-secondary/10 px-3 py-1 rounded-lg w-fit">
                                                ⭐ Premium
                                            </span>
                                        ) : (
                                            <span className="opacity-40 font-bold">Free</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-3">
                                            <Link to={`/lessons/${lesson._id}`} className="btn btn-square btn-ghost btn-sm hover:text-primary transition-colors">
                                                <FaEye size={18} />
                                            </Link>
                                            <Link to={`/dashboard/edit-lesson/${lesson._id}`} className="btn btn-square btn-ghost btn-sm hover:text-info transition-colors">
                                                <FaEdit size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(lesson._id)} className="btn btn-square btn-ghost btn-sm hover:text-error transition-colors">
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyLessons;
