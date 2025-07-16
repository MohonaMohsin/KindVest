import  { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../Helper/helper.js";
import {createDonation} from "../apiRequest/api.js";


const CreateDonation= () => {
    const navigate = useNavigate();
    const [data, setData] = useState({title: "", description: ""});



    const submitData = async (e) => {
        e.preventDefault();

        if (IsEmpty(data.title)) {
            ErrorToast("Title is required.");
        } else if (IsEmpty(data.description)) {
            ErrorToast("Password is required.");
        } else {

            console.log("Login data:", data);
            let result = await createDonation(data);
            if (result === true) {
                navigate("/admin-dashboard");
            }

        }
    };

    return (
        <section className="rounded-md p-2 shadow-xl bg-gray-100 flex justify-center ">
            <div
                className="flex  items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                <div
                    className="xl:mx-auto xl:w-full shadow-lg p-4 xl:max-w-sm 2xl:max-w-md rounded-xl bg-white">
                    <div className="mb-2 flex justify-center"/>
                    <h2 className="text-center text-2xl font-bold leading-tight text-orange-400">
                        Create a Donation Program
                    </h2>

                    <form className="mt-8" method="POST" action="#">
                        <div className="space-y-5">
                            <div>
                                <label className="text-base font-medium text-orange-400">
                                    Tittle
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setData({...data, title: e.target.value})}
                                        value={data.title}
                                        placeholder="Select a title"
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium text-orange-400">
                                        Description
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setData({
                                            ...data,
                                            description: e.target.value
                                        })}
                                        value={data.description}
                                        placeholder="write your description"
                                        type="textarea"
                                        className="flex h-10 w-full rounded-md border border-orange-400 bg-transparent px-3 py-2 text-sm placeholder:text-orange-400 focus:outline-orange-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    onClick={submitData}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-400"
                                    type="submit"
                                >
                                    Create Donation
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreateDonation;
