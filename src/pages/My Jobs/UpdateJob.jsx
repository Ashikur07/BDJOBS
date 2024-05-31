
import { useContext, useEffect, useState } from "react";
import { IoMdCube } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateJobs = () => {

    useEffect(() => {
        document.title = 'Update Jobs';
    }, []);

    const job = useLoaderData();
    const {_id, job_title, job_type, banner, salary_range ,job_posting_date, application_deadline,job_applicants_number,description} = job;



    const { user } = useContext(AuthContext);
    const user_name = user?.displayName;
    const user_email = user?.email;
    const navigate = useNavigate();


    const handleAddItem = e => {
        e.preventDefault();
        const job_title = e.target.job_title.value;
        const job_type = e.target.job_category.value;
        const banner = e.target.image.value;
        const salary_range = e.target.salary_range.value;
        const job_posting_date = e.target.job_post_date.value;
        const application_deadline = e.target.application_deadline.value;
        const job_applicants_number = parseInt(e.target.applicants_number.value);
        const description = e.target.job_description.value;
        const name = user_name;
        const email = user_email;

        const updateItem = {
            job_title,
            job_type,
            banner,
            salary_range,
            job_posting_date,
            application_deadline,
            job_applicants_number,
            description,
            name,
            email
        }
        console.log(updateItem);

        // Update server data
        fetch(`${import.meta.env.VITE_API_URL}/postedjobs/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })

                    setTimeout(() => {
                        navigate('/myJobs');
                    }, 1200);
                }
            })          
    }


    const backgroundImageUrl = "https://i.ibb.co/QkHBC1V/photo-1486312338219-ce68d2c6f44d-q-80-w-2072-auto-format-fit-crop-ixlib-rb-4-0.jpg";

    const backgroud = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(90%)",
    };


    return (
        <div className="pb-32" style={backgroud}>

            <h1 className="text-slate-600 py-8 text-6xl text-center font-bold">Update Job Details</h1>

            <form onSubmit={handleAddItem} className="text-white mx-5 lg:mx-auto lg:w-[800px] border rounded-lg shadow-2xl p-6 bg-gradient-to-r from-[#221137]">

                <h1 className="flex items-center gap-3 text-3xl pb-2 font-bold border-b border-[#958d8d]">
                    <IoMdCube /> <span>Job Details</span></h1>

                {/* Row 1 */}
                <div className="flex flex-col lg:flex-row gap-5 mt-4">
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Job Title</p>
                        <input name="job_title" type="text" defaultValue={job_title} className="bg-white text-black p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Job Category</p>
                        <select name="job_category" defaultValue={job_type} className="text-black bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select Job Category</option>
                            <option>On Site</option>
                            <option>Remote</option>
                            <option>Part-Time</option>
                            <option>Hybrid</option>
                        </select>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col lg:flex-row gap-5 mt-4 ">
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Job Banner</p>
                        <input name="image" type="text" defaultValue={banner} className="bg-white text-black p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Salary range</p>
                        <select name="salary_range" defaultValue={salary_range} className="text-black bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select Salary range</option>
                            <option>$100 - $150</option>
                            <option>$200 - $300</option>
                            <option>$300 - $400</option>
                            <option>$400 - $500</option>
                            <option>$500 - $800</option>
                            <option>$800 - $1000</option>
                            <option>above $1000</option>

                        </select>
                    </div>

                </div>

                {/* Row 3 */}
                <div className="flex flex-col lg:flex-row gap-5 mt-4 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">User Name</p>
                        <input disabled type="text" defaultValue={user_name} className="bg-white font-blod text-black p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">User Email</p>
                        <input disabled type="text" defaultValue={user_email} className="bg-white font-blod text-black p-1 w-full border input-info rounded-lg" />
                    </div>

                </div>

                {/* Row 4 */}
                <div className="flex flex-col lg:flex-row gap-5 pt-5">
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Job Posting Date</p>
                        <input name="job_post_date" type="date" defaultValue={job_posting_date} className="bg-white text-black p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Application Deadline</p>
                        <input name="application_deadline" type="date" defaultValue={application_deadline} className="bg-white text-black p-1 w-full border input-info rounded-lg" />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="flex flex-col lg:flex-row gap-5 pt-5 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="text-lg font-semibold pb-1">Job Applicants Number</p>
                        <input name="applicants_number" type="text" defaultValue={job_applicants_number} className="bg-white text-black pl-3 p-1 w-full border input-info rounded-lg" />
                    </div>

                </div>

                {/* Row 6 */}
                <div className="mt-5">
                    <p className="text-lg font-semibold pb-2">Job Description,</p>
                    <textarea name="job_description" className="bg-white text-black w-full border input-info rounded-lg" defaultValue={description} rows="5"></textarea>
                </div>


                <div className="text-center mt-8 mb-4">
                    <input className="btn btn-success px-6 text-white" type="submit" name="" id="" value='Update Now' />
                </div>

            </form>

        </div>
    );
};

export default UpdateJobs;
