import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h5 className="font-bold text-lg">MyHolidays</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="flex space-x-4">
                    <Link to="#" className="text-white">About Us</Link>
                    <Link to="#" className="text-white">Contact</Link>
                    <Link to="#" className="text-white">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
