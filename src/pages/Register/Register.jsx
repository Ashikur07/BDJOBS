import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../Provider/AuthProvider';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash, FaUser, FaImage, FaEnvelope, FaLock } from "react-icons/fa6";
import Swal from "sweetalert2";
import { updateProfile } from 'firebase/auth';
import { motion } from "framer-motion";

const Register = () => {
    useEffect(() => { document.title = 'Register | JobHunter'; }, []);

    const navigate = useNavigate();
    const { createNewUser, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterWithEmail = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photo.value;
        
        // Password Validation Logic
        if (password.length < 6) {
            return Swal.fire({ icon: "warning", title: "Min 6 characters required", timer: 2000, showConfirmButton: false });
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return Swal.fire({ icon: "warning", title: "Add Upper & Lowercase", timer: 2000, showConfirmButton: false });
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                updateProfile(user, { displayName: name, photoURL: photoUrl });
                setUser({...user, photoURL: photoUrl, displayName: name});
                
                Swal.fire({ title: "Joined Successfully!", icon: "success", timer: 1500, showConfirmButton: false });
                setTimeout(() => navigate('/'), 1500);
            })
            .catch(error => {
                Swal.fire({ icon: "error", title: "Error", text: error.message });
            });
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-base-200 px-4 py-16 transition-colors'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[380px] bg-base-100 border border-base-300 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-base-content tracking-tighter uppercase">Create <span className="text-primary italic">Account</span></h2>
                    <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">Start your journey today</p>
                </div>

                <form onSubmit={handleRegisterWithEmail} className="space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={12} />
                        <input className='w-full bg-base-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 ring-primary/20 transition-all' type="text" name='name' placeholder='Full Name' required />
                    </div>

                    {/* Photo URL Input */}
                    <div className="relative">
                        <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={12} />
                        <input className='w-full bg-base-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 ring-primary/20 transition-all' type="text" name='photo' placeholder='Photo URL' required />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={12} />
                        <input className='w-full bg-base-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 ring-primary/20 transition-all' type="email" name='email' placeholder='Email Address' required />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={12} />
                        <input className='w-full bg-base-200 rounded-xl py-3 pl-10 pr-10 text-xs font-bold outline-none focus:ring-2 ring-primary/20 transition-all' type={showPassword ? "text" : "password"} name="password" placeholder='Password' required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
                            {showPassword ? <FaRegEyeSlash size={16}/> : <AiOutlineEye size={16}/>}
                        </button>
                    </div>

                    <button className='w-full bg-primary hover:bg-primary-focus text-white font-black py-3.5 rounded-xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest mt-4 transition-all active:scale-95'>
                        Create Account
                    </button>
                </form>

                <p className='text-center mt-8 text-[11px] font-bold opacity-70 italic'>
                    Already a member? <Link to='/login' className='text-primary border-b border-primary/30 ml-1'>Login Here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;