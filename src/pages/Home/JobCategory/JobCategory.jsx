import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";

const JobCategory = () => {
    const [jobs, setJobs] = useState([]);
    const categories = ['All Jobs', 'On-Site Job', 'Remote Job', 'Hybrid', 'Part-Time'];

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/jobs`)
            .then(res => setJobs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="py-16 md:py-24 bg-base-200 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center space-y-3 mb-10 md:mb-16 px-4">
                    <h2 className="text-3xl md:text-6xl font-black text-base-content tracking-tighter uppercase">
                        Find Your <span className="text-primary italic">Next Level</span> Job
                    </h2>
                    <p className="text-base-content/60 max-w-xl mx-auto font-bold text-xs md:text-lg italic leading-relaxed">
                        Whether in finance or arts, find your niche here. Your career journey starts now!
                    </p>
                </div>

                <Tabs>
                    {/* Horizontal Scrollable Tab Bar for Mobile */}
                    <div className="flex justify-center px-4">
                        <TabList className="flex overflow-x-auto no-scrollbar max-w-full gap-2 p-1.5 bg-base-100 border border-base-300 rounded-full shadow-md whitespace-nowrap scroll-smooth">
                            {categories.map((cat, idx) => (
                                <Tab 
                                    key={idx}
                                    selectedClassName="!bg-primary !text-primary-content !shadow-lg scale-105"
                                    className="px-5 py-2 md:px-8 md:py-3 rounded-full text-[10px] md:text-[12px] font-black uppercase tracking-widest cursor-pointer transition-all hover:bg-base-200 text-base-content/60 outline-none flex-shrink-0"
                                >
                                    {cat}
                                </Tab>
                            ))}
                        </TabList>
                    </div>

                    {/* Panels Section */}
                    <div className="mt-10 md:mt-16">
                        {categories.map((cat, idx) => (
                            <TabPanel key={idx}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 px-4 md:px-8 justify-items-center"
                                >
                                    {jobs
                                        .filter(job => idx === 0 ? true : job.job_type === (cat === 'On-Site Job' ? 'On-Site Jobs' : cat === 'Remote Job' ? 'Remote Jobs' : cat))
                                        .map(job => <JobCard key={job._id} job={job} />)
                                    }
                                </motion.div>
                            </TabPanel>
                        ))}
                    </div>
                </Tabs>
            </div>

            {/* Hidden scrollbar CSS for a cleaner look */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default JobCategory;