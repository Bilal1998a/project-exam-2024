import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VenueInfo = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        setVenue(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching venue details: {error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-center">
          <img src={venue.media.length > 0 ? venue.media[0].url : 'placeholder.jpg'} alt={venue.name} className="w-64 h-64 object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{venue.name}</h2>
          <p className="text-gray-700"><span className="font-semibold">Location:</span> {venue.location.city}, {venue.location.country}</p>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Description:</span> {venue.description}</p>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Price:</span> ${venue.price}</p>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Max Guests:</span> {venue.maxGuests}</p>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Rating:</span> {venue.rating}</p>
          <div className="mt-8">
            <p className="text-red-500">
              Only logged-in users can make a booking.
            </p>
            <Link to="/profilepage" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 inline-block">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo;
