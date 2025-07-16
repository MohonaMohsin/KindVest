import {NavLink, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect, useRef, useState} from "react";
import {logout, userDetails} from "../apiRequest/api.js";
import {AiOutlineLogout, AiOutlineUser, AiTwotoneUnlock} from "react-icons/ai";


;


const MenuBar = () => {
    let isLogin = Cookies.get("token");
    console.log("token", isLogin);

    const [profile, setProfile] = useState([]);
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();
    let dropdownRef = useRef(null);

    useEffect(() => {
        (async () => {
            let result = await userDetails();
            setProfile(result?.data);
        })();
    },[]);

    console.log(profile);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    let logOutFunction = async () => {
        let result = await logout();
        if (result) {
            navigate("/");
        }
    }

    return (
        <>
            <section className=" bg-black sticky top-0 z-40">
                <div className="container mx-auto px-4 py-3">
                    <div className="grid grid-cols-12 ">
                        <div className="col-span-3 flex flex-row">
                            <div className="w-[40px] p-[2px]">
                                <img alt="logo" src="/kindvest-logo.png"/>
                            </div>
                            <span className="text-white text-lg">KindVest</span>
                        </div>
                        <div className="col-span-9">
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <ul className="navbar-nav flex gap-x-5 float-right text-white gap-x-2">
                                    <li className="nav-item hover:bg-orange-400
                                    hover:px-3 hover:py-[3px] hover: rounded-full p-[3px] active:bg-orange-400 active:px-3 active:py-[3px]">
                                        <NavLink
                                            className={({ isActive }) =>
                                                `p-[5px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                            }
                                            to={"/"}>Home </NavLink></li>

                                    <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px]">
                                        <NavLink
                                            className={({ isActive }) =>
                                                `p-[3px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                            }
                                            to={"/feedbacks"}>

                                            Testimonials</NavLink></li>
                                    <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px]   ">
                                        <NavLink
                                            className={({ isActive }) =>
                                                `p-[3px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                            }
                                            to={"/activity"}>All Activity</NavLink></li>

                                    {isLogin ? (<>
                                                {profile.role === "admin" ? (
                                                    <>

                                                        <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px] ">
                                                            <NavLink
                                                                className={({ isActive }) =>
                                                                    `p-[4px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                                                }
                                                                to={"/all-volunteers"}>

                                                                Volunteer List</NavLink></li>
                                                        <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px] ">
                                                            <NavLink
                                                                className={({ isActive }) =>
                                                                    `p-[3px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                                                }
                                                                to={"/admin/payment-details"}>Payment List</NavLink></li>
                                                    </>
                                                ) : profile.role === "donor" ? (
                                                    <>
                                                        <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px]">
                                                            <NavLink
                                                                className={({ isActive }) =>
                                                                    `p-[3px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                                                }
                                                                to={"/donorId/payment-details"}>Payment Donations</NavLink></li>

                                                    </>
                                                ) : (
                                                    <>
                                                        <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px]">
                                                            <NavLink
                                                                className={({ isActive }) =>
                                                                    `p-[3px] rounded-full ${isActive ? 'bg-orange-400' : ''}`
                                                                }
                                                                to={"/"}>Delivery History</NavLink></li>

                                                    </>
                                                )}
                                                <li className="nav-item bg-blue-400  rounded-full p-[4px]">
                                                    <NavLink

                                                        to={`/${profile.role}-dashboard`}>Dashboard</NavLink></li>

                                                <div
                                                    className="w-8 h-8 rounded-full border border-white border-[1px] overflow-hidden">
                                                    <img
                                                        alt="profile"
                                                        src={`http://localhost:5050/upload-file/${profile?.profileImg}`}
                                                        className="w-full h-full object-cover"
                                                        onClick={() => setOpen(!open)}
                                                    />
                                                </div>
                                                {open && (

                                                    <div
                                                        ref={dropdownRef}
                                                        className="flex flex-col absolute right-0 z-10 mt-12 w-56 origin-top-right rounded-md shadow-lg bg-black border border-gray-200">
                                                        <div
                                                            className="m-2 w-15 h-15 rounded-full border border-white border-[1px] overflow-hidden">

                                                            <img
                                                                alt="profile"
                                                                src={`http://localhost:5050/upload-file/${profile?.profileImg}`}
                                                                className="w-full h-full object-cover"

                                                            />
                                                        </div>

                                                        <h4 className=" text-white mt-3 mx-2 font-semibold text-sm">{profile?.firstName} {profile?.lastName}</h4>
                                                        <i className=" text-white text-xs mx-2">{profile?.email}</i>
                                                        <hr className="border border-gray-500 border-[0.6px] mt-2"/>

                                                        <ul className="mt-4 mb-1 mx-2 text-white">
                                                            <li className=" mb-2 bg-gray-500 hover:bg-orange-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <span className="flex flex-row gap-3"><AiOutlineUser
                                                                    className="w-6 h-6 bg-black rounded-full"/>
                                                                    <NavLink
                                                                        to={`/user-details/`}>Profile</NavLink></span>
                                                            </li>

                                                            <li className="mb-2 bg-gray-500 hover:bg-orange-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <span className="flex flex-row gap-3"><AiTwotoneUnlock
                                                                    className="w-6 h-6 bg-black rounded-full"/>
                                                                    <NavLink to={`/changed-password/${profile?.email}`}>Change Password</NavLink></span>
                                                            </li>
                                                            <li className="bg-gray-500  hover:bg-red-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <span className="flex flex-row gap-3"><AiOutlineLogout
                                                                    className="w-6 h-6 bg-black  rounded-full"/>
                                                                    <button
                                                                        onClick={logOutFunction}>Logout</button></span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </>
                                        ) :
                                        (
                                            <>
                                            <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px]">
                                                    <NavLink to={"/login"}>Login</NavLink></li>
                                                <li className="nav-item hover:bg-orange-400 hover:px-3 hover:py-[3px] hover: rounded-full p-[3px] ">
                                                    <NavLink to={"/register"}>Register</NavLink></li>
                                            </>
                                        )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MenuBar;