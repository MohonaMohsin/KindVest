import { NavLink, useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, SuccessToast } from "../Helper/helper.js";
import { fileUpload, register } from "../apiRequest/api.js";
import Loading from "./Loading.jsx";
import {useRef, useState} from "react";

const RegisterForm = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const contactNoRef = useRef();
    const addressRef = useRef();

    const roleDonorRef = useRef(null);
    const roleVolunteerRef = useRef(null);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);


    //setLoading(true);

    const fileUploadFun = async () => {
        if (!file) {
            ErrorToast("Please select a file");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const result = await fileUpload(formData);
        console.log(result);
        return result?.data?.file.filename;
    };

    const submitData = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const contactNo = contactNoRef.current.value;
        const address = addressRef.current.value;
        let role = "";

        console.log(email, password, firstName, lastName, contactNo,address);

        if (roleDonorRef.current.checked) {
            role = roleDonorRef.current.value;
        } else if (roleVolunteerRef.current.checked) {
            role = roleVolunteerRef.current.value;
        }

        const profileImg = await fileUploadFun();
        console.log("img",profileImg);

        console.log(email, password, firstName, lastName, contactNo,profileImg);

        if (IsEmpty(email)) {
            ErrorToast("Email is required.");
        } else if (IsEmpty(password)) {
            ErrorToast("Password is required.");
        } else if (IsEmpty(firstName)) {
            ErrorToast("First Name is required.");
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name is required.");
        } else if (IsEmpty(contactNo)) {
            ErrorToast("contact is required.");
        } else if (IsEmpty(profileImg)) {
            ErrorToast("Image is required.");
        } else if (IsEmpty(role)) {
            ErrorToast("Role is required.");
        } else {
            setLoading(true);
            const reqBody = { email, password, firstName, lastName,  profileImg,contactNo,address, role };
            const result = await register(reqBody);

            if (result.status === true) {
                SuccessToast(result.msg);
                navigate("/");
                setLoading(false);
            }
            else{
                ErrorToast(result.msg);
                setLoading(false);
            }
        }
    };

    return (
        <div className>
            {loading && <Loading />}
            <section className=" p-4 bg-gray-100 flex justify-center">

                <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-orange-400 mb-2">
                        Create Your Account
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-600 hover:underline">
                            Sign In
                        </NavLink>
                    </p>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-orange-400">First Name</label>
                                <input
                                    ref={firstNameRef}
                                    name="first_name"
                                    type="text"
                                    placeholder="First Name"
                                    className="mt-1 w-full border border-orange-400 rounded-md px-3 py-2 text-orange-600 text-sm focus:ring-2 focus:ring-gray-400 outline-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-orange-400">Last Name</label>
                                <input
                                    ref={lastNameRef}
                                    name="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    className="mt-1 w-full border border-orange-400 rounded-md px-3 py-2 text-orange-500 text-sm focus:ring-2 focus:ring-gray-400 outline-orange-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-orange-400">Email Address</label>
                                <input
                                    ref={emailRef}
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                    className="mt-1 w-full border border-orange-400 text-orange-500 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-oraange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-orange-400">Contact No</label>
                                <input
                                    ref={contactNoRef}
                                    name="phone"
                                    type="tel"
                                    placeholder="+880"
                                    className="mt-1 w-full border border-orange-400 text-orange-500 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-orange-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-orange-400">Address</label>
                                <input
                                    ref={addressRef}
                                    name="address"
                                    type="address"
                                    placeholder="address"
                                    className="mt-1 w-full border border-orange-400 rounded-md px-3 py-2 text-orange-500 text-sm focus:ring-2 focus:ring-gray-400 outline-orange-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-orange-400 mb-2">Registering As</label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            ref={roleDonorRef}
                                            type="radio"
                                            name="role"
                                            value="donor"
                                            className="text-black outline-orange accent-orange-600 focus:ring-orange-600"
                                        />
                                        <span className="text-sm text-orange-400">Donor</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            ref={roleVolunteerRef}
                                            type="radio"
                                            name="role"
                                            value="volunteer"
                                            className="text-orange-400 outline-orange-400 accent-orange-500 focus:ring-orange-600"
                                        />
                                        <span className="text-sm text-orange-400">Volunteer</span>
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-orange-400">Password</label>
                            <input
                                ref={passwordRef}
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="mt-1 w-full border border-orange-400 text-orange-500 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-orange-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-orange-400">Profile Picture</label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                name="avatar"
                                type="file"
                                className="mt-1 w-full text-sm text-orange-300 file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold
                                file:bg-orange-400 file:text-white hover:file:bg-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                onClick={submitData}
                                type="button"
                                className="w-full bg-orange-500 text-white py-2.5 rounded-md font-semibold hover:bg-blue-500 transition duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RegisterForm;
