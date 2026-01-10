import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, userData, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-5 py-2 rounded-xl transition-all duration-300 font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'hover:bg-base-200'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/lessons"
                    className={({ isActive }) =>
                        `px-5 py-2 rounded-xl transition-all duration-300 font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'hover:bg-base-200'}`
                    }
                >
                    Lessons
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/dashboard/add-lesson"
                            className={({ isActive }) =>
                                `px-5 py-2 rounded-xl transition-all duration-300 font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'hover:bg-base-200'}`
                            }
                        >
                            Add Lesson
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/my-lessons"
                            className={({ isActive }) =>
                                `px-5 py-2 rounded-xl transition-all duration-300 font-bold tracking-tight ${isActive ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'hover:bg-base-200'}`
                            }
                        >
                            My Lessons
                        </NavLink>
                    </li>
                </>
            )}
            {user && !userData?.isPremium && (
                <li>
                    <NavLink
                        to={`/payment?redirect=${window.location.pathname}`}
                        className="px-5 py-2 rounded-xl font-black text-secondary animate-pulse hover:bg-secondary/10 transition-colors"
                    >
                        Upgrade Premium
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100/70 backdrop-blur-2xl border-b border-base-200/60 transition-all duration-500">
            <div className="navbar container mx-auto px-4 lg:px-8 py-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden rounded-2xl mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-100 rounded-[2rem] w-72 border border-base-200 gap-2 animate-in slide-in-from-top-2 duration-300">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center gap-2 group transition-all duration-500">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            D
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/60">Digital Life</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Lessons</span>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <ThemeToggle />

                    {userData?.isPremium && (
                        <Link to="/dashboard" className="hidden sm:flex badge badge-secondary badge-outline gap-2 px-4 py-4 font-black rounded-xl border-2 animate-in zoom-in duration-500 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-secondary/10">
                            Premium ⭐
                        </Link>
                    )}

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost p-1 h-auto min-h-0 avatar ring ring-primary/10 ring-offset-base-100 rounded-2xl group active:scale-95 transition-all">
                                <div className="w-11 rounded-[1.2rem] overflow-hidden">
                                    {user.photoURL ? (
                                        <img alt="User" src={user.photoURL} />
                                    ) : (
                                        <FaUserCircle className="w-full h-full text-base-content/20" />
                                    )}
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-[2rem] w-64 border border-base-200 gap-1 animate-in slide-in-from-top-2 duration-300">
                                <li className="px-4 py-3 border-b border-base-200/50 mb-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-base-content/40">Authenticated As</p>
                                    <p className="text-sm font-black text-primary truncate">{user.displayName || 'Wise User'}</p>
                                    <p className="text-[10px] opacity-50 truncate">{user.email}</p>
                                </li>
                                <li><Link to="/dashboard" className="py-2.5 font-bold rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">Dashboard</Link></li>
                                <li><Link to="/dashboard/profile" className="py-2.5 font-bold rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">My Profile</Link></li>
                                {userData?.role === 'admin' && (
                                    <li><Link to="/dashboard/admin" className="py-2.5 font-bold rounded-xl hover:bg-secondary/5 text-secondary transition-colors">Admin Governance</Link></li>
                                )}
                                <div className="divider my-1 opacity-10"></div>
                                <li><button onClick={handleLogout} className="py-2.5 font-bold rounded-xl text-error hover:bg-error/10 transition-colors">Secure Sign Out</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login" className="btn btn-ghost rounded-xl font-bold">Login</Link>
                            <Link to="/register" className="btn btn-primary rounded-xl px-6 text-white font-black shadow-xl shadow-primary/20">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
