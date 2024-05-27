
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('https://v2.api.noroff.dev/holidaze/venues');
        setVenues(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchVenues();
  }, []);
  
  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching venues: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-2xl font-semibold mb-4">Top Accommodations</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredVenues.map(venue => (
          <div key={venue.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={venue.media.length > 0 ? venue.media[0].url : 'placeholder.jpg'} alt={venue.name} className="w-full h-56 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{venue.name}</h3>
              <p className="text-gray-600 mb-2">Price: ${venue.price}</p>
              <div className="flex items-center mb-2 text-yellow-500">
                {[...Array(Math.round(venue.rating))].map((_, index) => (
                  <span key={index} className="inline-block text-yellow-500">&#9733;</span>
                ))}
              </div>
              <Link to={`/venues/${venue.id}`} className="block">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;
