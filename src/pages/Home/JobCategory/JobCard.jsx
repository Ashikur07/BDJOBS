import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUsers, FaArrowRight, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
    // Destructured 'banner' as per your Details page code
    const { _id, name, job_title, job_type, banner, salary_range, application_deadline, job_applicants_number } = job;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDetails = id => {
        if (user) {
            navigate(`details/${id}`);
        } else {
            Swal.fire({
                title: "Login Required",
                text: "Please login to see job details",
                icon: "info",
                confirmButtonColor: "#4f46e5",
            }).then((result) => {
                if (result.isConfirmed) navigate(`/login`);
            });
        }
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="card w-full max-w-[330px] sm:max-w-[360px] bg-base-100 shadow-xl border border-base-300 hover:border-primary/50 transition-all duration-300 rounded-[2rem] overflow-hidden group mx-auto"
        >
            {/* Job Banner Image from Database */}
            <figure className="relative h-44 overflow-hidden">
                <img 
                    src={banner || "https://i.ibb.co/6JsKFhp/photo-1629904853716-f0bc54eea481.jpg"} 
                    alt={job_title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                    <div className="badge badge-primary font-black text-[8px] uppercase p-2.5 border-none shadow-lg">
                        {job_type}
                    </div>
                </div>
            </figure>

            <div className="card-body p-5">
                {/* Job Title */}
                <h2 className="text-lg font-black text-base-content leading-tight uppercase truncate mb-1">
                    {job_title}
                </h2>

                <div className="flex items-center gap-1 text-primary font-black text-sm mb-4">
                    <FaDollarSign size={12} />
                    <span>{salary_range}</span>
                </div>

                {/* Info Grid (Mobile Optimized) */}
                <div className="grid grid-cols-2 gap-2 py-3 border-y border-base-200 mb-4">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-[7px] uppercase font-bold opacity-50 tracking-widest">Deadline</p>
                        <p className="text-[9px] font-bold text-error flex items-center gap-1"><FaCalendarAlt size={8} /> {application_deadline}</p>
                    </div>
                    <div className="flex flex-col gap-0.5 items-end">
                        <p className="text-[7px] uppercase font-bold opacity-50 tracking-widest">Applicants</p>
                        <p className="text-[9px] font-bold flex items-center gap-1"><FaUsers size={10} className="text-primary" /> {job_applicants_number}</p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="card-actions justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="avatar">
                            <div className="w-8 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1">
                                <img src="https://i.ibb.co/FbjVmqc/3237472.png" alt="Company" />
                            </div>
                        </div>
                        <span className="font-bold text-[10px] opacity-80 truncate max-w-[80px]">{name}</span>
                    </div>
                    <button 
                        onClick={() => handleDetails(_id)}
                        className="btn btn-primary btn-xs rounded-lg normal-case font-black text-[9px] px-3 shadow-md"
                    >
                        View Details <FaArrowRight size={8} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;