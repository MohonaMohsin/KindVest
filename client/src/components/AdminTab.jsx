import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateDonation from "./CreateDonation.jsx";
import CreateEvent from "./CreateEvent.jsx";
import OnGoingEvents from "./OnGoingEvents.jsx";
import ManageDonationTable from "./ManageDonationTable.jsx";

const AdminTab = () => {


    return (<>
            <div className="mx-4 my-5 p-4 bg-gray-100 rounded-lg">
                <div className="m-2 ">
                    <h2 className="text-2xl font-mono font-semibold">Manage Dashboard</h2>
                    <hr className="w-53 border-[1.5px] border-orange-500"/>
                </div>
                <Tabs className="overflow-hidden">
                    <TabList className="bg-orange-300 text-white  font-bold rounded-xl border-[1.5px] border-gray-100">
                        <Tab>Select Event</Tab>
                        <Tab>On-Going Donation Progress</Tab>
                        <Tab>Manage Donation</Tab>
                        <Tab>Create Donation</Tab>

                    </TabList>
                    {/* select  event*/}
                    <TabPanel>
                       <CreateEvent/>
                    </TabPanel>
                    <TabPanel>
                        <OnGoingEvents/>
                    </TabPanel>

                    <TabPanel> <ManageDonationTable/></TabPanel>
                    {/* select  event*/}
                    <TabPanel>
                      <CreateDonation/>
                    </TabPanel>
                </Tabs>
            </div>

        </>
    );
}

export default AdminTab;