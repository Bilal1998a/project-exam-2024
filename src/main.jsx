import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Venues from './components/Venues/Venues.jsx';
import ProfilePage from './components/Profilepage.jsx';
import Register from './components/Register.jsx';
import VenueInfo from './components/Venueinfo.jsx'; // Import VenueInfo component

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/venues',
        element: <Venues />
      },
      {
        path: '/profilepage',
        element: <ProfilePage/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      // Route for VenueInfo component
      {
        path: '/venues/:id', // Use dynamic parameter to get venue ID
        element: <VenueInfo />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render( // Use createRoot instead of ReactDOM.createRoot
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
