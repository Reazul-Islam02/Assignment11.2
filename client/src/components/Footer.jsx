import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-1 text-3xl font-black mb-6">
                            <span className="text-primary italic">Digital Life</span>
                            <span className="text-secondary">Lessons</span>
                        </div>
                        <p className="opacity-70 leading-relaxed mb-8 max-w-xs">
                            Preserving the world's collective wisdom, one lesson at a time. Join our community of sharers and learners.
                        </p>
                        <div className="flex gap-4 text-xl">
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors"><FaTwitter /></a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors"><FaFacebook /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors"><FaLinkedin /></a>
                            <a href="https://github.com/Reazul-Islam02" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors"><FaGithub /></a>
                        </div>
                    </div>

                    {/* Links Group 1 */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Platform</h4>
                        <ul className="space-y-4 opacity-70">
                            <li><Link to="/lessons" className="hover:text-primary hover:opacity-100 transition-all font-medium">Browse Lessons</Link></li>
                            <li><Link to="/dashboard/add-lesson" className="hover:text-primary hover:opacity-100 transition-all font-medium">Share Wisdom</Link></li>
                            <li><Link to="/payment" className="hover:text-primary hover:opacity-100 transition-all font-medium">Premium Access</Link></li>
                            <li><Link to="/dashboard/my-favorites" className="hover:text-primary hover:opacity-100 transition-all font-medium">My Favorites</Link></li>
                        </ul>
                    </div>

                    {/* Links Group 2 */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Member Space</h4>
                        <ul className="space-y-4 opacity-70">
                            <li><Link to="/dashboard" className="hover:text-primary hover:opacity-100 transition-all font-medium">Dashboard</Link></li>
                            <li><Link to="/dashboard/my-lessons" className="hover:text-primary hover:opacity-100 transition-all font-medium">My Lessons</Link></li>
                            <li><Link to="/dashboard/profile" className="hover:text-primary hover:opacity-100 transition-all font-medium">My Profile</Link></li>
                        </ul>
                    </div>

                    {/* Links Group 3 */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Legal</h4>
                        <ul className="space-y-4 opacity-70">
                            <li><Link to="#" className="hover:text-primary hover:opacity-100 transition-all font-medium">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-primary hover:opacity-100 transition-all font-medium">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-primary hover:opacity-100 transition-all font-medium">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="divider opacity-10"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8 opacity-50 text-sm font-medium">
                    <p>© {new Date().getFullYear()} Digital Life Lessons Ltd. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span>Built for the future.</span>
                        <span>Designed with passion.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
