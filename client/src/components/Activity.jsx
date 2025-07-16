import {useEffect, useState} from "react";
import {ActivityList} from "../apiRequest/api.js";
import {useNavigate} from "react-router-dom";


const Activity =()=>{

    const [events,setEvents]=useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredEvents, setFilteredEvents]=useState([]);
    const [locations, setLocations]=useState([]);
    const [titles, setTitles]=useState([]);
    const  navigate =useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const EventList = await ActivityList();
                setEvents(EventList.data);
                setFilteredEvents(events);
                console.log("Fetch from UI",EventList);

               const availableLocations = [...new Set (EventList.data.map((e)=>e.areaName))];
               const availableTitles = [...new Set (EventList.data.map((e)=>e.donationDetails.title))];

                console.log("Fetch from UI location",availableLocations);
                console.log("Fetch from UI title",availableTitles);


               setLocations(availableLocations);
               setTitles(availableTitles);

            } catch (error) {
                console.error('Error fetching :', error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const result = events.filter( event =>
                    event.donationDetails.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    event.areaName.toLowerCase().includes(searchText.toLowerCase()) );
                setFilteredEvents(result);
                console.log("Fetch from filter result",result.data);

            } catch (error) {
                console.error('Error fetching :', error);
            }
        })();
    }, [events, searchText]);

    const handleFilter = (key, value) => {
        let result;
        if (key==="title" ) {
             result = events.filter(event => event.donationDetails[key] === value);
        }else{
            result = events.filter(event => event[key] === value);
        }


        setFilteredEvents(result);
    };

    return (
        <>
            <section className="min-h-[430px]   mx-4 rounded-lg">

                <div className="grid grid-cols-12 gap-6">

                    <div className="col-span-3 mt-4 flex flex-col  w-64 bg-gray-100 rounded p-4 space-y-4 text-sm ">

                        <h3 className="font-semibold text-lg">Filter Activity</h3>

                        <div className="flex flex-col  text-sm ">
                            <h4 className="font-medium mb-1 ">Location</h4>
                            {locations.map((area)=>(<div key={area}
                                className="space-x-2 text-sm"
                             onChange={() => handleFilter("areaName", area)}
                            >
                                <input type="radio" name="location"/>
                                <span className="">{area}</span>
                            </div>))}


                        </div>



                        <div className="flex flex-col  text-sm ">
                            <h4 className="font-medium mb-1 ">Tittle</h4>
                            {titles.map((title)=>(<div key={title}
                                className="space-x-2 text-sm" onChange={() => handleFilter("title", title)}
                            >
                                <input type="radio" name="title"/>
                                <span className="">{title}</span>
                            </div>))}

                        </div>

                    </div>


                    <div className="col-span-9 flex-1   my-5  ">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <input
                                    type="text"
                                    placeholder="Find activity by title name or donation location........"
                                    onChange={(e)=>setSearchText(e.target.value)}
                                    className="pl-10 h-10 w-full border-2 border-black  rounded-md focus:outline-none focus:border-orange-400"/>
                            </div>
                            {/*card*/}

                            {filteredEvents.map((event)=> (<div key={event._id}
                                className="col-span-4 flex flex-col shadow-2xl hover:scale-97 transition-transform rounded-lg bg-gray-100 border-2 border-gray-900">
                                <img
                                    className="w-full h-48 rounded-t-lg object-cover"
                                    src={`http://localhost:5050/upload-file/${event.bannerImg}`}
                                    alt="img"
                                />

                                <div className="p-3 flex flex-col flex-grow">
                                    {/* Title and Date Row */}
                                    <div className="flex items-center gap-4 mb-2">
                                        <h4 className="text-md font-bold font-mono flex-grow break-words">
                                            {event.donationDetails.title}
                                        </h4>
                                        <p className="text-sm font-semibold font-mono flex-shrink-0 whitespace-nowrap">
                                            {new Date(event.createdAt).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm font-semibold mb-2">
                                        {event.description}
                                    </p>

                                    {/* Location */}
                                    <div className="text-sm font-semibold font-mono text-cyan-600 mb-2">
                                        Location: {event.areaName}
                                        <div className="text-sm font-semibold font-mono text-green-600">
                                            Status : {event.status}
                                        </div>
                                    </div>

                                    {/* Status + Button */}
                                    <div className="flex items-center mt-auto">

                                        <span className="ml-auto">
                                        <button
                                            onClick={() => navigate(`/${event._id}/donate`)}
                                            className="cursor-pointer bg-black hover:scale-95 transition-transform text-white hover:bg-orange-400 py-1 px-4 rounded-full">
                                          Donate
                                        </button>
                                      </span>
                                    </div>
                                </div>
                            </div>))}


                            {/*stop*/}
                        </div>
                    </div>


                </div>

            </section>
        </>
    );
}
export default Activity;