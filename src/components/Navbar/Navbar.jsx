import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold">Holidaze</div>
                    <div className="flex">
                        {/* Add links for navigation here */}
                        <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/profilepage" className="text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                        <Link to="/venues" className="text-white px-3 py-2 rounded-md text-sm font-medium">Venues</Link>
                        <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
