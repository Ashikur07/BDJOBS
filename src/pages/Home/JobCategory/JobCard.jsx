import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUserGroup } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
    const { _id, name, job_title, job_posting_date, application_deadline, salary_range, job_applicants_number, job_type } = job;

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleDetails = id => {
        {
            user ? navigate(`details/${id}`) :
                Swal.fire({
                    title: "You have to log in first to view details",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Login"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`details/${id}`);
                    }
                });
        }

    }

    return (
        <motion.button onClick={() => handleDetails(_id)} whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} className="border border-[#cec9c9] shadow-xl rounded-2xl space-y-1 p-2 w-[320px] h-[410px]">


            <div className="bg-[#ffda77] rounded-xl h-[290px]">
                <div className="flex justify-between font-bold pt-5 px-4">
                    <p>{salary_range}</p>
                    <h1 className="flex items-center gap-2"><FaUserGroup /><span>{job_applicants_number}</span></h1>
                </div>

                <div className="flex justify-between items-center px-4 py-8">
                    <h1 className="w-1/2 text-center text-3xl font-semibold text-cyan-900">{job_title}</h1>
                    <p className="text-3xl pr-6"><FaArrowRightLong /></p>
                </div>

                <div className="flex justify-between p-4">
                    <div>
                        <h1 className="text-xl">Posted On</h1>
                        <p className="font-bold">{job_posting_date}</p>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl">Apply Before</h1>
                        <p className="font-bold">{job_posting_date}</p>
                    </div>
                </div>


                {/* <p>{job_type}</p>
                <h1>{name}</h1>
                <h1>{job_title}</h1>
                <h1>{job_posting_date}</h1>
                <h1>{application_deadline}</h1>
                <h1>{salary_range}</h1> */}
            </div>

            <div className="py-4 px-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="avatar online">
                        <div className="w-12 rounded-full">
                            <img src="https://i.ibb.co/FbjVmqc/3237472.png" alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{name}</h1>
                    </div>
                </div>

                <button onClick={() => handleDetails(_id)} className="btn btn-primary text-lg text-white">Details</button>
            </div>

        </motion.button>
    );
};

export default JobCard;