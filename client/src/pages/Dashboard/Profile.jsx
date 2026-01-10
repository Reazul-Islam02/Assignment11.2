import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaGithub, FaLinkedin, FaFacebook, FaGlobe, FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

const Profile = () => {
    const { user, userData, setUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        photoURL: '',
        bio: '',
        socialLinks: {
            github: '',
            linkedin: '',
            facebook: '',
            website: ''
        }
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                photoURL: userData.photoURL || '',
                bio: userData.bio || '',
                socialLinks: {
                    github: userData.socialLinks?.github || '',
                    linkedin: userData.socialLinks?.linkedin || '',
                    facebook: userData.socialLinks?.facebook || '',
                    website: userData.socialLinks?.website || ''
                }
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const platform = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [platform]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!user) {
            toast.error('Please login to update profile');
            setLoading(false);
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/profile/${user.email}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row items-center gap-6 bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm">
                <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full">
                    <div className="w-24 md:w-32 rounded-full">
                        <img src={formData.photoURL || 'https://via.placeholder.com/150'} alt="Profile" />
                    </div>
                </div>
                <div className="text-center md:text-left flex-1">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <h1 className="text-3xl font-bold">{formData.name}</h1>
                        {userData?.isPremium ? (
                            <div className="badge badge-secondary gap-2 p-3 font-semibold shadow-lg">
                                Premium ⭐
                            </div>
                        ) : (
                            <Link to="/payment?redirect=/dashboard/profile" className="btn btn-xs btn-outline btn-secondary rounded-full">
                                Upgrade to Premium
                            </Link>
                        )}
                    </div>
                    <p className="text-base-content/60 flex items-center justify-center md:justify-start gap-2 mt-2">
                        <FaEnvelope className="text-primary" /> {user?.email}
                    </p>
                    {formData.bio && (
                        <p className="mt-4 text-base-content/70 italic max-w-xl">
                            "{formData.bio}"
                        </p>
                    )}
                    <div className="flex gap-4 mt-6 justify-center md:justify-start">
                        {formData.socialLinks.github && (
                            <a href={formData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-ghost btn-sm text-xl">
                                <FaGithub />
                            </a>
                        )}
                        {formData.socialLinks.linkedin && (
                            <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-ghost btn-sm text-xl text-blue-600">
                                <FaLinkedin />
                            </a>
                        )}
                        {formData.socialLinks.facebook && (
                            <a href={formData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-ghost btn-sm text-xl text-blue-800">
                                <FaFacebook />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body gap-6">
                    <h2 className="card-title text-2xl flex items-center gap-2">
                        <FaPen className="text-primary text-sm" /> Edit Profile
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2"><FaUser className="opacity-50" /> Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-200/50"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2"><FaGlobe className="opacity-50" /> Profile Picture URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-200/50"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">About Bio</span>
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered h-32 bg-base-200/50"
                                    placeholder="Tell us a bit about yourself..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Social Links</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2"><FaGithub className="opacity-50" /> GitHub URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="social_github"
                                    value={formData.socialLinks.github}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-200/50"
                                    placeholder="https://github.com/yourusername"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2"><FaLinkedin className="opacity-50" /> LinkedIn URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="social_linkedin"
                                    value={formData.socialLinks.linkedin}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-200/50"
                                    placeholder="https://linkedin.com/in/yourusername"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2"><FaFacebook className="opacity-50" /> Facebook URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="social_facebook"
                                    value={formData.socialLinks.facebook}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-200/50"
                                    placeholder="https://facebook.com/yourusername"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2"><FaGlobe className="opacity-50" /> Personal Website</span>
                                </label>
                                <input
                                    type="text"
                                    name="social_website"
                                    value={formData.socialLinks.website}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-200/50"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-4">
                        <button
                            type="submit"
                            className={`btn btn-primary px-8 ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
