import Lottie from "lottie-react";
import contractAnimation from "../../../assets/contract.json"; // Path thik koro
import { FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Contract = () => {
    const handleContactSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Message Sent!",
            text: "We will get back to you soon, Bondhu!",
            icon: "success",
            background: 'var(--bg-base-100)',
            color: 'var(--bc)',
            confirmButtonColor: "#4f46e5",
        });
        e.target.reset();
    };

    return (
        <section className="py-16 bg-base-200 transition-colors">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter uppercase">
                        Contact <span className="text-primary italic">Us</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-2 rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-10 bg-base-100 p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-300">
                    
                    {/* Left: Animation & Info (Compact) */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="flex justify-center">
                            <Lottie 
                                className="w-full max-w-[350px] lg:max-w-[450px]" 
                                animationData={contractAnimation} 
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-2xl border border-base-300">
                                <FaEnvelope className="text-primary text-xl" />
                                <div className="truncate">
                                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Email</p>
                                    <p className="text-xs font-bold truncate">ashik.ict.iu@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-2xl border border-base-300">
                                <FaPhoneAlt className="text-primary text-xl" />
                                <div>
                                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Phone</p>
                                    <p className="text-xs font-bold">+880 1743439382</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="w-full lg:w-1/2">
                        <motion.form 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            onSubmit={handleContactSubmit} 
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" className="input input-bordered bg-base-200 w-full rounded-xl text-xs font-bold focus:ring-2 ring-primary/20 outline-none transition-all" required />
                                <input type="email" placeholder="Email" className="input input-bordered bg-base-200 w-full rounded-xl text-xs font-bold focus:ring-2 ring-primary/20 outline-none transition-all" required />
                            </div>
                            <input type="text" placeholder="Subject" className="input input-bordered bg-base-200 w-full rounded-xl text-xs font-bold focus:ring-2 ring-primary/20 outline-none transition-all" required />
                            <textarea placeholder="Your Message..." rows="4" className="textarea textarea-bordered bg-base-200 w-full rounded-xl text-xs font-bold focus:ring-2 ring-primary/20 outline-none transition-all resize-none" required></textarea>
                            
                            <button className="btn btn-primary w-full rounded-xl font-black text-xs uppercase tracking-widest gap-3 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                                Send Message <FaPaperPlane />
                            </button>
                        </motion.form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contract;