import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { auth } from '../../firebase';

const EditLesson = () => {
    const { id } = useParams();
    const { user, userData } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
                setLesson(response.data);

                // Security check: only allow owner or admin to edit
                // In a production app, this should be enforced on the backend too.
                // Since this is a scaffolded project, we'll do a basic check here.
                if (response.data.creatorEmail !== user?.email && userData?.role !== 'admin') {
                    toast.error("You don't have permission to edit this lesson");
                    navigate('/dashboard/my-lessons');
                }
            } catch (error) {
                console.error('Error fetching lesson:', error);
                toast.error('Failed to load lesson for editing');
            } finally {
                setLoading(false);
            }
        };
        if (user?.email) fetchLesson();
    }, [id, user, userData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            emotionalTone: form.emotionalTone.value,
            imageURL: form.imageURL.value,
            visibility: form.visibility.value,
            accessLevel: form.accessLevel.value,
        };

        try {
            const token = await auth.currentUser.getIdToken();
            await axios.put(`${import.meta.env.VITE_API_URL}/lessons/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Lesson updated successfully!');
            navigate('/dashboard/my-lessons');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update lesson');
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-primary font-medium">Loading your wisdom...</p>
        </div>
    );

    if (!lesson) return <div className="text-center py-20">Lesson not found</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-black mb-4 text-primary">Refine Your Wisdom</h2>
                <p className="text-base-content/60 max-w-xl mx-auto">Update your lesson to better reflect your growth and insights. Every story can be improved.</p>
            </div>

            <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-[2.5rem] overflow-hidden">
                <div className="card-body p-8 lg:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Core Info */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">01</div>
                                <h3 className="text-xl font-bold">The Essence</h3>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Catchy Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={lesson.title}
                                    placeholder="e.g., The Stoic Way to Modern Peace"
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-primary/10 transition-all font-medium py-6"
                                    required
                                />
                            </div>

                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Deep Narrative</span>
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={lesson.description}
                                    placeholder="What's the core of your lesson?..."
                                    className="textarea textarea-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-primary/10 transition-all font-medium h-48 py-4"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Section 2: Categorization */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold">02</div>
                                <h3 className="text-xl font-bold">Context & Mood</h3>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Category</span>
                                </label>
                                <select name="category" className="select select-bordered w-full rounded-2xl border-2 font-medium" defaultValue={lesson.category}>
                                    <option>Personal Growth</option>
                                    <option>Spirituality</option>
                                    <option>Relationships</option>
                                    <option>Career</option>
                                    <option>Health</option>
                                    <option>Lifestyle</option>
                                    <option>Travel</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Emotional Tone</span>
                                </label>
                                <select name="emotionalTone" className="select select-bordered w-full rounded-2xl border-2 font-medium" defaultValue={lesson.emotionalTone}>
                                    <option>Inspirational</option>
                                    <option>Reflective</option>
                                    <option>Humorous</option>
                                    <option>Sad</option>
                                    <option>Motivational</option>
                                    <option>Regretful</option>
                                    <option>Serious</option>
                                    <option>Calm</option>
                                </select>
                            </div>
                        </div>

                        {/* Section 3: Visuals & Access */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold">03</div>
                                <h3 className="text-xl font-bold">Delivery & Access</h3>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Cover Image URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="imageURL"
                                    defaultValue={lesson.imageURL}
                                    className="input input-bordered w-full rounded-2xl border-2 focus:ring-4 focus:ring-primary/10 transition-all font-medium py-6"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-70">Visibility</span>
                                    </label>
                                    <select name="visibility" className="select select-bordered w-full rounded-2xl border-2 font-medium" defaultValue={lesson.visibility}>
                                        <option value="public">Public (Everyone)</option>
                                        <option value="private">Private (Only Me)</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-70">Access Tier</span>
                                    </label>
                                    <select name="accessLevel" className="select select-bordered w-full rounded-2xl border-2 font-medium" defaultValue={lesson.accessLevel}>
                                        <option value="free">Free for All</option>
                                        <option value="premium">Premium Only ⭐</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-control mt-12 flex flex-col sm:flex-row gap-4">
                            <button type="submit" className="btn btn-primary btn-lg rounded-2xl font-black shadow-xl shadow-primary/20 group flex-1">
                                Save Improvements
                                <span className="ml-2 group-hover:scale-125 transition-transform">✅</span>
                            </button>
                            <button type="button" onClick={() => navigate('/dashboard/my-lessons')} className="btn btn-ghost btn-lg rounded-2xl font-bold border-2 border-base-300">
                                Discard Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditLesson;
