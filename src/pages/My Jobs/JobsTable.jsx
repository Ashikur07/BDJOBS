import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const JobsTable = ({ job, idx, handleDelete }) => {
    const { _id, job_title, job_posting_date, application_deadline, salary_range } = job;

    return (
        <tr className="hover:bg-base-200/30 transition-colors">
            <th className="pl-8 opacity-40 font-medium">{idx < 10 ? `0${idx}` : idx}</th>
            <td>
                <span className="font-bold text-base-content">{job_title}</span>
            </td>
            <td className="opacity-70 text-sm font-medium">{job_posting_date}</td>
            <td className="text-center">
                <span className="badge badge-ghost font-bold text-xs p-3">{application_deadline}</span>
            </td>
            <td className="text-center font-bold text-primary text-sm">{salary_range}</td>
            <td className="text-right pr-8">
                <div className="flex items-center justify-end gap-2">
                    <Link to={`/updateJobs/${_id}`}>
                        <button className="btn btn-square btn-ghost hover:bg-primary/10 hover:text-primary transition-all">
                            <FaEdit size={18} />
                        </button>
                    </Link>
                    <button 
                        onClick={() => handleDelete(_id)} 
                        className="btn btn-square btn-ghost hover:bg-error/10 hover:text-error transition-all"
                    >
                        <FaTrashAlt size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default JobsTable;