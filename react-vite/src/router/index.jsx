import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from "../components/LandingPage"
import ProfilePage from "../components/ProfilePage"
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
        path:"/home",
        element:<ProfilePage />
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
