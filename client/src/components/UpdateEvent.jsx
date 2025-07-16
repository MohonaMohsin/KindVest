


import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {fileUpload, findDonationList, FindEventById, UpdateOnGoingEvent} from "../apiRequest/api.js";
import {ErrorToast, SuccessToast} from "../Helper/helper.js";

const UpdateEvent= () => {
    const { id } = useParams(); //
    const navigate = useNavigate();
    const [file,setFile] = useState(null);

    const [formData, setFormData] = useState({
        donationId: "",
        description: "",
        areaName: "",
        status: "",
        title:"",
       bannerImg: ""
    });
  //  const [preview, setPreview] = useState(null);
  //  const [file, setFile] = useState(null);
      const [donations, setDonations] = useState([]);
    // Fetch existing company data
    useEffect(() => {
        (async () => {
            try {
                const response = await FindEventById(id);

                const data = response?.data[0];
                console.log("Fetched data", data);
                console.log("Form Data State", {
                    donationId: data.donationDetails?._id,
                    description: data.description,
                    areaName: data.areaName,
                    status: data.status,
                    title: data.donationDetails?.title,
                    bannerImg: data.bannerImg
                });

                if (data) {
                    setFormData({
                        donationId: data.donationDetails?._id,
                        description: data.description,
                        areaName: data.areaName,
                        status: data.status,
                        title: data.donationDetails?.title,
                        bannerImg: data.bannerImg
                        //logo: data.logo,
                    });
                   // setPreview(`http://localhost:5050/upload-file/${data.logo}`);
                }
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        })();
    }, [id]);

    //donations list

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
                const DonationList = await findDonationList();
                setDonations(DonationList);
                console.log("Don",DonationList);

            } catch (error) {
                console.error('Error fetching :', error);
            }
        })();
    }, []);




    // Handle logo upload
    /*const handleFileChange = (e) => {
        //const selectedFile = e.target.files[0];
      //  setFile(selectedFile);
      //  setPreview(URL.createObjectURL(selectedFile));
    };*/

    // Handle form submission
    const submitData = async (e) => {
        e.preventDefault();
        try {
            let img;
            if(file){
                 img = await  fileUploadFun();

            }
            console.log("bannerImg = ",img)
            const requestBody = {
                donationId: formData.donationId,
                description: formData.description,
                areaName: formData.areaName,
                status: formData.status,
                bannerImg: img
                // If you need to add a file, handle it separately.
            };
           // if (file) updateData.append("file", file);



            const response = await UpdateOnGoingEvent(id,requestBody);


            if (response.status) {
                SuccessToast(" updated successfully!");
                navigate("/admin-dashboard");
            } else {
                ErrorToast("Failed to update.");
            }
        } catch (error) {
            console.error("Error updating company:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <>
            <section className="rounded-md p-2 shadow-xl bg-gray-100 flex justify-center ">
                <div
                    className="flex  items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                    <div
                        className="xl:mx-auto xl:w-full shadow-lg p-4 xl:max-w-sm 2xl:max-w-md rounded-xl bg-white">
                        <div className="mb-2 flex justify-center"/>
                        <h2 className="text-center text-2xl font-bold leading-tight text-orange-400">
                            Update a Donation Event
                        </h2>

                        <form className="mt-8" method="POST" action="#">
                            <div className=" grid grid-cols-12 space-y-5 space-x-3">
                                <div className="col-span-6">
                                    <label className="text-base font-medium text-orange-400">
                                        Tittle
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="donationId"
                                            onChange={(e) => setFormData({...formData, donationId: e.target.value})}
                                            value={formData.donationId}

                                            placeholder="Select a title"

                                            className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value={formData.donationId}>{formData.title} </option>
                                            {donations?.data?.map((d) => (
                                                <option key={d._id} value={d._id}>
                                                    {d.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-orange-400">
                                            Area Name
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                areaName: e.target.value
                                            })}
                                            value={formData.areaName}
                                            placeholder="write your area"
                                            type="textarea"
                                            className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-orange-400">
                                            Description
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                description: e.target.value
                                            })}
                                            value={formData.description}
                                            placeholder="write your description"
                                            type="textarea"
                                            className="flex h-20 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-orange-400">
                                            Status
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <select
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value
                                                })
                                            }
                                            value={formData.status}
                                            className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm text-orange-600 placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            required
                                        >
                                            <option value="">Select status</option>
                                            <option value="pending">Pending</option>
                                            <option value="running">Running</option>
                                            <option value="finished">Finished</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-7 ">
                                    <label className="block mt-1 text-sm font-medium text-orange-400">Banner
                                        Picture</label>
                                    <input
                                        onChange={(e) => setFile(e.target.files[0])}
                                        name="avatar"
                                        type="file"
                                        className="mt-1 flex items-center justify-center w-50 text-sm text-orange-300 file:mr-4 file:py-3 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold
                                file:bg-orange-400 file:text-white hover:file:bg-blue-500"
                                    />
                                </div>

                                <div className="col-span-12">
                                    <button
                                        onClick={submitData}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-400"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default UpdateEvent;
