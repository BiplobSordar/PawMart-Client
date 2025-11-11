import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">

      <Navbar />

   
      <main className="flex-grow w-full pt-[40px]"> 
      
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
