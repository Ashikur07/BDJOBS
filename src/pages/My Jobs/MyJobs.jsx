import axios from "axios";
import JobsTable from "./JobsTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyJobs = () => {

    useEffect(() => {
        document.title = 'My Jobs';
    }, []);


    const [postedjobs, setPostedJobs] = useState([]);
    const {user} = useContext(AuthContext); 

    useEffect(() =>{
        axios(`${import.meta.env.VITE_API_URL}/postedjobs?email=${user.email}`,{withCredentials : true})
        .then(res =>{
            setPostedJobs(res.data);
        })
    },[])


       // delete item functionality
       const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${import.meta.env.VITE_API_URL}/postedjobs/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            )
                            const remaining = postedjobs.filter(job => job._id !== id);
                            setPostedJobs(remaining);
                        }
                    })
            }
        })
    }
    

    return (
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
                        postedjobs.map((job, idx) =>
                            <JobsTable
                                key={idx}
                                job={job}
                                idx={idx+1}
                                handleDelete={handleDelete}
                            ></JobsTable>)
                    }
                </tbody>

            </table>

        </div>
    );
};

export default MyJobs;