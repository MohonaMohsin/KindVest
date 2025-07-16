import {IoGiftSharp, IoNotifications, IoTimer} from "react-icons/io5";
import { MdOutlineWork} from "react-icons/md";
import {useEffect, useState} from "react";
import {AdminDashboardStat, VolDashboardStat} from "../apiRequest/api.js";
import {useNavigate} from "react-router-dom";


const VolunteerDashboard = () => {
    const [inform,setInform] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await VolDashboardStat();
                //console.log("api",result);
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
                        <h2 className="text-2xl font-mono font-semibold">Volunteer Dashboard</h2>
                        <hr className="w-63 border-[1.5px] border-orange-500"/>
                    </div>
                    <div className="col-span-4 m-5 flex items-center justify-end">
                        <IoNotifications className="w-10 h-8 text-orange-700"/>
                    </div>


                    <div
                        className="col-span-4  mx-4 mb-2 p-10 mt-3 shadow-2xl rounded-xl border-[1.5px] border-gray-200 bg-gray-5">
                        <div className="flex flex-row gap-2  items-center justify-center mb-2">
                            <span>
                                <IoGiftSharp className="w-12 h-8 text-orange-600"/>
                            </span>
                            <span className="text-[14px] font-semibold"> Total Donation Delivered</span>


                        </div>
                        <hr className="w-70 ml-3 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.delivered}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => navigate('/volunteer/delivered-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>

                    <div
                        className="col-span-4  mx-4 mt-3 mb-2 p-10 shadow-2xl rounded-xl border-[1.5px] border-gray-200 bg-gray-5">
                        <div className="flex flex-row gap-2  items-center justify-center mb-2">
                            <span>
                              <MdOutlineWork className="w-12 h-8 text-teal-300"/>
                            </span>
                            <span className="text-[14px] font-semibold"> New Delivery Request</span>


                        </div>
                        <hr className="w-70 ml-7 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.pending}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => navigate('/volunteer/pending-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>
                    <div
                        className="col-span-4  mx-4 mt-3 mb-2 p-10 shadow-2xl rounded-xl border-[1.5px] border-gray-200 bg-gray-5">
                        <div className="flex flex-row  items-center justify-center mb-2">
                            <span>
                                <IoTimer className="w-12 h-8 text-green-400"/>
                            </span>
                            <span className="text-[14px] font-semibold"> Yet Not Received Donation By Admin </span>


                        </div>
                        <hr className="w-70 ml-4 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.received}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => navigate('/volunteer/received-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>

                </div>


            </section>
        </>
    );
}
export default VolunteerDashboard;