
import AdminDashboard from "../components/AdminDashboard.jsx";
import AdminTab from "../components/AdminTab.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";



const AdminDashboardPage = () => {
    return (
        <div>
        <MasterLayout>
            <AdminDashboard />
            <AdminTab/>
        </MasterLayout>
        </div>
    );
}
export default AdminDashboardPage;