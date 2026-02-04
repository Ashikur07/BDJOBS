import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEnvelope, FaLock, FaRegEyeSlash } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Login = () => {
    useEffect(() => { document.title = 'Login'; }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { createUserWithGoogle, createUserWithGitHub, signInUser } = useContext(AuthContext);

    const handleSocialLogin = (providerFunc, provider) => {
        providerFunc(provider).then(() => {
            Swal.fire({ title: "Welcome!", icon: "success", timer: 1500, showConfirmButton: false });
            navigate(location?.state || '/');
        });
    };

    const handleEmailLogin = e => {
        e.preventDefault();
        signInUser(e.target.email.value, e.target.password.value)
            .then(() => {
                Swal.fire({ title: "Success!", icon: "success", timer: 1500, showConfirmButton: false });
                navigate(location?.state || '/');
            }).catch(() => Swal.fire({ title: "Error!", text: "Wrong Credentials", icon: "error" }));
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-base-200 px-4 py-10 transition-colors'>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[360px] bg-base-100 border border-base-300 rounded-[2rem] p-6 sm:p-8 shadow-2xl"
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-base-content tracking-tighter uppercase">Login <span className="text-primary italic">Now</span></h2>
                </div>

                <div className="flex flex-row gap-2 mb-6">
                    <button onClick={() => handleSocialLogin(createUserWithGoogle, new GoogleAuthProvider())} className='flex-1 flex items-center justify-center py-2.5 border border-base-300 rounded-xl hover:bg-base-200 transition-all'><FcGoogle size={20}/></button>
                    <button onClick={() => handleSocialLogin(createUserWithGitHub, new GithubAuthProvider())} className='flex-1 flex items-center justify-center py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all'><FaGithub size={20}/></button>
                </div>

                <div className='divider text-[10px] font-bold opacity-30 uppercase mb-6 tracking-widest'>or</div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                        <input className='w-full bg-base-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 ring-primary/20 transition-all' type="email" name='email' placeholder='Email' required />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                        <input className='w-full bg-base-200 rounded-xl py-3 pl-10 pr-10 text-xs font-bold outline-none focus:ring-2 ring-primary/20 transition-all' type={showPassword ? "text" : "password"} name="password" placeholder='Password' required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">{showPassword ? <FaRegEyeSlash size={16}/> : <AiOutlineEye size={16}/>}</button>
                    </div>
                    <button className='w-full bg-primary hover:bg-primary-focus text-white font-black py-3 rounded-xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest transition-all'>Secure Login</button>
                </form>

                <p className='text-center mt-6 text-[11px] font-bold opacity-70'>New here? <Link to='/register' className='text-primary border-b border-primary/30 ml-1'>Register</Link></p>
            </motion.div>
        </div>
    );
};

export default Login;