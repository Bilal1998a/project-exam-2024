import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize to false by default
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown menu

    const handleLogin = () => {
        console.log('User logged in');
        setIsLoggedIn(true);
        closeDropdown(); // Close dropdown after login
    };
    

    const handleLogout = () => {
        console.log('User logged out');
        setIsLoggedIn(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown state
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false); // Close dropdown
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">MyHolidays</div>
                    <div className="flex">
                        <Link to="/" className="text-white px-3 py-2 rounded-md text-lg font-medium">Home</Link>
                        <Link to="/venues" className="text-white px-3 py-2 rounded-md text-lg font-medium">Venues</Link>
                        <div className="relative">
                            <button className="flex items-center text-white px-3 py-2 rounded-md text-lg font-medium focus:outline-none" onClick={toggleDropdown}>
                                <FaUserCircle className="mr-2" />
                            </button>
                            <ul className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-blue-500 text-white py-2 rounded-md shadow-md`}>
                                {!isLoggedIn ? (
                                    <>
                                        <li className="px-4 py-2 hover:bg-blue-600">
                                            <Link to="/register">Create User</Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-blue-600">
                                            <button onClick={handleLogin}>Log In</button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="px-4 py-2 hover:bg-blue-600">
                                            <Link to="/profilepage">Profile</Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-blue-600">
                                            <button onClick={handleLogout}>Log Out</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
