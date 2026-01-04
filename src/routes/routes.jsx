
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
import ProfilePage from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import ProductsPage from "../pages/ProductsPage";
import OrdersPage from "../pages/OrdersPage";
import CustomersPage from "../pages/CustomersPage";
import AnalyticsPage from "../pages/AnalyticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/support", element: <Support /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/error", element: <ErrorPage /> },



      { path: "/my-orders", element: <ProtectedRoute ><MyOrders /></ProtectedRoute> },
      {
        path: "/my-profile", element:
          // <ProtectedRoute >
          <ProfilePage />
        // {/* </ProtectedRoute>  */}
      },

      { path: "/add-listing", element: <ProtectedRoute ><AddListing /></ProtectedRoute> },
      { path: "/my-listings", element: <ProtectedRoute ><MyListings /></ProtectedRoute> },
      { path: "/pets-supplies", element: <PetsSupplies /> },
      { path: "/listing/:id", element: <ListingDetails /> },

    ]
  },
  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { index: true, element: <Dashboard /> }, // /dashboard
    { path: "products", element: <ProductsPage/> }, // /dashboard/profile
    { path: "orders", element: <OrdersPage/> }, // /dashboard/profile
    { path: "customers", element: <CustomersPage/> }, // /dashboard/profile
    { path: "analytics", element: <AnalyticsPage/> }, // /dashboard/profile

  ],
},
  { path: "*", element: <NotFound /> }
]);
