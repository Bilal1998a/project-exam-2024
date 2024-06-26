import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const CreateVenue = () => {
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
    const [error, setError] = useState(null);

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
            const response = await axios.post(
                'https://v2.api.noroff.dev/holidaze/venues',
                {
                    name: venueDetails.name,
                    description: venueDetails.description,
                    media: venueDetails.media,
                    price: Number(venueDetails.price),
                    maxGuests: Number(venueDetails.maxGuests),
                    rating: Number(venueDetails.rating),
                    meta: venueDetails.meta,
                    location: venueDetails.location
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'X-Noroff-API-Key': apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 201) {
                alert('Venue created successfully!');
            }
        } catch (error) {
            console.error('Error creating venue:', error);
            setError(error.message || 'Failed to create venue');
        }
    };

    return (
        <div className="container mx-auto mt-10 mb-20 px-4 py-8"> {/* Added margin bottom */}
            <div className="bg-white p-8 rounded-lg shadow-md"> {/* Added padding */}
                <h2 className="text-2xl font-bold mb-6">Create Venue</h2> {/* Added margin */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Name</label> {/* Added margin */}
                        <input
                            type="text"
                            name="name"
                            value={venueDetails.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Description</label> {/* Added margin */}
                        <textarea
                            name="description"
                            value={venueDetails.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Price</label> {/* Added margin */}
                        <input
                            type="number"
                            name="price"
                            value={venueDetails.price}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Max Guests</label> {/* Added margin */}
                        <input
                            type="number"
                            name="maxGuests"
                            value={venueDetails.maxGuests}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Media URL</label> {/* Added margin */}
                        <input
                            type="url"
                            name="media.0.url"
                            value={venueDetails.media[0]?.url}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Media Alt Text</label> {/* Added margin */}
                        <input
                            type="text"
                            name="media.0.alt"
                            value={venueDetails.media[0]?.alt}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Wifi</label> {/* Added margin */}
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={venueDetails.meta.wifi}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Parking</label> {/* Added margin */}
                        <input
                            type="checkbox"
                            name="parking"
                            checked={venueDetails.meta.parking}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Breakfast</label> {/* Added margin */}
                        <input
                            type="checkbox"
                            name="breakfast"
                            checked={venueDetails.meta.breakfast}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Pets</label> {/* Added margin */}
                        <input
                            type="checkbox"
                            name="pets"
                            checked={venueDetails.meta.pets}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Venue
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateVenue;
