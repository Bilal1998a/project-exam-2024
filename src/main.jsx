import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import Home from './components/Home/Home';
import Venues from './components/Venues/Venues';
import ProfilePage from './components/Profilepage';
import Register from './components/Register';
import Login from './components/Login';
import VenueInfo from './components/Venueinfo';
import CreateVenue from './components/CreateVenue';
import ManageVenues from './components/ManagVenue';
import { AuthProvider } from './components/AuthContext';

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
        path: '/login',
        element: <Login />
      },
      {
        path: '/venues/:id',
        element: <VenueInfo />
      },
      {
        path: '/createvenue',
        element: <CreateVenue />
      },
      {
        path: '/managevenues',
        element: <ManageVenues />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
