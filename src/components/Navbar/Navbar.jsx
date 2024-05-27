import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { isLoggedIn, username, logout, apiKey } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdownAndNavigate = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white font-bold text-xl">MyHolidays</div>
                <div className="flex">
                    <Link to="/" className="text-white px-3 py-2 rounded-md text-lg font-medium">Home</Link>
                    <Link to="/venues" className="text-white px-3 py-2 rounded-md text-lg font-medium">Venues</Link>
                    <div className="relative">
                        <button 
                            className="flex items-center text-white px-3 py-2 rounded-md text-lg font-medium focus:outline-none" 
                            onClick={toggleDropdown}
                        >
                            <FaUserCircle className="mr-2" />
                        </button>
                        <ul className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-blue-500 text-white py-2 rounded-md shadow-md`}>
                            {!isLoggedIn ? (
                                <>
                                    <li className="px-4 py-2 hover:bg-blue-600">
                                        <Link to="/register" onClick={() => closeDropdownAndNavigate('/register')}>Create User</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-blue-600">
                                        <button onClick={() => closeDropdownAndNavigate('/login')}>Log In</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="px-4 py-2 hover:bg-blue-600">
                                        <Link to="/profilepage" onClick={() => closeDropdownAndNavigate('/profilepage')}>Profile</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-blue-600">
                                        <button onClick={() => { closeDropdownAndNavigate('/'); logout(); }}>Log Out</button>
                                    </li>
                                    {apiKey && (
                                        <li className="px-4 py-2 hover:bg-blue-600">
                                            <Link to="/createvenue" onClick={() => closeDropdownAndNavigate('/create-venue')}>Create Venue</Link>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
