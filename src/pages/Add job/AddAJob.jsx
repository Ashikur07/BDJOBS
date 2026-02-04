import { useContext, useEffect } from "react";
import { IoMdCube } from "react-icons/io";
import { FaPlusCircle, FaRegFileAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddAJob = () => {
    useEffect(() => {
        document.title = 'Add A Job | JobHunter';
        window.scrollTo(0, 0);
    }, []);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const newJob = {
            job_title: form.job_title.value,
            job_type: form.job_category.value,
            banner: form.image.value,
            salary_range: form.salary_range.value,
            job_posting_date: form.job_post_date.value,
            application_deadline: form.application_deadline.value,
            job_applicants_number: parseInt(form.applicants_number.value),
            description: form.job_description.value,
            name: user?.displayName,
            email: user?.email
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/postedjobs`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newJob)
            });
            const data = await res.json();

            if (data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Job posted successfully!',
                    icon: 'success',
                    confirmButtonColor: '#6366f1',
                });
                form.reset();
                navigate('/myJobs');
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 transition-all duration-300 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <div className="text-center space-y-3 mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-6xl font-black text-base-content"
                    >
                        Post A New <span className="text-primary">Job</span>
                    </motion.h1>
                    <p className="text-base-content/60 font-medium">Fill in the details below to find your next great hire.</p>
                </div>

                {/* Main Form Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-100 border border-base-200 shadow-2xl rounded-[2rem] p-6 md:p-12"
                >
                    <form onSubmit={handleAddItem} className="space-y-8">
                        
                        {/* Section 1: Basic Info */}
                        <div className="space-y-6">
                            <h2 className="flex items-center gap-3 text-xl font-black border-b border-base-200 pb-4">
                                <IoMdCube className="text-primary text-2xl" /> 
                                <span>Core Job Information</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Job Title</span></label>
                                    <input required name="job_title" type="text" placeholder="e.g. Senior Frontend Developer" className="input input-bordered rounded-xl focus:input-primary bg-base-200/50" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Job Category</span></label>
                                    <select required name="job_category" className="select select-bordered rounded-xl focus:select-primary bg-base-200/50 font-medium">
                                        <option disabled selected>Select Category</option>
                                        <option value="On-Site Jobs">On-Site</option>
                                        <option value="Remote Jobs">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Part-Time">Part-Time</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Banner Image URL</span></label>
                                    <input required name="image" type="url" placeholder="Paste image link" className="input input-bordered rounded-xl focus:input-primary bg-base-200/50" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold text-success flex items-center gap-2"><FaMoneyBillWave /> Salary Range</span></label>
                                    <select required name="salary_range" className="select select-bordered rounded-xl focus:select-primary bg-base-200/50 font-bold">
                                        <option disabled selected>Select Range</option>
                                        <option>$100 - $300</option>
                                        <option>$300 - $600</option>
                                        <option>$600 - $1000</option>
                                        <option>$1000 - $2000</option>
                                        <option>above $2000</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: User Info (Read Only) */}
                        <div className="p-6 bg-base-200/30 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold opacity-50">Posted By</span></label>
                                <input disabled type="text" defaultValue={user?.displayName} className="input input-bordered rounded-xl font-bold bg-base-100" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold opacity-50">Contact Email</span></label>
                                <input disabled type="text" defaultValue={user?.email} className="input input-bordered rounded-xl font-bold bg-base-100" />
                            </div>
                        </div>

                        {/* Section 3: Dates & Others */}
                        <div className="space-y-6">
                            <h2 className="flex items-center gap-3 text-xl font-black border-b border-base-200 pb-4 pt-4">
                                <FaCalendarAlt className="text-secondary text-xl" /> 
                                <span>Timeline & Capacity</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Posting Date</span></label>
                                    <input required name="job_post_date" type="date" className="input input-bordered rounded-xl focus:input-primary bg-base-200/50" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold text-error">Deadline</span></label>
                                    <input required name="application_deadline" type="date" className="input input-bordered rounded-xl focus:input-primary bg-base-200/50" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-bold">Initial Applicants</span></label>
                                    <input required name="applicants_number" type="number" defaultValue={0} className="input input-bordered rounded-xl focus:input-primary bg-base-200/50 font-bold" />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Description */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold flex items-center gap-2"><FaRegFileAlt /> Detailed Description</span></label>
                            <textarea 
                                required 
                                name="job_description" 
                                className="textarea textarea-bordered rounded-2xl focus:textarea-primary bg-base-200/50 text-base leading-relaxed h-40" 
                                placeholder="Describe the roles, responsibilities, and requirements..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button type="submit" className="btn btn-primary btn-block rounded-2xl h-14 font-black text-lg shadow-xl shadow-primary/25 gap-2">
                                <FaPlusCircle /> Post This Job
                            </button>
                        </div>

                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddAJob;