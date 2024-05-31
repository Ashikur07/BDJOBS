import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const JobsTable = ({ job, idx }) => {

    const {_id, job_title, job_posting_date, application_deadline, salary_range } = job;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleDetails = id => {
        {
            user ? navigate(`/postedJobDetails/${id}`) :
                Swal.fire({
                    title: "You have to log in first to view details",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Login"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/postedJobDetails/${id}`);
                    }
                });
        }
    }

  
    return (
        <tr className=" bg-base-200 border-b-2 border-[#c9c2c2]">
            <th></th>
            <th>{idx} .</th>
            <td>{job_title}</td>
            <td>{job_posting_date}</td>
            <td>{application_deadline}</td>
            <td>{salary_range}</td>
            <td><button onClick={() => handleDetails(_id)} className="text-white btn btn-success">Details</button></td>
        </tr>

    );
};

export default JobsTable;