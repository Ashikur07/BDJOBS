import { Link } from "react-router-dom";

const BannerText = () => {
    return (
        <div className='brightness-125 flex text-center justify-center items-center h-[100%]'>
            <div className='pb-20 pt-5 lg:pt-0 text-cente items-center space-y-8'>
                <h1 className='text-6xl lg:text-8xl font-bold'>
                    <span className='text-[#9d46ea]'>Look a</span><span className='text-[#d2aa55]'>nd Find</span> <span className='text-[#b3ff02]'>Jobs</span>
                </h1>
                <p className='text-center lg:text-xl px-8 lg:px-0 mx-auto text-white'>Discover exciting career opportunities tailored for you. Explore job listings, find your  <br /> perfect match, and start your journey to success with us today!</p>
                <Link to='/allJobs' className="btn btn-primary px-6">Find Now</Link>
                
            </div>
        </div>
    );
};

export default BannerText;