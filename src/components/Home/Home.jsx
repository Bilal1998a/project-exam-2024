import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-6">Welcome to Holidaze!</h1>
            <p className="text-lg mb-6">Your ultimate destination for holiday accommodations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Find Your Perfect Stay</h2>
                    <p className="text-lg mb-4">Browse our wide selection of accommodations across various destinations.</p>
                    <button 
                        onClick={() => navigate('/venues')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Explore Venues
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Log in now to make your booking</h2>
                    <p className="text-lg mb-4">Also if you want to rent out your place, become a venue manager!</p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
