import { Link } from "react-router-dom";

const JobsTable = ({ job, idx, handleDelete }) => {

    const {_id, job_title, job_posting_date, application_deadline, salary_range } = job;

    return (
        <tr className=" bg-base-200 border-b-2 border-[#c9c2c2]">
            <th></th>
            <th>{idx} .</th>
            <td>{job_title}</td>
            <td>{job_posting_date}</td>
            <td>{application_deadline}</td>
            <td>{salary_range}</td>
            <td className="space-x-4 flex">
                <Link to={`/updateJobs/${_id}`}><button className="btn btn-success text-white">Update</button></Link>
                <button onClick={()=>handleDelete(_id)} className="btn btn-warning text-white">Delete</button>
            </td>
        </tr>

    );
};

export default JobsTable;