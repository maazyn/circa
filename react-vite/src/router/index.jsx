import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from "../components/LandingPage"
import ProfilePage from "../components/ProfilePage"
import UpdateProfilePage from '../components/UpdateProfilePage';
import EditCollectionPage from '../components/CollectionForm/EditCollectionPage';
// import History from "../components/History"
// import LocationDetails from "../components/LocationDetails"
// import CollectionDetails from "../components/CollectionDetails"

import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"/profile",
        element:<ProfilePage />
      },
      {
        path:"/edit-profile",
        element:<UpdateProfilePage />
      },
      {
        path:"/collections/:collectionId",
        element:<EditCollectionPage />
      },
      // {
      //   path:"/history",
      //   element:<History />
      // },
      // {
      //   path:"/locations/:locationId",
      //   element:<LocationDetails />
      // },
      // {
      //   path:"/collections/:collectionId/locations/",
      //   element:<CollectionDetails />
      // },
    ],
  },
]);
