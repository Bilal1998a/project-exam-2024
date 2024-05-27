import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const ProfilePage = () => {
    const { isLoggedIn, username, apiKey } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && username) {
            const fetchProfile = async () => {
                try {
                    const authToken = localStorage.getItem('authToken');

                    const response = await axios.get(`https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            'X-Noroff-API-Key': apiKey
                        }
                    });

                    setProfile(response.data.data);
                } catch (error) {
                    setError(error.response ? error.response.data : error.message || 'Failed to fetch profile data');
                }
            };

            fetchProfile();
        }
    }, [isLoggedIn, username, apiKey]);

    if (!isLoggedIn) return <p>Please log in to view your profile.</p>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                    {profile.avatar && (
                        <img src={profile.avatar.url} alt={profile.avatar.alt} className="w-24 h-24 rounded-full mr-4" />
                    )}
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                </div>
                <p className="mt-4">{profile.email}</p>
                <h3 className="text-xl font-semibold mt-6">My Bookings</h3>
                {profile.bookings && profile.bookings.length > 0 ? (
                    <ul>
                        {profile.bookings.map(booking => (
                            <li key={booking.id} className="mt-4">
                                <p><strong>Venue:</strong> {booking.venue.name}</p>
                                <p><strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                <p><strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                                <p><strong>Guests:</strong> {booking.guests}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
                {profile.venueManager && (
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/createvenue')}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                        >
                            Create Venue
                        </button>
                        <button
                            onClick={() => navigate('/managevenues')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Manage Venues
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
