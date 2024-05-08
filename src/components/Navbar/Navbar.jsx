import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold">Holidaze</div>
                    {/* Add links for navigation here */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
