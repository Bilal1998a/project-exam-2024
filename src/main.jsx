import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import Home from './components/Home/Home';
import Venues from './components/Venues/Venues';
import ProfilePage from './components/Profilepage';
import Register from './components/Register';
import VenueInfo from './components/Venueinfo';

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
        element: <ProfilePage />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/venues/:id',
        element: <VenueInfo />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
