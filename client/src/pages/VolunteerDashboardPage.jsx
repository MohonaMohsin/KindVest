
import VolunteerDashboard from "../components/VolunteerDashboard.jsx";
import VolunteerNewDonationTable from "../components/VolunteerNewDonationTable.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";


const VolunteerDashboardPage = () => {
    return (
        <>
        <MasterLayout>
            <VolunteerDashboard/>
            <VolunteerNewDonationTable/>
        </MasterLayout>
        </>
    );
}
export default VolunteerDashboardPage;