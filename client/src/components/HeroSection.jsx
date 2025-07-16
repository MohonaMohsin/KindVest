import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom";

export default function HeroSection() {

    let navigate = useNavigate();
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        cssEase:  "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 6000,

    };
    return (
        <Slider {...settings}>

            <div className="relative overflow-hidden">
                <img
                    className="w-full  h-[500px] object-cover shadow-lg"
                    src="/slide5.jpg" alt="donation"/>
                <div className="absolute top-20 left-5  px-4 py-2 rounded">
                    <h2 className="text-5xl text-orange-400 text-bold font-mono font-bold">Together </h2>
                    <h4 className="text-5xl text-orange-400 text-bold font-mono font-bold">we can help</h4>
                    <p className="text-white text-bold font-serif mt-4">Your help can bring hope and <br/> support to
                        them in need <br/> you can make the world a little better</p></div>

                <div>
                    <button className=" absolute bottom-20 left-7 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"> Donate Now
                    </button>
                    <button className=" absolute bottom-20 left-50 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"
                    onClick={()=>{ navigate("/register");}}
                    > Be a Volunteer
                    </button>
                </div>
            </div>
            <div className="relative">
                <img
                    className="w-full h-[500px] object-cover shadow-lg"
                    src="/slide2.jpg" alt="donation"/>

                <div className="absolute top-20 left-5  px-4 py-2 rounded">
                    <h2 className="text-5xl text-orange-400 text-bold font-mono font-bold">Together </h2>
                    <h4 className="text-5xl text-orange-400 text-bold font-mono font-bold">we can help</h4>
                    <p className="text-white text-bold font-serif mt-4">Your help can bring hope and <br/> support to
                        them in need <br/> you can make the world a little better</p></div>

                <div>
                    <button className=" absolute bottom-20 left-7 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"> Donate Now
                    </button>
                    <button className=" absolute bottom-20 left-50 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full "  onClick={()=>{ navigate("/register");}} > Be a Volunteer
                    </button>
                </div>
        </div>
            <div className="relative overflow-hidden">
                <img
                    className="w-full h-[500px] object-cover shadow-lg"
                    src="/slide3.png" alt="donation"/>

                <div className="absolute top-20 left-5  px-4 py-2 rounded">
                    <h2 className="text-5xl text-orange-400 text-bold font-mono font-bold">Together </h2>
                    <h4 className="text-5xl text-orange-400 text-bold font-mono font-bold">we can help</h4>
                    <p className="text-white text-bold font-serif mt-4">Your help can bring hope and <br/> support to
                        them in need <br/> you can make the world a little better</p></div>

                <div>
                    <button className=" absolute bottom-20 left-7 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"> Donate Now
                    </button>
                    <button className=" absolute bottom-20 left-50 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"  onClick={()=>{ navigate("/register");}}> Be a Volunteer
                    </button>
                </div>

            </div>
            <div className="relative overflow-hidden">
                <img
                    className="w-full h-[500px] object-cover  shadow-lg"
                    src="/slide1.jpg" alt="donation"/>
                <div className="absolute top-20 left-5  px-4 py-2 rounded">
                    <h2 className="text-5xl text-orange-400 text-bold font-mono font-bold">Together </h2>
                    <h4 className="text-5xl text-orange-400 text-bold font-mono font-bold">we can help</h4>
                    <p className="text-white text-bold font-serif mt-4">Your help can bring hope and <br/> support to
                        them in need <br/> you can make the world a little better</p></div>

                <div>
                    <button className=" absolute bottom-20 left-7 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full  "> Donate Now
                    </button>
                    <button className=" absolute bottom-20 left-50 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"  onClick={()=>{ navigate("/register");}}> Be a Volunteer
                    </button>
                </div>

            </div>
            <div className="relative overflow-hidden">
                <img
                    className="w-full h-[500px] object-cover shadow-lg"
                    src="/slide6.jpg" alt="donation"/>
                <div className="absolute top-20 left-5  px-4 py-2 rounded">
                    <h2 className="text-5xl text-orange-400 text-bold font-mono font-bold">Together </h2>
                    <h4 className="text-5xl text-orange-400 text-bold font-mono font-bold">we can help</h4>
                    <p className="text-white text-bold font-serif mt-4">Your help can bring hope and <br/> support to
                        them in need <br/> you can make the world a little better</p></div>

                <div>
                    <button className=" absolute bottom-20 left-7 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"> Donate Now
                    </button>
                    <button className=" absolute bottom-20 left-50 bg-orange-400 hover:bg-blue-700 text-white
                     font-bold py-2 px-4 rounded-full"  onClick={()=>{ navigate("/register");}}> Be a Volunteer
                    </button>
                </div>

            </div>

        </Slider>
    )
        ;
}