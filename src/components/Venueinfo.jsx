import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const VenueInfo = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, username, authToken, apiKey } = useContext(AuthContext);
  const [bookingDetails, setBookingDetails] = useState({
    dateFrom: '',
    dateTo: '',
    guests: 1,
  });

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
          headers: {
            'X-Noroff-API-Key': apiKey,
          },
        });
        setVenue(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch venue data');
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, apiKey]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to make a booking');
      return;
    }
    try {
      const response = await axios.post(
        `https://v2.api.noroff.dev/holidaze/bookings`,
        { ...bookingDetails, venueId: id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-Noroff-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        alert('Booking successful');
      }
    } catch (error) {
      console.error('Error making booking:', error);
      setError(error.response ? error.response.data : error.message || 'Failed to make booking');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!venue) return <p>No venue found</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">{venue.name}</h2>
        <img src={venue.media[0]?.url} alt={venue.media[0]?.alt} className="w-full h-64 object-cover mt-4 rounded-lg" />
        <p className="mt-4">{venue.description}</p>
        <h3 className="text-xl font-semibold mt-6">Make a Booking</h3>
        <form onSubmit={handleBookingSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">From Date</label>
            <input
              type="date"
              name="dateFrom"
              value={bookingDetails.dateFrom}
              onChange={handleBookingChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">To Date</label>
            <input
              type="date"
              name="dateTo"
              value={bookingDetails.dateTo}
              onChange={handleBookingChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Guests</label>
            <input
              type="number"
              name="guests"
              value={bookingDetails.guests}
              onChange={handleBookingChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              min="1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default VenueInfo;
