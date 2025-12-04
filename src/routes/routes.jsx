
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";






import PetsSupplies from "../pages/PetsSupplies";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import ProtectedRoute from "../components/ProtectedRoute";
import Support from "../pages/Support";
import ErrorPage from "../pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/support", element: <Support/> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/error", element: <ErrorPage/> },



      { path: "/my-orders", element: <ProtectedRoute ><MyOrders /></ProtectedRoute> },

      { path: "/add-listing", element: <ProtectedRoute ><AddListing /></ProtectedRoute> },
      { path: "/my-listings", element: <ProtectedRoute ><MyListings /></ProtectedRoute> },
      { path: "/pets-supplies", element: <PetsSupplies /> },
      { path: "/listing/:id", element: <ListingDetails /> },

    ]
  },
  { path: "*", element: <NotFound /> }
]);
