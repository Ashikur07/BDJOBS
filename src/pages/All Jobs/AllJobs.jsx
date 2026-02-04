import { useLoaderData } from "react-router-dom";
import JobsTable from "./JobsTable";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const AllJobs = () => {
    useEffect(() => {
        document.title = 'All Jobs | JobHunter';
    }, []);

    const postedjobs = useLoaderData();
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setSearchValue(e.target.title.value);
    }

    const filteredJobs = postedjobs.filter(job =>
        job.job_title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        /* Alada background color bad - eita ekhon theme onujayi auto hobe */
        <div className="min-h-screen pt-28 pb-20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                
                {/* Header Section */}
                <div className="mb-10 text-left">
                    <h1 className="text-3xl lg:text-5xl font-black text-base-content">
                        Explore <span className="text-primary">Opportunities</span>
                    </h1>
                    <p className="mt-3 text-base-content/70 font-medium">
                        Your career journey starts with the right search.
                    </p>
                </div>

                {/* Minimal Search Bar */}
                <div className="mb-12">
                    <form className="flex gap-2 w-full max-w-lg" onSubmit={handleSubmit}>
                        <div className="relative flex-grow">
                            <input 
                                type="text" 
                                name="title" 
                                className="input input-bordered w-full pl-5 pr-12 rounded-2xl focus:input-primary bg-base-100 text-base-content" 
                                placeholder="Search job title..." 
                            />
                            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 text-base-content" />
                        </div>
                        <button type="submit" className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20">
                            Search
                        </button>
                    </form>
                </div>

                {/* Simple Table Container */}
                <div className="overflow-x-auto rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/50 text-base-content">
                            <tr className="border-b border-base-300">
                                <th className="py-5 pl-8 font-bold">#</th>
                                <th className="font-bold uppercase text-xs tracking-wider">Job Title</th>
                                <th className="font-bold uppercase text-xs tracking-wider text-center">Posted Date</th>
                                <th className="font-bold uppercase text-xs tracking-wider text-center">Deadline</th>
                                <th className="font-bold uppercase text-xs tracking-wider text-center">Salary</th>
                                <th className="text-right pr-8 font-bold uppercase text-xs tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job, idx) => (
                                    <JobsTable key={job._id} job={job} idx={idx + 1} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-20 opacity-50 italic">
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllJobs;