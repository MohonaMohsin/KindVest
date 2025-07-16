
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";

import MasterLayout from "../../MasterLayout/MasterLayout.jsx";

const HomePage = () => {
    return (
        <div>
            <MasterLayout>
            <HeroSection/>
            <AboutSection/>
            </MasterLayout>
        </div>
    );
};

export default HomePage;