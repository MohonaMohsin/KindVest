import {IoNotifications} from "react-icons/io5";
import {LiaUsersSolid} from "react-icons/lia";
import {MdEventAvailable, MdOutlineIncompleteCircle} from "react-icons/md";
import {BiSolidMessageRoundedEdit} from "react-icons/bi";
import {FcProcess} from "react-icons/fc";
import {useEffect, useState} from "react";
import {AdminDashboardStat} from "../apiRequest/api.js";
import {useNavigate} from "react-router-dom";


const AdminDashboard = () => {
    const [inform,setInform] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await AdminDashboardStat();
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
                        <h2 className="text-2xl font-mono font-semibold">Admin Dashboard</h2>
                        <hr className="w-50 border-[1.5px] border-orange-500"/>
                    </div>
                    <div className="col-span-4 m-5 flex items-center justify-end">
                        <IoNotifications className="w-10 h-8 text-orange-700"/>
                    </div>


                    <div
                        className="col-span-4  mx-4 mb-2 p-10 mt-3 shadow-xl rounded-xl border-[1.5px] border-gray-100">
                        <div className="flex flex-row gap-2  justify-center mb-2">
                            <span>
                                <MdOutlineIncompleteCircle className="w-12 h-8 text-yellow-500"/>
                            </span>
                            <span className="text-[18px] font-semibold"> Total Completion Donation</span>


                        </div>
                        <hr className="w-70 ml-3 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.AdminReceived}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={()=>navigate('/admin/completion-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>

                    <div
                        className="col-span-4  mx-4 mt-3 mb-2 p-10 shadow-xl rounded-xl border-[1.5px] border-gray-100">
                        <div className="flex flex-row gap-2  justify-center mb-2">
                            <span>
                              <BiSolidMessageRoundedEdit className="w-12 h-8 text-red-600"/>
                            </span>
                            <span className="text-lg font-semibold"> New Delivery Request</span>


                        </div>
                        <hr className="w-70 ml-7 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.AdminPending}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={()=>navigate('/admin/pending-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details </button>
                        </div>
                    </div>
                    <div
                        className="col-span-4  mx-4 mt-3 mb-2 p-10 shadow-xl rounded-xl border-[1.5px] border-gray-100">
                        <div className="flex flex-row gap-2  justify-center mb-2">
                            <span>
                                <FcProcess className="w-12 h-8"/>
                            </span>
                            <span className="text-lg font-semibold"> Total On-going Request</span>


                        </div>
                        <hr className="w-70 ml-7 border-[1px] border-orange-500"/>
                        <h4 className="flex justify-center my-3">{inform.AdminAccepted}</h4>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={()=>navigate('/admin/accept-donation')}
                                className="bg-blue-400 text-[11px] text-bold text-white px-2 rounded-md hover:bg-orange-500"> Details
                            </button>
                        </div>
                    </div>

                </div>


            </section>
        </>
    );
}
export default AdminDashboard;