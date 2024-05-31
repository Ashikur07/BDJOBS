import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import {useQuery} from '@tanstack/react-query'

const JobCategory = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/jobs`)
            .then(res => {
                setJobs(res.data);
            })
    }, [])

   

    return (
        <div className='my-20'>
            <div className="text-center space-y-4">
                <h1 className='text-4xl lg:text-5xl font-semibold'>All Category Jobs Here</h1>
                <p className='lg:text-xl'>All-encompassing job listings. Whether in finance or arts, find your niche here. <br /> Your career journey starts now!</p>
            </div>

            <div className='my-10'>
                <Tabs>
                    <div className='pb-8 lg:text-2xl font-semibold text-center lg:max-w-2xl mx-auto'>
                        <TabList>
                            <Tab>All Jobs</Tab>
                            <Tab>On-Site Job</Tab>
                            <Tab>Remote Job</Tab>
                            <Tab>Hybrid</Tab>
                            <Tab>Part-Time</Tab>
                        </TabList>
                    </div>

                    {/* All category job */}
                    <TabPanel>
                        <div className='lg:h-[500px] lg:overflow-y-auto lg:progress-bar grid lg:grid-cols-3 md:grid-cols-2 px-8 lg:py-12 lg:max-w-[1100px] gap-y-10 gap-8 mx-auto'>
                            {
                                jobs.map(job => <JobCard
                                    key={job._id}
                                    job={job}
                                ></JobCard>)
                            }
                        </div>
                    </TabPanel>

                    {/* On-Site Job */}
                    <TabPanel>
                        <div className='grid px-8 lg:px-0 md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl gap-y-10 gap-8 mx-auto'>
                            {
                                jobs
                                    .filter(job => job.job_type === 'On-Site Jobs')
                                    .map(job => <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>

                    {/* Remote Job */}
                    <TabPanel>
                        <div className='grid px-8 lg:px-0 md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl gap-y-10 gap-8 mx-auto'>
                            {
                                jobs
                                    .filter(job => job.job_type === 'Remote Jobs')
                                    .map(job => <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>

                    {/* Hybrid */}
                    <TabPanel>
                        <div className='grid px-8 lg:px-0 md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl gap-y-10 gap-8 mx-auto'>
                            {
                                jobs
                                    .filter(job => job.job_type === 'Hybrid')
                                    .map(job => <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>

                    {/* Part-Time */}
                    <TabPanel>
                        <div className='grid px-8 lg:px-0 md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl gap-y-10 gap-8 mx-auto'>
                            {
                                jobs
                                    .filter(job => job.job_type === 'Part-Time')
                                    .map(job => <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    );
};

export default JobCategory;