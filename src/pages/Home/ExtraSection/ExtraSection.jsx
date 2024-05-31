import { FiUsers } from "react-icons/fi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ExtraSection = () => {
    return (
        <div className="mt-32 mb-28 bg-base-200 rounded-xl flex flex-col-reverse lg:flex-row lg:w-[1230px] mx-auto p-5 lg:p-10">

            <div className="lg:w-2/3 md:mx-auto flex flex-col md:flex-row lg:flex-row gap-4 items-center">
                <div className="space-y-4">
                    <img data-aos="flip-left" data-aos-duration="1000" className="rounded-xl md:w-80 lg:w-72 h-80" src="https://i.ibb.co/v1wGVVd/premium-photo-1661409321575-298f9b09d512-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                    <img data-aos="flip-up" data-aos-duration="1000" className="rounded-xl w-full md:w-80 lg:w-72 h-80 lg:h-72" src="https://i.ibb.co/nk0pK0K/photo-1448932223592-d1fc686e76ea-q-80-w-2069-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                </div>

                <div>
                    <img data-aos="flip-right" data-aos-duration="1000" className="rounded-xl w-[400px] h-[400px] md:h-[500px] lg:h-[500px]" src="https://i.ibb.co/D41NN5p/photo-1579389083046-e3df9c2b3325-q-80-w-1887-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                </div>
            </div>

            <div data-aos="zoom-in-left" data-aos-duration="3000" className=" lg:w-1/3 mx-auto">
                <div className="space-y-1">
                    <h1 className="mt-10 lg:mt-28 text-2xl lg:text-3xl font-bold">We are Offering All category related jobs</h1>
                    <p className="text-[#7e8d8d]">Explore a wide range of job opportunities spanning <br /> various  categories, ensuring you find the perfect fit for <br /> your career aspirations</p>
                </div>

                <div className="mt-14 flex flex-col lg:flex-row gap-10">

                    <div className="flex gap-4">
                        <div className="rounded-xl border-[3.5px] border-[#3A8BEA] p-4">
                            <FiUsers className=" text-4xl text-[#3A8BEA]" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold">65k</h1>
                            <p className="font-bold">Satisfied People</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="rounded-xl border-[3.5px] border-[#3A8BEA] p-3">
                            <VscVerifiedFilled className=" text-5xl text-[#3A8BEA]" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold">25k</h1>
                            <p className="font-bold">Varified Jobs</p>
                        </div>
                    </div>

                </div>

                <div className="text-center lg:text-left">
                    <Link to='/allJobs' className="mt-14 mb-5 lg:mb-0 rounded-none btn bg-[#3A8BEA] text-white">Find Jobs Now</Link>
                </div>

            </div>
        </div>
    );
};

export default ExtraSection;