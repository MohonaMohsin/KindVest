
import DonorDashboard from "../components/DonorDashboard.jsx";
import DonorTable from "../components/DonorTable.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";


const DonorDashboardPage = () => {
    return (
        <>
        <MasterLayout>
            <DonorDashboard />
            <DonorTable/>
        </MasterLayout>
        </>
    );
}
export default DonorDashboardPage;