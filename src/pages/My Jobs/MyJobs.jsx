import axios from "axios";
import JobsTable from "./JobsTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const [postedjobs, setPostedJobs] = useState([]);

    useEffect(() => {
        document.title = 'My Jobs | JobHunter';
    }, []);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/postedjobs?email=${user.email}`, { withCredentials: true })
            .then(res => {
                setPostedJobs(res.data);
            })
    }, [user.email])

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This job listing will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/postedjobs/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Job has been removed.', 'success');
                            const remaining = postedjobs.filter(job => job._id !== id);
                            setPostedJobs(remaining);
                        }
                    })
            }
        })
    }

    return (
        <div className="min-h-screen pt-28 pb-20 transition-all duration-300 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                
                {/* Header Section */}
                <div className="mb-10 space-y-2">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl lg:text-5xl font-black text-base-content"
                    >
                        My Posted <span className="text-primary">Jobs</span>
                    </motion.h1>
                    <p className="text-base-content/60 font-medium">Manage and monitor the status of your job listings.</p>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead className="bg-base-200/50 text-base-content">
                                <tr className="border-b border-base-300">
                                    <th className="py-5 pl-8 font-bold uppercase text-xs tracking-wider">No.</th>
                                    <th className="font-bold uppercase text-xs tracking-wider">Job Title</th>
                                    <th className="font-bold uppercase text-xs tracking-wider">Posted Date</th>
                                    <th className="font-bold uppercase text-xs tracking-wider text-center">Deadline</th>
                                    <th className="font-bold uppercase text-xs tracking-wider text-center">Salary</th>
                                    <th className="text-right pr-8 font-bold uppercase text-xs tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {postedjobs.length > 0 ? (
                                    postedjobs.map((job, idx) => (
                                        <JobsTable 
                                            key={job._id} 
                                            job={job} 
                                            idx={idx + 1} 
                                            handleDelete={handleDelete} 
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-20 opacity-50 italic">
                                            You haven't posted any jobs yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyJobs;