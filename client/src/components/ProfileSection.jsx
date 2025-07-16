import {RiUserSettingsFill} from "react-icons/ri";
import {useEffect, useState} from "react";
import {fileUpload, updateProfile, userDetails} from "../apiRequest/api.js";
import {ErrorToast, SuccessToast} from "../Helper/helper.js";

const ProfileSection = () => {
    const [file,setFile] = useState(null);
    const [change, setChange] = useState({});
    const [formdata, setFormdata] = useState({
        email: "",
        firstName: "",
        lastName: "",
        profileImg: "",
        contactNo: "",
        address: "",
    });

    const fileUploadFun = async () => {
        if (!file) {
            ErrorToast("Please select a file");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const result = await fileUpload(formData);
        console.log("picture",result);
        return result?.data?.file.filename;
    };



    useEffect(() => {
        (async () => {
            try {
                const Details = await userDetails();
                console.log("Donations from ui",Details?.data);
                if(Details)
                {
                    setFormdata({
                        email: Details?.data?.email,
                        firstName: Details?.data?.firstName,
                        lastName: Details?.data?.lastName,
                        profileImg: Details?.data?.profileImg,
                        contactNo: Details?.data?.contactNo,
                        address: Details?.data?.address,
                    })
                }
                console.log(formdata);

            } catch (error) {
                console.error("Error fetching :", error);
            }
        })();
    }, [change]);

    const handleChange = (e) => {
        const { name, value,files } = e.target;
        if (name === 'profileImg') {
            const file =files[0];
            setFile(e.target.files[0]);
            setFormdata({ ...formdata, profileImg: URL.createObjectURL(file) });
        } else {
            setFormdata({ ...formdata, [name]: value });
        }
    };
    const submitData = async (e) => {
        e.preventDefault();
        try {
            let img;
            if(file){
                img = await  fileUploadFun();

            }
            console.log("profileImg = ",img)
            const requestBody = {
                email: formdata.email,
                firstName: formdata.firstName,
                lastName: formdata.lastName,
                profileImg: img || formdata.profileImg,
                contactNo: formdata.contactNo,
                address: formdata.address,
                // If you need to add a file, handle it separately.
            };
            // if (file) updateData.append("file", file);



            const response = await updateProfile(requestBody);


            if (response.status) {
                SuccessToast(" updated successfully!");
                setFile(null);

                setChange(formdata);
            } else {
                ErrorToast("Failed to update.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Something went wrong.");
        }
    };
    return (
        <>
        <section className=" my-10 mx-50">

            <div className="flex flex-row justify-center gap-2 mb-3">
                <span><RiUserSettingsFill size={30} className="text-gray-700"/></span>
                <h1 className="text-2xl text-gray-700 font-mono font-semibold">Profile Details</h1>

            </div>

            <div
                className="grid grid-cols-12  p-5 space-x-20 bg-gray-900   rounded-xl shadow-2xl text-md font-semibold text-orange-400 ">
                <div className="col-span-12 ">
                    <div
                        className="w-20 h-20  rounded-md border-2 border-orange-400 overflow-hidden">
                        <img
                            alt="Donor Profile"

                            src={file ? formdata.profileImg : `http://localhost:5050/upload-file/${formdata?.profileImg}`}
                            className="w-full h-full object-cover"
                            onClick={() => window.open(`http://localhost:5050/upload-file/${formdata?.profileImg}`, "_blank")}

                        />

                    </div>
                    <div className="my-4">
                        <label
                            htmlFor="avatar"
                            className="cursor-pointer w-full text-center py-2 px-1 bg-orange-500 text-white rounded-md text-[12px] font-semibold hover:bg-blue-500"
                        >
                            Change Photo
                        </label>
                        <input
                            id="avatar"
                            name="profileImg"
                            type="file"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </div>


                </div>
                <div className="col-span-6">
                    <label>First Name :</label>
                    <input
                        type="text" name="firstName" value={formdata.firstName} onChange={handleChange}
                        className="w-full rounded-md pl-2  text-white border border-orange-300 outline-none focus:outline-none"/>
                </div>

                <div className="col-span-6">
                    <label>Last Name :</label>
                    <input
                        type="text" name="lastName" value={formdata.lastName} onChange={handleChange}
                        className="w-full  pl-2 rounded-md text-white border border-orange-300 outline-none focus:outline-none"/>
                </div>

                <div className="col-span-6">
                    <label>Email :</label>
                    <input
                        type="email" name="email"  value={formdata.email} onChange={handleChange}
                        className="w-full pl-2  rounded-md text-white border border-orange-300 outline-none focus:outline-none"/>
                </div>

                <div className="col-span-6">
                    <label>Address :</label>
                    <input
                        type="text" name="address" value={formdata.address} onChange={handleChange}
                        className="w-full pl-2  rounded-md text-white border border-orange-300 outline-none focus:outline-none"/>
                </div>

                <div className="col-span-6">
                    <label>Contact Number :</label>
                    <input
                        type="phone" name="contactNo" value={formdata.contactNo} onChange={handleChange}
                        className="w-full pl-2 rounded-md text-white border border-orange-300 outline-none focus:outline-none"/>
                </div>
                <div className="col-span-6">
                    <button
                        className="w-20 mt-5 rounded-md border p-1 font-bold font-mono text-sm hov bg-orange-500 text-white
                    hover:bg-blue-400 border-2 hover:scale-110 hover:border-blue-400
                    border-orange-400 utline-none focus:outline-none"
                        onClick={submitData}
                    >Update
                    </button>
                </div>
            </div>

        </section>
            </>
    )

}
export default ProfileSection;