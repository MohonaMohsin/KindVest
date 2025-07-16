import MenuBar from "../src/components/MenuBar.jsx";
import Footer from "../src/components/Footer.jsx";


// eslint-disable-next-line react/prop-types
const MasterLayout = ({children}) => {
    return (
        <>
            <MenuBar/>
            <div>{children}</div>
            <Footer/>
        </>
    );
};

export default MasterLayout;