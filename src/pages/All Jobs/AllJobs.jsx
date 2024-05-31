import { useLoaderData } from "react-router-dom";
import JobsTable from "./JobsTable";
import { useEffect, useState } from "react";

const AllJobs = () => {

    useEffect(() => {
        document.title = 'All Jobs';
    }, []);


    const postedjobs = useLoaderData();
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();
        const targetValue = e.target.title.value;
        setSearchValue(targetValue);
    }

    const filteredJobs = postedjobs.filter(job =>
        job.job_title.toLowerCase().includes(searchValue.toLowerCase())
    );


    return (
        <div>

            <div className="text-center pb-10 pt-8">
                <h1 className="text-4xl font-bold">All Posted Jobs Here</h1>
            </div>

            <div className="flex justify-center">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name="title" className="grow" placeholder="Enter Job Title" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                    <input type="submit" className="btn btn-success text-lg text-white" value='Search' />
                </form>
            </div>


            <div className="overflow-x-auto pt-10 pb-28">

                <table className="border-b-2 border-[#c9c2c2] table max-w-7xl mx-auto text-lg border-2 pl-5">

                    <thead className="text-black text-2xl bg-[#90EE90] border-b-2 border-[#c9c2c2]">
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Job Title</th>
                            <th>Job Posting Date</th>
                            <th>Application Deadline</th>
                            <th>Salary range</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredJobs.map((job, idx) =>
                                <JobsTable
                                    key={idx}
                                    job={job}
                                    idx={idx + 1}
                                ></JobsTable>)
                        }
                    </tbody>

                </table>

            </div>
        </div>
    );
};

export default AllJobs;