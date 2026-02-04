import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import AppliedJobsTable from "./AppliedJobsTable";
import ReactPdf from 'react-to-print';
import { FaDownload, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

const AppliedJobs = () => {
    const { user } = useContext(AuthContext);
    const [appliedJobs, setApplidJobs] = useState([]);
    const [category, setCategory] = useState('');
    const ref = useRef();

    useEffect(() => {
        document.title = 'My Applications | JobHunter';
    }, []);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/applyJobs?applyr_email=${user.email}`, { withCredentials: true })
            .then(res => {
                setApplidJobs(res.data);
            })
    }, [user.email])

    const handleCustomizationChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredJobs = category ? appliedJobs.filter(job => job.job_type === category) : appliedJobs;

    return (
        <div className="min-h-screen pt-28 pb-20 transition-all duration-300 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl lg:text-5xl font-black text-base-content"
                        >
                            Applied <span className="text-primary">Jobs</span>
                        </motion.h1>
                        <p className="text-base-content/60 font-medium">
                            Keep track of all the positions you've applied for.
                        </p>
                    </div>

                    {/* Action Bar: Filter & Download */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-base-content" />
                            <select 
                                onChange={handleCustomizationChange} 
                                className="select select-bordered pl-12 rounded-2xl bg-base-100 focus:outline-none focus:border-primary w-full md:w-56"
                            >
                                <option value="">All Categories</option>
                                <option value="On-Site Jobs">On-Site Job</option>
                                <option value="Remote Jobs">Remote Job</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Part-Time">Part-Time</option>
                            </select>
                        </div>

                        <ReactPdf 
                            trigger={() => (
                                <button className="btn btn-primary rounded-2xl px-6 flex items-center gap-2 shadow-lg shadow-primary/20">
                                    <FaDownload /> Download PDF
                                </button>
                            )} 
                            content={() => ref.current} 
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                    <div ref={ref} className="overflow-x-auto p-4 md:p-6 bg-base-100">
                        {/* Summary Header for PDF */}
                        <div className="hidden print:block mb-8 text-center border-b pb-6">
                            <h2 className="text-2xl font-bold">Job Application Summary</h2>
                            <p>Candidate: {user?.displayName} ({user?.email})</p>
                        </div>

                        <table className="table w-full border-collapse">
                            <thead className="bg-base-200/50 text-base-content">
                                <tr className="border-b border-base-300">
                                    <th className="py-5 pl-6 font-bold uppercase text-xs tracking-wider">#</th>
                                    <th className="font-bold uppercase text-xs tracking-wider">Job Title</th>
                                    <th className="font-bold uppercase text-xs tracking-wider">Posted Date</th>
                                    <th className="font-bold uppercase text-xs tracking-wider">Deadline</th>
                                    <th className="font-bold uppercase text-xs tracking-wider">Salary</th>
                                    <th className="font-bold uppercase text-xs tracking-wider pr-6 text-right">Type</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {filteredJobs.length > 0 ? (
                                    filteredJobs.map((job, idx) => (
                                        <AppliedJobsTable 
                                            key={job._id || idx} 
                                            job={job} 
                                            idx={idx + 1} 
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-20 opacity-50 italic">
                                            No applications found in this category.
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

export default AppliedJobs;