import { IoNotifications} from "react-icons/io5";

import { MdPendingActions} from "react-icons/md";
import {FcApproval} from "react-icons/fc";
import {GrCompliance} from "react-icons/gr";
import {useEffect, useState} from "react";
import { DonorDashboardStat} from "../apiRequest/api.js";
import {useNavigate} from "react-router-dom";



const DonorDashboard = () => {
    const [inform,setInform] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await DonorDashboardStat();
                console.log("api",result);
                setInform(result.data);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        })();
    }, []);

    return (
        <>
            <section className="my-3 mx-2 bg-white">
                <div className="container grid grid-cols-12 gap-4">

                    <div className="col-span-8 m-4">
                        <h2 className="text-2xl font-mono font-semibold">Donor Dashboard</h2>
                        <hr className="w-50 border-[1.5px] border-orange-500"/>
                    </div>
                    <div className="col-span-4 m-5 flex items-center justify-end">
                        <IoNotifications className="w-10 h-8 text-orange-700"/>
                    </div>


                    <div
                        className="col-span-4  mx-4 mb-2 p-10 mt-3 shadow-2xl rounded-xl border-[1.5px] border-gray-200 bg-gray-5">
                        <div className="flex flex-row gap-2  items-center justify-center mb-2">
                            <span>
                                <FcApproval className="w-12 h-8"/>
                            </span>
                            <span className="text-[14px] font-semibold"> Total Donation Approved</span>


                        </div>
                        <hr className="w-70 ml-3 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.DonorAccepted}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => navigate('/donor/accept-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>

                    <div
                        className="col-span-4  mx-4 mt-3 mb-2 p-10 shadow-2xl rounded-xl border-[1.5px] border-gray-200 bg-gray-5">
                        <div className="flex flex-row gap-2  items-center justify-center mb-2">
                            <span>
                              <MdPendingActions className="w-12 h-8 text-red-500"/>
                            </span>
                            <span className="text-[14px] font-semibold"> Total Pending Donation</span>


                        </div>
                        <hr className="w-70 ml-7 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.DonorPending}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => navigate('/donor/pending-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>
                    <div
                        className="col-span-4  mx-4 mt-3 mb-2 p-10 shadow-2xl rounded-xl border-[1.5px] border-gray-200 bg-gray-5">
                        <div className="flex flex-row  items-center justify-center mb-2">
                            <span>
                                <GrCompliance className="w-12 h-8 text-green-400"/>
                            </span>
                            <span className="text-[14px] font-semibold"> Total Complete Donation </span>


                        </div>
                        <hr className="w-70 ml-4 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.DonorReceived}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => navigate('/donor/received-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>

                </div>


            </section>
        </>
    );
}
export default DonorDashboard;