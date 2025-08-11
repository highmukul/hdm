import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Hadoti Daily</h3>
                        <p className="text-gray-400">Your one-stop shop for fresh groceries, delivered fast.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><FaIcons.FaFacebook size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaIcons.FaTwitter size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaIcons.FaInstagram size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaIcons.FaLinkedin size={24} /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-2">Subscribe to get the latest deals.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your Email" className="w-full p-2 rounded-l-md text-gray-800" />
                            <button className="bg-blue-600 p-2 rounded-r-md">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Hadoti Daily. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
