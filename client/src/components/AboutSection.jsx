import {useEffect, useState} from "react";
import {DashboardInformation, DonorDonationList} from "../apiRequest/api.js";


const AboutSection = () => {

    const [informations, setInformations] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const List = await DashboardInformation();
                setInformations(List.data);
                console.log("from ui", List.data);
            } catch (error) {
                console.error("Error fetching :", error);
            }
        })();
    }, []);

    return (
        <>
            <section className="flex flex-row md:flex-row items-center justify-center p-8 gap-10 bg-white ">
                {/* Left Cards */}
                <div className="container grid grid-cols-12 mb-5">
                <div className="col-span-6 flex flex-col gap-6 ">
                    <div className=" flex flex-col justify-center items-center absolute top-150 left-10 bg-blue-100 text-center p-6 rounded-lg shadow-md w-32 h-50">
                        <p className="text-2xl font-bold text-blue-600">{informations.donors}</p>
                        <p className="mt-2 text-gray-700">Donar</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-blue-100 absolute top-205 left-10 text-center p-6 rounded-lg shadow-md w-32 h-50">
                        <p className="text-2xl font-bold text-blue-600">{informations.volunteers}</p>
                        <p className="mt-2 text-gray-700">Volunteer</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-blue-100 text-center absolute top-175 left-50 p-6 rounded-lg shadow-md w-32 h-50">
                        <p className="text-2xl font-bold text-blue-600">{informations.events}</p>
                        <p className="mt-2 text-gray-700">Event</p>
                    </div>
                </div>

                {/* Right Text */}
                <div className="col-span-6 ">
                    <h2 className="text-3xl font-bold mb-4 font-mono">About us</h2>
                    <hr className="border-orange-500 border-[2px]" />
                    <div className=" bg-red-500 mb-6"></div>
                    <p className="text-gray-700 mb-4">
                        At <span className="font-bold">KindVast</span>, we believe in the power of kindness and
                        collective action <br/>to create a better world. Our mission is to connect compassionate<br/>
                        individuals{' '}
                        <span className="text-red-500">●</span> with meaningful opportunities to donate, volunteer, and<br/>
                        support causes that transform lives.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Through transparency, inclusivity, and community-driven initiatives, we <br/>aim to inspire
                        generosity and foster lasting impact. Join us in building a <br/>kinder, more compassionate world
                        —{' '}
                        <span className="text-sky-500">“one act of kindness at a time”.</span>
                    </p>
                    <button className="mt-20 float-right bg-orange-500 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-full">
                        Learn more
                    </button>
                </div>
                </div>
            </section>
        </>
    );
}

export default AboutSection;