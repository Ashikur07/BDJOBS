import { useEffect } from "react";
import Banner from "../Banner/Banner";
import Contract from "../Contract/Contract";
import ExtraSection from "../ExtraSection/ExtraSection";
import JobCategory from "../JobCategory/JobCategory";

const Home = () => {

    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div>
            <Banner></Banner>
            <JobCategory></JobCategory>
            <ExtraSection></ExtraSection>
            <Contract></Contract>
        </div>
    );
};

export default Home;