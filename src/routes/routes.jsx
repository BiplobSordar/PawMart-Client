
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Pets from "../pages/Pets";
import Products from "../pages/Products";
import PetDetails from "../pages/PetDetails";



import PetsSupplies from "../pages/PetsSupplies";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/pets", element: <Pets /> },
      { path: "/products", element: <Products /> },
      { path: "/pet-details", element: <PetDetails /> },
    
      { path: "/my-orders", element: <MyOrders/> },
     
      { path: "/add-listing", element: <AddListing/>},
      { path: "/my-listings", element: <MyListings/>},
      { path: "/pets-supplies", element: <PetsSupplies/>},
      { path: "/listing/:id", element: <ListingDetails/>},
    
    ]
  },
  { path: "*", element: <NotFound /> }
]);
