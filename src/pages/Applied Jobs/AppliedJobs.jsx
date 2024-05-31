import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import AppliedJobsTable from "./AppliedJobsTable";
import { useRef } from 'react';
import ReactPdf from 'react-to-print';

const AppliedJobs = () => {

    useEffect(() => {
        document.title = 'Applied Jobs';
    }, []);


    const ref = useRef();

    const { user } = useContext(AuthContext);
    const [appliedJobs, setApplidJobs] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/applyJobs?applyr_email=${user.email}`,{withCredentials : true})
            .then(res => {
                setApplidJobs(res.data);
            })
    }, [])

    // filter functionality implement
    const handleCustomizationChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredJobs = category ? appliedJobs.filter(job => job.job_type === category) : appliedJobs;


    return (
        <div>
            <h1 className='bg-slate-300 my-6 text-center pt-4 lg:pt-7 h-[70px] lg:h-[100px] text-3xl font-bold'>
                My Applied Jobs
            </h1>

            <div className="text-center">
                <select onChange={handleCustomizationChange} className="bg-white text-lg select select-info w-full max-w-[250px]" >
                    <option disabled selected>Select Job Category</option>
                    <option value="On Site">On-Site Job</option>
                    <option value="Remote Jobs">Remote Job</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Part-Time">Part-Time</option>
                </select>
            </div>

            <div className="flex justify-center lg:justify-end lg:mr-32 mt-5 lg:mt-0">
                <ReactPdf trigger={() => <button className='btn btn-success lg:text-xl text-white '>Download summary</button>} content={() => ref.current} />
            </div>


            <div ref={ref} className="overflow-x-auto pt-4 pb-28">

                <table className="border-b-2 border-[#c9c2c2] table max-w-[1300px] mx-auto text-lg border-2 pl-5">

                    <thead className="text-black text-2xl bg-[#90EE90] border-b-2 border-[#c9c2c2]">
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Job Title</th>
                            <th>Job Posting Date</th>
                            <th>Application Deadline</th>
                            <th>Salary range</th>
                            <th>Job Category</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredJobs.map((job, idx) =>
                                <AppliedJobsTable
                                    key={idx}
                                    job={job}
                                    idx={idx + 1}
                                ></AppliedJobsTable>)
                        }
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AppliedJobs;