import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from "react-router-dom";
import { FaToolbox } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from 'axios';

const Details = () => {

    useEffect(() => {
        document.title = 'Details';
    }, []);

    const job = useLoaderData();
    const { _id, job_title, job_type, banner, salary_range, job_posting_date, application_deadline, job_applicants_number, description, name, email } = job;
    const { user } = useContext(AuthContext);

    const [applyJobs, setApplyJobs] = useState([]);
    const match = applyJobs.find(job => job.checkId === _id);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/applyJobs?applyr_email=${user.email}`,{withCredentials : true})
            .then(res => {
                setApplyJobs(res.data);
            })
    }, [])


    const handleApplyJob = () => {
        const targetDate = new Date(application_deadline);
        const currentDate = new Date(Date.now());
        targetDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if (user.email === email) {
            Swal.fire({
                icon: "error",
                title: "You have post this job ..!",
                text: "So, you can not apply for this job",
            });
        }

        else if (match) {
            Swal.fire({
                icon: "error",
                title: "You have already apply this job",
            });
        }

        else if (currentDate.getTime() > targetDate.getTime()) {
            Swal.fire({
                title: "Deadline is Over..!",
                icon: "error",
                timer: 2000,
            });
        } else {
            document.getElementById('my_modal_1').showModal();
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const resume_link = form.resume.value;
        const applyr_name = form.name.value;
        const applyr_email = form.email.value;
        const checkId = _id;

        const newItems = {
            job_title,
            job_type,
            banner,
            salary_range,
            job_posting_date,
            application_deadline,
            job_applicants_number,
            description,
            name,
            email,
            resume_link,
            applyr_email,
            applyr_name,
            checkId
        }

        // apply job using post method
        fetch(`${import.meta.env.VITE_API_URL}/applyJobs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItems)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                    // for postedjob collection
                    axios.patch(`${import.meta.env.VITE_API_URL}/postedjobs/${_id}`)
                        .then(response => {
                            console.log('Job application count updated successfully:', response.data);
                        })
                        .catch(error => {
                            console.error('Error updating job application count:', error);
                        });

                    // for job collection
                    axios.patch(`${import.meta.env.VITE_API_URL}/jobs/${_id}`)
                        .then(response => {
                            console.log('Job application count updated successfully:', response.data);
                        })
                        .catch(error => {
                            console.error('Error updating job application count:', error);
                        });


                    alert('Application Submited..!');
                    window.location.reload();
                    e.target.reset();

                }
            })
    }


    return (
        <div className="max-w-5xl mx-auto pb-32 px-5 lg:px-0">
            <div className="mt-10 mb-5"><img className="rounded-xl lg:h-[500px] w-full" src={banner} alt="" /></div>
            <h1 className="text-4xl font-semibold">{job_title}</h1>
            <h3 className="text-xl py-3">Posted On <span className="font-bold">{job_posting_date}</span></h3>
            <h1 className="mt-8 mb-2 text-2xl font-bold">Description :</h1>
            <p className="text-lg">{description}</p>

            <div className="flex items-center flex-col lg:flex-row justify-center gap-10 lg:gap-20 my-10">
                <div className="flex gap-4 rounded-xl flex-col items-center pt-6 bg-base-300 border w-44 h-44">
                    <FaToolbox className="text-6xl" />
                    <h1 className="text-2xl font-bold">{job_type}</h1>
                </div>

                <div className="flex gap-4 rounded-xl flex-col items-center pt-6 bg-base-300 border w-44 h-44">
                    <FaUserGroup className="text-6xl" />
                    <h1 className="text-3xl font-bold">{job_applicants_number}</h1>
                </div>

                <div className="flex gap-4 rounded-xl flex-col items-center pt-6 bg-base-300 border w-44 h-44">
                    <AiFillDollarCircle className="text-6xl " />
                    <h1 className="text-xl font-bold">{salary_range}</h1>
                </div>

            </div>

            <div className="lg:flex text-center space-y-10 lg:space-y-0 items-center justify-between lg:px-8 mt-24">

                <div className="pl-14 lg:pl-0 flex items-center gap-4">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <img src="https://i.ibb.co/FbjVmqc/3237472.png" alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <h3 className="text-xl">{email}</h3>
                    </div>
                </div>

                <div className="text-2xl font-semibold space-y-2">
                    <p>Apply Before</p>
                    <p className="font-bold">{application_deadline}</p>
                </div>

                <button onClick={handleApplyJob} className="btn btn-warning px-8 text-xl font-bold">Apply Now</button>

                {/* apply now with model  */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="text-center font-bold text-3xl">Please Fill up !</h3>

                        <form onSubmit={handleSubmit} className="lg:ml-16 my-8 max-w-xs ">
                            <p className="text-xl font-bold pb-2">Resume link</p>
                            <input type="text" name='resume' placeholder="Provide link" className="input input-bordered input-accent w-full max-w-xs mb-4" required />

                            <label className="mb-4 input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" name='name' disabled className="grow" defaultValue={user.displayName} />
                            </label>

                            <label className="mb-4 input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="text" name='email' className="grow" disabled defaultValue={user.email} />
                            </label>

                            <input type='submit' className="btn w-full btn-warning font-semibold text-lg" value='Submit' />

                        </form>

                        <div className=" modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-accent px-5 font-bold">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default Details;
