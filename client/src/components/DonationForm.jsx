import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ErrorToast, IsEmpty } from "../Helper/helper.js";
import { donateNow, fileUpload } from "../apiRequest/api.js";

const DonationForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        donationDescription: "",
        quantity: "",
        donationPic: "",
        collectionAddress: ""
    });
    const [file, setFile] = useState(null);
    const { id: eventId } = useParams();

    const fileUploadFun = async () => {
        if (!file) {
            ErrorToast("Please select a file");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const result = await fileUpload(formData);
        return result?.data?.file.filename;
    };

    const submitData = async (e) => {
        e.preventDefault();

        if (IsEmpty(data.donationDescription)) {
            ErrorToast("Donation description is required.");
            return;
        }
        if (IsEmpty(data.collectionAddress)) {
            ErrorToast("Collection address is required.");
            return;
        }

        const img = await fileUploadFun();
        const fullData = { ...data, donationPic: img };
        const result = await donateNow(eventId, fullData);
        if (result === true) {
            navigate("/donor-dashboard");
        }
    };

    return (
        <section className="rounded-md p-2 flex flex-col shadow-xl bg-gray-200">
            <div className=" flex self-end relative">
                <button
                    onClick={() => navigate(`/payment`)}
                    type="button"
                    className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-green-600 px-3.5 py-2.5 font-semibold text-white hover:bg-green-700"
                >
                    Go to Payment
                </button>
            </div>
            <div className="flex items-center justify-center px-4  w-300">
                <div className="xl:mx-auto xl:w-full shadow-lg p-4 xl:max-w-sm 2xl:max-w-md rounded-xl bg-white ">
                    <h2 className="text-center text-2xl font-bold leading-tight text-orange-400 bg-gray-900 border border-orange-500 rounded-xl">
                        Donate Now
                    </h2>

                    <form className="mt-4" method="POST" action="#">
                        <div className="space-y-4">
                            {/* Donation Description */}
                            <div>
                                <label className="text-base font-medium text-orange-400">Donation Description</label>
                                <input
                                    onChange={(e) => setData({...data, donationDescription: e.target.value})}
                                    value={data.donationDescription}
                                    placeholder="Describe your donation"
                                    type="text"
                                    className="flex h-20 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400"
                                />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="text-base font-medium text-orange-400">Quantity</label>
                                <input
                                    onChange={(e) => setData({...data, quantity: e.target.value})}
                                    value={data.quantity}
                                    placeholder="0"
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400"
                                />
                            </div>

                            {/* Collection Address */}
                            <div>
                                <label className="text-base font-medium text-orange-400">Collection Address</label>
                                <input
                                    onChange={(e) => setData({...data, collectionAddress: e.target.value})}
                                    value={data.collectionAddress}
                                    placeholder="Enter address where we can collect donation"
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400"
                                />
                            </div>

                            {/* Donation Picture */}
                            <div>
                                <label className="block text-sm font-medium text-orange-400">Donation Picture</label>
                                <input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    type="file"
                                    className="mt-1 text-sm text-orange-300 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-400 file:text-white hover:file:bg-blue-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    onClick={submitData}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold text-white hover:bg-blue-400"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default DonationForm;
