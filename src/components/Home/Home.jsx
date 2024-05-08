import React from 'react';

const Home = () => {
    return (
        <div className="container mx-auto mt-8 px-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Holidaze</h1>
                <p className="text-lg text-gray-600 mb-8">Book your perfect holiday accommodation today!</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300">Explore Now</button>
            </div>
           
           
        </div>
    );
};

export default Home;
