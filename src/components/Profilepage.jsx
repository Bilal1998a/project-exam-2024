import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const ProfilePage = () => {
    const { isLoggedIn, username } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn && username) {
            const fetchProfile = async () => {
                try {
                    const authToken = localStorage.getItem('authToken');
                    console.log('Fetching profile for:', username);
                    console.log('Auth Token:', authToken);

                    const response = await axios.get(`https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });

                    console.log('Profile response:', response.data);
                    setProfile(response.data.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    setError(error.response?.data || 'Failed to fetch profile data');
                }
            };

            fetchProfile();
        }
    }, [isLoggedIn, username]);

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
            </div>
        </div>
    );
};

export default ProfilePage;
