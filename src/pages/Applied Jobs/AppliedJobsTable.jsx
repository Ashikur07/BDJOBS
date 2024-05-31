

const AppliedJobsTable = ({ job, idx }) => {

    const {_id, job_title, job_posting_date, application_deadline, salary_range,
        job_type } = job;

  
    return (
        <tr className=" bg-base-200 border-b-2 border-[#c9c2c2]">
            <th></th>
            <th>{idx} .</th>
            <td>{job_title}</td>
            <td>{job_posting_date}</td>
            <td>{application_deadline}</td>
            <td>{salary_range}</td>
            <td>{job_type}</td>
           
        </tr>

    );
};

export default AppliedJobsTable;