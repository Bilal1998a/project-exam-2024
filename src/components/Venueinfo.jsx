import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar'; // Import Calendar component from react-calendar
import 'react-calendar/dist/Calendar.css'; // Import Calendar CSS

const VenueInfo = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        setVenue(response.data.data); // Access the data property in the response
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching venue details: {error}</p>;

  return (
    <div className="container mt-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '45%' }}>
          <img src={venue.media.length > 0 ? venue.media[0].url : 'placeholder.jpg'} alt={venue.name} style={{ width: '100%', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div style={{ width: '45%' }}>
          <h2>{venue.name}</h2>
          <p>Location: {venue.location.city}, {venue.location.country}</p>
          <p>Description: {venue.description}</p>
          <p>Price: ${venue.price}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Rating: {venue.rating}</p>
          {/* Add other venue details as needed */}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Availability Calendar</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
        <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        {/* Add logic to display available dates based on venue data */}
      </div>
    </div>
  );
};

export default VenueInfo;
