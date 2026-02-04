import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaToolbox, FaCalendarAlt, FaDollarSign, FaUserTie, FaEnvelope } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from 'axios';
import { motion } from 'framer-motion';

const Details = () => {
    const job = useLoaderData();
    const { _id, job_title, job_type, banner, salary_range, job_posting_date, application_deadline, job_applicants_number, description, name, email } = job;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applyJobs, setApplyJobs] = useState([]);

    useEffect(() => {
        document.title = `${job_title} | Details`;
        window.scrollTo(0, 0);
    }, [job_title]);

    useEffect(() => {
        if (user?.email) {
            axios(`${import.meta.env.VITE_API_URL}/applyJobs?applyr_email=${user.email}`, { withCredentials: true })
                .then(res => setApplyJobs(res.data));
        }
    }, [user?.email]);

    const match = applyJobs.find(appliedJob => appliedJob.checkId === _id);

    const handleApplyJob = () => {
        const targetDate = new Date(application_deadline);
        const currentDate = new Date();
        targetDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if (user.email === email) {
            return Swal.fire({ icon: "error", title: "Forbidden", text: "You cannot apply for a job you posted!" });
        }
        if (match) {
            return Swal.fire({ icon: "error", title: "Already Applied", text: "You've already submitted an application for this role." });
        }
        if (currentDate.getTime() > targetDate.getTime()) {
            return Swal.fire({ icon: "error", title: "Deadline Over", text: "The application period for this job has ended." });
        }
        document.getElementById('apply_modal').showModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newItems = {
            ...job,
            resume_link: form.resume.value,
            applyr_email: user.email,
            applyr_name: user.displayName,
            checkId: _id
        };
        delete newItems._id; // Remove original ID to avoid conflict

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/applyJobs`, newItems);
            if (data.insertedId) {
                // Update application counts
                await Promise.all([
                    axios.patch(`${import.meta.env.VITE_API_URL}/postedjobs/${_id}`),
                    axios.patch(`${import.meta.env.VITE_API_URL}/jobs/${_id}`)
                ]);

                Swal.fire({ icon: "success", title: "Success!", text: "Application submitted successfully.", showConfirmButton: false, timer: 1500 });
                document.getElementById('apply_modal').close();
                navigate('/appliedJobs');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen pt-28 pb-20 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                
                {/* Banner Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-3xl overflow-hidden h-[300px] md:h-[500px] shadow-2xl mb-10"
                >
                    <img className="w-full h-full object-cover" src={banner} alt="banner" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8 md:p-12">
                        <div className="text-white">
                            <span className="badge badge-primary font-bold mb-4 uppercase tracking-widest">{job_type}</span>
                            <h1 className="text-3xl md:text-5xl font-black">{job_title}</h1>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">Description</h2>
                            <p className="text-base-content/80 leading-relaxed text-lg whitespace-pre-line">
                                {description}
                            </p>
                        </section>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="p-6 bg-base-100 rounded-3xl border border-base-200 text-center space-y-2 hover:shadow-md transition-shadow">
                                <FaToolbox className="text-3xl text-primary mx-auto" />
                                <p className="text-xs font-bold text-base-content/50 uppercase tracking-tighter">Job Type</p>
                                <h3 className="text-xl font-bold">{job_type}</h3>
                            </div>
                            <div className="p-6 bg-base-100 rounded-3xl border border-base-200 text-center space-y-2 hover:shadow-md transition-shadow">
                                <FaUserGroup className="text-3xl text-secondary mx-auto" />
                                <p className="text-xs font-bold text-base-content/50 uppercase tracking-tighter">Applicants</p>
                                <h3 className="text-xl font-bold">{job_applicants_number} Applied</h3>
                            </div>
                            <div className="p-6 bg-base-100 rounded-3xl border border-base-200 text-center space-y-2 hover:shadow-md transition-shadow">
                                <FaDollarSign className="text-3xl text-success mx-auto" />
                                <p className="text-xs font-bold text-base-content/50 uppercase tracking-tighter">Salary</p>
                                <h3 className="text-xl font-bold">{salary_range}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="space-y-6">
                        {/* Company/Poster Info */}
                        <div className="bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm sticky top-28">
                            <div className="text-center mb-8">
                                <div className="avatar mb-4">
                                    <div className="w-24 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://i.ibb.co/FbjVmqc/3237472.png" alt="company" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-black">{name}</h3>
                                <p className="text-sm opacity-60 flex items-center justify-center gap-2 mt-1">
                                    <FaEnvelope className="text-primary" /> {email}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center p-4 bg-base-200/50 rounded-2xl">
                                    <span className="text-sm font-bold opacity-60">Posted on</span>
                                    <span className="font-bold">{job_posting_date}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl">
                                    <span className="text-sm font-bold">Apply Before</span>
                                    <span className="font-black">{application_deadline}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleApplyJob} 
                                className="btn btn-primary btn-block rounded-2xl font-black text-lg h-14 shadow-lg shadow-primary/25"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <dialog id="apply_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl p-8">
                    <h3 className="font-black text-3xl mb-2 text-center">Join the Team!</h3>
                    <p className="text-center opacity-60 mb-8">Fill in your details to submit your application.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Resume Portfolio Link</span></label>
                            <input type="url" name='resume' placeholder="https://yourportfolio.com" className="input input-bordered rounded-xl focus:input-primary" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Full Name</span></label>
                            <div className="relative">
                                <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                                <input type="text" disabled className="input input-bordered w-full pl-12 rounded-xl" defaultValue={user?.displayName} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Contact Email</span></label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                                <input type="email" disabled className="input input-bordered w-full pl-12 rounded-xl" defaultValue={user?.email} />
                            </div>
                        </div>
                        <button type='submit' className="btn btn-primary btn-block rounded-xl font-bold mt-4 shadow-xl shadow-primary/20">Submit Application</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost rounded-xl">Discard</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Details;