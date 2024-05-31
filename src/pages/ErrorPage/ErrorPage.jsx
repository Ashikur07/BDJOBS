import { Link, useRouteError } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
 import Error from "../../assets/Error.json"


const ErrorPage = () => {
    useEffect(() => {
        document.title = 'Error';
    }, []);

    const error = useRouteError();

    return (
        <div className="text-white bg-gray-100 card w-1/2 mt-10 mx-auto p-5 lg:mt-30 items-center justify-center text-center border lg:h-[80vh]">
            {
                error.status === 404 && <div >
                            <div>
                            <Lottie className="rounded-xl w-800px"  animationData={Error} />
                            </div>
                   
                    <p className="py-5 lg:text-2xl mt-10 text-black font-medium">Go back where you from</p>
                    <Link to="/"><button className="btn mb-16 btn-success  text-white hover:btn-info px-6">Home</button></Link>

                </div>
            }
        </div>
    );
};

export default ErrorPage;