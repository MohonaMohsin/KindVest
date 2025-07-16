import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { MdPhone, MdEmail } from 'react-icons/md';

export default function Footer() {
    return (
        <footer className="bg-black text-white px-8 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and Description */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/kindvest-logo.png" alt="KindVest Logo" className="h-8" /> {/* Replace /logo.png with your actual logo path */}
                        <h2 className="text-xl font-bold">KindVest</h2>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                        A platform to help those in need<br />
                        those who want to help
                    </p>
                    <p className="text-gray-600 text-sm mb-2">follow</p>
                    <div className="flex gap-3 mt-2">
                        <FaXTwitter className="text-orange-500 w-6 h-6 cursor-pointer" />
                        <FaYoutube className="text-orange-500 w-6 h-6 cursor-pointer" />
                        <FaInstagram className="text-orange-500 w-6 h-6 cursor-pointer" />
                        <FaFacebookF className="text-orange-500 w-6 h-6 cursor-pointer" />
                    </div>
                </div>

                {/* About Website */}
                <div>
                    <h3 className="font-semibold mb-4">About website</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-orange-500 cursor-pointer">About us</li>
                        <li className="hover:text-orange-500 cursor-pointer">Activity</li>
                        <li className="hover:text-orange-500 cursor-pointer">Testimonials</li>
                        <li className="hover:text-orange-500 cursor-pointer">Contact us</li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-orange-500 cursor-pointer">Opportunity</li>
                        <li className="hover:text-orange-500 cursor-pointer">Volunteer service</li>
                        <li className="hover:text-orange-500 cursor-pointer">Give education</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold mb-4">Contact info:</h3>
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                        <MdPhone className="text-orange-500" />
                        <span className="text-sm">01987654321</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <MdEmail className="text-orange-500" />
                        <span className="text-sm">kindvast@help.bd</span>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>2025 © Donation & Volunteer</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <p className="hover:text-orange-500 cursor-pointer">Terms & Condition</p>
                    <p className="hover:text-orange-500 cursor-pointer">Privacy Policy</p>
                    <p className="hover:text-orange-500 cursor-pointer">Contact us</p>
                </div>
            </div>
        </footer>
    );
}
