import { useEffect, useState } from "react";
import { OnGoingEventList } from "../apiRequest/api.js";
import {MdEditDocument} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const OnGoingEvents = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const eventList = await OnGoingEventList();
                setEvents(eventList.data);
                console.log("Don", eventList);
            } catch (error) {
                console.error("Error fetching :", error);
            }
        })();
    }, []);

    return (
        <section className="rounded-md p-4 shadow-xl bg-gray-100">
            <div className="m-4 flex justify-center">
                <h2 className="text-2xl text-gray-700 font-mono font-semibold">On Going Donations</h2>

            </div>

            <div className="m-4 overflow-x-auto rounded-xl border border-gray-300">
                <table className="w-full table-fixed border-separate border-spacing-0">
                    <thead>
                    <tr className="bg-black text-white">
                        <th className="w-1/6 rounded-tl-xl px-4 py-2 font-mono font-semibold text-left">Title</th>
                        <th className="w-2/6 px-4 py-2 font-mono font-semibold text-left">Description</th>
                        <th className="w-2/6 px-4 py-2 font-mono font-semibold text-left">Created Date</th>
                        <th className="w-1/6 px-4 py-2 font-mono font-semibold text-left">Area Name</th>
                        <th className="w-1/6 px-4 py-2 font-mono font-semibold text-center">Status</th>
                        <th className="w-1/6 rounded-tr-xl px-4 py-2 font-mono font-semibold text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event._id} className="bg-white hover:bg-gray-200">
                                <td className="px-4 py-2 border-t">{event?.donationDetails?.title}</td>
                                <td className="px-4 py-2 border-t">{event.description}</td>
                                <td className="px-4 py-2 border-t">{new Date(event.createdAt).toLocaleString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}</td>
                                <td className="px-4 py-2 border-t">{event.areaName}</td>
                                <td className="px-4 py-2 border-t capitalize text-center">
                                    <p className={`text-white inline-block rounded-full px-3 py-1 ${
                                        event.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                                    }`}>
                                        {event.status}
                                    </p>
                                </td>
                                <td className="px-4 py-2 border-t text-center">
                                    <button
                                        onClick={() => navigate(`/${event._id}/update-event`)}
                                        className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                                        title="Edit Event"
                                    >
                                        <MdEditDocument size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                No Ongoing Events
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default OnGoingEvents;
