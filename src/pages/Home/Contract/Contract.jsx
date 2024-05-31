import Lottie from "lottie-react";
import contract from "../../../assets/contract.json"

const Contract = () => {

    return (
        <div className="pb-20 pt-2 shadow-2xl text-center mx-auto rounded-2xl bg-gray-100 ">
        <h2 className="text-xl lg:text-4xl  font-bold mt-10 mb-10">Contract Us !</h2>
            <div className="flex justify-center">
            <Lottie className="rounded-xl w-[300px] lg:w-[600px]"  animationData={contract} />
            </div>
        </div>
    );
};

export default Contract;