
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full  flex flex-col">
      <Navbar />
      <main className="w-full  max-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
