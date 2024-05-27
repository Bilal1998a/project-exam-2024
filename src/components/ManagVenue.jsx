import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const ManageVenues = () => {
    const { username, authToken, apiKey } = useContext(AuthContext);
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get(`https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-Noroff-API-Key': apiKey
                    }
                });
                setVenues(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Failed to fetch venues');
                setLoading(false);
            }
        };

        fetchVenues();
    }, [username, authToken, apiKey]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'X-Noroff-API-Key': apiKey
                }
            });
            setVenues(venues.filter(venue => venue.id !== id));
        } catch (error) {
            console.error('Error deleting venue:', error);
            alert('Failed to delete venue');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Manage My Venues</h2>
            {venues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map(venue => (
                        <div key={venue.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">{venue.name}</h3>
                            <p className="mt-2">{venue.description}</p>
                            <button 
                                onClick={() => handleDelete(venue.id)} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => navigate(`/update-venue/${venue.id}`)} 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2"
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No venues found.</p>
            )}
        </div>
    );
};

export default ManageVenues;
