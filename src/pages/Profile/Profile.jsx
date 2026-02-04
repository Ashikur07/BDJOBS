import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';
import { FaEnvelope, FaIdBadge, FaCalendarCheck } from 'react-icons/fa';

const Profile = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'My Profile | JobHunter';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-28 pb-20 bg-base-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex justify-center">
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full max-w-lg bg-base-100 border border-base-200 shadow-2xl rounded-[3rem] overflow-hidden"
                >
                    {/* Decorative Header Background */}
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 w-full" />

                    <div className="px-8 pb-12">
                        {/* Avatar Section */}
                        <div className="relative -mt-16 mb-6 flex justify-center">
                            <div className="avatar">
                                <div className="w-32 md:w-40 rounded-[2.5rem] ring-8 ring-base-100 shadow-xl shadow-indigo-500/20">
                                    <img src={user?.photoURL || "https://i.ibb.co/FbjVmqc/3237472.png"} alt="profile" />
                                </div>
                            </div>
                        </div>

                        {/* User Basic Info */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-base-content tracking-tight">
                                {user?.displayName}
                            </h1>
                            <p className="badge badge-primary badge-outline font-bold mt-2 uppercase tracking-widest text-[10px] px-4 py-3">
                                Verified Member
                            </p>
                        </div>

                        {/* Details List */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-200/50 transition-all hover:bg-base-200">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <FaEnvelope />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-black uppercase text-base-content/40 tracking-widest">Email Address</p>
                                    <p className="text-sm md:text-base font-bold text-base-content truncate">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-200/50 transition-all hover:bg-base-200">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400">
                                    <FaIdBadge />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase text-base-content/40 tracking-widest">User Unique ID</p>
                                    <p className="text-xs font-mono font-medium text-base-content/70">{user?.uid}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-200/50 transition-all hover:bg-base-200">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <FaCalendarCheck />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase text-base-content/40 tracking-widest">Registration Date</p>
                                    <p className="text-sm font-bold text-base-content">{user?.metadata?.creationTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="mt-10 flex gap-3">
                            <button className="btn btn-primary flex-1 rounded-2xl font-bold shadow-lg shadow-primary/20">Edit Profile</button>
                            <button className="btn btn-outline rounded-2xl px-6 border-base-300">Settings</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;