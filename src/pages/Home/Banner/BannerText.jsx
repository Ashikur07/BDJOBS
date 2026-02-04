import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const BannerText = ({ title, subtitle }) => {
    return (
        <div className='max-w-2xl space-y-4 md:space-y-6'>
            {/* Subtle Badge */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md text-indigo-300 text-[10px] md:text-xs font-bold tracking-widest uppercase"
            >
                Premium Careers
            </motion.div>

            {/* Responsive Heading */}
            <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter'
            >
                {title.split(" ").slice(0, -1).join(" ")} <br />
                <span className='text-indigo-400'>
                    {title.split(" ").slice(-1)}
                </span>
            </motion.h1>

            {/* Subtitle with better spacing */}
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='text-slate-300 text-sm md:text-lg lg:text-xl leading-relaxed max-w-lg'
            >
                {subtitle}
            </motion.p>

            {/* Compact Action Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-3 pt-2"
            >
                <Link to='/allJobs' className="px-6 py-2.5 md:py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 text-xs md:text-sm">
                    Find Jobs
                    <FaArrowRight className="text-[10px]" />
                </Link>
                
                <Link to='/blogs' className="px-6 py-2.5 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 rounded-xl font-bold transition-all text-xs md:text-sm text-center">
                    Read Blogs
                </Link>
            </motion.div>
        </div>
    );
};

export default BannerText;