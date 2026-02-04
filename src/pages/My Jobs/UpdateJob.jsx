import { useContext, useEffect } from "react";
import { IoMdCube } from "react-icons/io";
import { FaEdit, FaSave, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const UpdateJobs = () => {
    const job = useLoaderData();
    const { _id, job_title, job_type, banner, salary_range, job_posting_date, application_deadline, job_applicants_number, description } = job;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Update Job | JobHunter';
        window.scrollTo(0, 0);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const updateItem = {
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/postedjobs/${_id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updateItem)
            });
            const data = await res.json();

            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Job details updated successfully',
                    icon: 'success',
                    confirmButtonColor: '#6366f1',
                });
                setTimeout(() => navigate('/myJobs'), 1200);
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Update failed!' });
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <div className="text-center space-y-3 mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-6xl font-black text-base-content"
                    >
                        Update Job <span className="text-primary">Details</span>
                    </motion.h1>
                    <p className="text-base-content/60 font-medium">Modify your listing to keep it up-to-date.</p>
                </div>

                {/* Form Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-100 border border-base-200 shadow-2xl rounded-[2rem] p-6 md:p-12"
                >
                    <form onSubmit={handleUpdate} className="space-y-8">
                        <h2 className="flex items-center gap-3 text-xl font-black border-b border-base-200 pb-4">
                            <FaEdit className="text-primary text-xl" /> 
                            <span>Modify Job Specifications</span>
                        </h2>

                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Job Title</span></label>
                                <input name="job_title" type="text" defaultValue={job_title} className="input input-bordered rounded-xl bg-base-200/50" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Job Category</span></label>
                                <select name="job_category" defaultValue={job_type} className="select select-bordered rounded-xl bg-base-200/50 font-medium">
                                    <option value="On-Site Jobs">On Site</option>
                                    <option value="Remote Jobs">Remote</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Banner Image URL</span></label>
                                <input name="image" type="text" defaultValue={banner} className="input input-bordered rounded-xl bg-base-200/50" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Salary Range</span></label>
                                <select name="salary_range" defaultValue={salary_range} className="select select-bordered rounded-xl bg-base-200/50 font-bold">
                                    <option>$100 - $300</option>
                                    <option>$300 - $600</option>
                                    <option>$600 - $1000</option>
                                    <option>$1000 - $2000</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 3: Timelines */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Posting Date</span></label>
                                <input name="job_post_date" type="date" defaultValue={job_posting_date} className="input input-bordered rounded-xl bg-base-200/50" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold text-error">Deadline</span></label>
                                <input name="application_deadline" type="date" defaultValue={application_deadline} className="input input-bordered rounded-xl bg-base-200/50" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Applicants</span></label>
                                <input name="applicants_number" type="number" defaultValue={job_applicants_number} className="input input-bordered rounded-xl bg-base-200/50 font-bold" />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Job Description</span></label>
                            <textarea name="job_description" className="textarea textarea-bordered rounded-2xl bg-base-200/50 h-40 leading-relaxed" defaultValue={description} required></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button type="submit" className="btn btn-primary flex-1 rounded-2xl font-black h-14 shadow-lg shadow-primary/25 gap-2">
                                <FaSave /> Save Changes
                            </button>
                            <Link to="/myJobs" className="btn btn-ghost rounded-2xl h-14 px-8 border border-base-300 gap-2">
                                <FaTimesCircle /> Cancel
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateJobs;