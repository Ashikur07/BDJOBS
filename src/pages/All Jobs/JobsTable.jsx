import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaArrowRight } from "react-icons/fa";

const JobsTable = ({ job, idx }) => {
    const { _id, job_title, job_posting_date, application_deadline, salary_range } = job;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDetails = id => {
        if (user) {
            navigate(`/postedJobDetails/${id}`);
        } else {
            Swal.fire({
                title: "Login Required",
                text: "Please login to see the full details.",
                icon: "info",
                confirmButtonColor: "#6366f1",
            }).then((result) => {
                if (result.isConfirmed) navigate(`/login`);
            });
        }
    }

    return (
        <tr className="hover:bg-base-200/50 transition-colors text-base-content">
            <th className="pl-8 opacity-50 font-medium">{idx < 10 ? `0${idx}` : idx}</th>
            <td>
                <span className="font-bold text-base">
                    {job_title}
                </span>
            </td>
            <td className="text-center opacity-80 text-sm">
                {job_posting_date}
            </td>
            <td className="text-center">
                <span className="badge badge-ghost font-bold text-xs p-3">
                    {application_deadline}
                </span>
            </td>
            <td className="text-center font-bold text-primary text-sm">
                {salary_range}
            </td>
            <td className="text-right pr-8">
                <button 
                    onClick={() => handleDetails(_id)} 
                    className="btn btn-primary btn-sm rounded-xl px-5 normal-case font-bold shadow-md shadow-primary/10"
                >
                    Details <FaArrowRight size={10} />
                </button>
            </td>
        </tr>
    );
};

export default JobsTable;