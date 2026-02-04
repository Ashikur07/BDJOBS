const AppliedJobsTable = ({ job, idx }) => {
    const { job_title, job_posting_date, application_deadline, salary_range, job_type } = job;

    return (
        <tr className="hover:bg-base-200/30 transition-colors">
            <th className="pl-6 opacity-40 font-medium">{idx < 10 ? `0${idx}` : idx}</th>
            <td>
                <span className="font-bold text-base-content text-sm md:text-base">
                    {job_title}
                </span>
            </td>
            <td className="opacity-70 text-sm">{job_posting_date}</td>
            <td>
                <span className="badge badge-ghost font-bold text-[10px] md:text-xs py-3 px-4">
                    {application_deadline}
                </span>
            </td>
            <td>
                <span className="font-bold text-primary text-sm whitespace-nowrap">
                    {salary_range}
                </span>
            </td>
            <td className="text-right pr-6">
                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    job_type === 'Remote Jobs' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    job_type === 'On-Site Jobs' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                }`}>
                    {job_type}
                </span>
            </td>
        </tr>
    );
};

export default AppliedJobsTable;