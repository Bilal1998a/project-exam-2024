import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const UpdateVenue = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authToken, apiKey } = useContext(AuthContext);
    const [venueDetails, setVenueDetails] = useState({
        name: '',
        description: '',
        media: [{ url: '', alt: '' }],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: { address: '', city: '', zip: '', country: '', continent: '', lat: 0, lng: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-Noroff-API-Key': apiKey
                    }
                });
                setVenueDetails(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Failed to fetch venue data');
                setLoading(false);
            }
        };

        fetchVenue();
    }, [id, authToken, apiKey]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name in venueDetails.meta) {
            setVenueDetails({
                ...venueDetails,
                meta: { ...venueDetails.meta, [name]: checked }
            });
        } else if (name in venueDetails.location) {
            setVenueDetails({
                ...venueDetails,
                location: { ...venueDetails.location, [name]: value }
            });
        } else if (name.startsWith('media')) {
            const index = parseInt(name.split('.')[1], 10);
            const media = venueDetails.media.slice();
            media[index] = { ...media[index], [name.split('.')[2]]: value };
            setVenueDetails({ ...venueDetails, media });
        } else {
            setVenueDetails({ ...venueDetails, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://v2.api.noroff.dev/holidaze/venues/${id}`,
                venueDetails,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-Noroff-API-Key': apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                alert('Venue updated successfully!');
                navigate('/managevenues');
            }
        } catch (error) {
            console.error('Error updating venue:', error);
            setError(error.response ? error.response.data : error.message || 'Failed to update venue');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-10 mb-20"> {/* Added margin bottom */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Update Venue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={venueDetails.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={venueDetails.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={venueDetails.price}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Max Guests</label>
                        <input
                            type="number"
                            name="maxGuests"
                            value={venueDetails.maxGuests}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Media URL</label>
                        <input
                            type="url"
                            name="media.0.url"
                            value={venueDetails.media[0].url}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Media Alt Text</label>
                        <input
                            type="text"
                            name="media.0.alt"
                            value={venueDetails.media[0].alt}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Wifi</label>
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={venueDetails.meta.wifi}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Parking</label>
                        <input
                            type="checkbox"
                            name="parking"
                            checked={venueDetails.meta.parking}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Breakfast</label>
                        <input
                            type="checkbox"
                            name="breakfast"
                            checked={venueDetails.meta.breakfast}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Pets</label>
                        <input
                            type="checkbox"
                            name="pets"
                            checked={venueDetails.meta.pets}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Venue
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default UpdateVenue;
