import React from 'react';

const Home = () => {
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-6">Welcome to Holidaze!</h1>
            <p className="text-lg mb-6">Your ultimate destination for holiday accommodations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Find Your Perfect Stay</h2>
                    <p className="text-lg mb-4">Browse our wide selection of accommodations across various destinations.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Explore Venues
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Plan Your Dream Vacation</h2>
                    <p className="text-lg mb-4">Discover exciting activities, attractions, and events for your next holiday.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Explore Destinations
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
