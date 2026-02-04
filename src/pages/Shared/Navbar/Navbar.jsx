import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUserCircle, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                title: "Logged Out",
                icon: "success",
                background: theme === 'dark' ? '#0f172a' : '#ffffff',
                color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
                showConfirmButton: false,
                timer: 1500
            });
        });
    };

    const navItems = [
        { name: "Home", path: "/" },
        { name: "All Jobs", path: "/allJobs" },
        ...(user ? [
            { name: "Applied", path: "/appliedJobs" },
            { name: "Add Job", path: "/addJobs" },
            { name: "My Jobs", path: "/myJobs" }
        ] : []),
        { name: "Blogs", path: "/blogs" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
            scrolled ? "py-2" : "py-5"
        }`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className={`navbar backdrop-blur-xl border transition-all duration-500 rounded-3xl px-4 md:px-8 ${
                    theme === 'light' 
                    ? "bg-white/90 border-slate-200/60 shadow-lg shadow-slate-200/50 text-slate-900" 
                    : "bg-slate-900/80 border-slate-700/50 shadow-2xl shadow-black/50 text-white"
                }`}>
                    
                    {/* Start: Navigation & Logo */}
                    <div className="navbar-start">
                        <div className="dropdown lg:hidden">
                            <button tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </button>
                            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl rounded-2xl w-56 border ${
                                theme === 'light' ? "bg-white border-slate-100" : "bg-slate-800 border-slate-700 text-white"
                            }`}>
                                {navItems.map(item => (
                                    <li key={item.path}><NavLink to={item.path}>{item.name}</NavLink></li>
                                ))}
                            </ul>
                        </div>
                        
                        <Link to="/" className="flex items-center gap-3 group">
                            {/* Circle Logo "BD" - Hidden on Mobile (sm) */}
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="hidden sm:flex w-10 h-10 bg-indigo-600 rounded-full items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-600/40 border-2 border-indigo-400 dark:border-indigo-500"
                            >
                                BD
                            </motion.div>
                            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase">
                                Job<span className="text-indigo-600">Hunter</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Nav Links */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink 
                                        to={item.path}
                                        className={({ isActive }) => `px-5 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider transition-all duration-300 ${
                                            isActive 
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                                            : theme === 'light'
                                                ? "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-indigo-400"
                                        }`}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* End: Actions */}
                    <div className="navbar-end gap-2 sm:gap-3">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={handleToggle}
                            className={`p-2.5 rounded-full border transition-all duration-300 ${
                                theme === 'light' 
                                ? "bg-slate-100 border-slate-200 text-slate-600" 
                                : "bg-slate-800 border-slate-700 text-yellow-400"
                            }`}
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </motion.button>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <motion.div tabIndex={0} whileHover={{ scale: 1.05 }} className="avatar cursor-pointer">
                                    {/* Avatar Border Fix: Changed from black to indigo/slate */}
                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-xl overflow-hidden">
                                        <img src={user.photoURL} alt="User" />
                                    </div>
                                </motion.div>
                                <ul tabIndex={0} className={`mt-4 p-3 shadow-2xl menu dropdown-content rounded-2xl w-60 sm:w-64 border ${
                                    theme === 'light' ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800"
                                }`}>
                                    <div className={`px-4 py-3 mb-2 rounded-xl flex flex-col gap-0.5 ${
                                        theme === 'light' ? "bg-slate-50 text-slate-800" : "bg-slate-800 text-white"
                                    }`}>
                                        <p className="font-black text-sm text-indigo-600 dark:text-indigo-400">{user?.displayName}</p>
                                        <p className="text-[10px] opacity-60 font-medium italic truncate">{user?.email}</p>
                                    </div>
                                    <li><Link to='/profile' className="py-3 font-bold"><FaUserCircle size={18} className="text-indigo-500" /> Profile</Link></li>
                                    <div className="divider my-0 opacity-10"></div>
                                    <li><button onClick={handleLogOut} className="text-red-500 font-black py-3"><FaSignOutAlt size={18} /> Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="px-5 sm:px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-600/30 transition-all active:scale-95">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;