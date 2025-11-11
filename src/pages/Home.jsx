// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BannerSlider from "../components/BannerSlider";
import CategorySection from "../components/CategorySection";
import RecentListings from "../components/RecentListings";

const categories = [
  { name: "Pets (Adoption)", emoji: "🐶", to: "/pets" },
  { name: "Pet Food", emoji: "🍖", to: "/products?category=food" },
  { name: "Accessories", emoji: "🧸", to: "/products?category=accessories" },
  { name: "Pet Care Products", emoji: "💊", to: "/products?category=care" },

];

const listings = [
  { 
    id: 1, 
    name: "Buddy", 
    category: "Dog", 
    price: "Free for Adoption", 
    location: "Dhaka", 
    image: "https://placedog.net/400/300?id=1" 
  },
  { 
    id: 2, 
    name: "Whiskers", 
    category: "Cat", 
    price: "$50", 
    location: "Chittagong", 
    image: "/pet1.jpg" 
  },
  { 
    id: 3, 
    name: "Goldie", 
    category: "Fish", 
    price: "$10", 
    location: "Sylhet", 
    image: "/pet1.jpg" 
  },
  { 
    id: 4, 
    name: "Bella", 
    category: "Dog", 
    price: "Free for Adoption", 
    location: "Khulna", 
    image: "https://placedog.net/400/300?id=2" 
  },
  { 
    id: 5, 
    name: "Milo", 
    category: "Cat", 
    price: "$30", 
    location: "Rajshahi", 
   image: "/pet1.jpg" 
  },
  { 
    id: 6, 
    name: "Charlie", 
    category: "Dog", 
    price: "$40", 
    location: "Barishal", 
    image: "https://placedog.net/401/300?id=3" 
  },
];
const petHeroes = [
  { name: "John Doe", role: "Adopter", img: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764" },
  { name: "Jane Smith", role: "Pet Caregiver", img: "https://plus.unsplash.com/premium_photo-1669882305273-674eff6567af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
  { name: "Alex Brown", role: "Adopter", img: "https://images.unsplash.com/photo-1544168190-79c17527004f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688" },
];

const banners = [
  {
    image: "/banner1.avif",
    title: "Find Your Furry Friend Today!",
    description: "Adopt, Don’t Shop — Give a Pet a Home.",
  },
  {
    image: "/banner2.jpg",
    title: "Because Every Pet Deserves Love and Care",
    description: "Discover pets waiting for a forever home near you.",
  },
  {
    image: "/banner3.avif",
    title: "Happy Tails Start Here",
    description: "Join our community of pet lovers and adopters.",
  },
];

const Home = () => {
  return (
    <div className=" w-full max-w-[1600px] mx-auto">

     
      <BannerSlider banners={banners}/>

    
    <CategorySection categories={categories}/>

   
    <RecentListings listings={listings}/>

  
     <section className="bg-gradient-to-r rounded-3xl from-green-100 to-yellow-100 py-16 my-20 px-8 mx-8">
  <div className="max-w-[1600px] mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 relative inline-block">
      Why Adopt from PawMart?
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full mt-2"></span>
    </h2>

    <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10">
      By adopting, you give pets a second chance at life and reduce the number of animals in shelters. Every adoption is a life changed!
    </p>

  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
        <span className="text-5xl mb-4">🐾</span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Save a Life</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Each adoption saves a pet from shelter life and gives them a loving home.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
        <span className="text-5xl mb-4">💖</span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Spread Love</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Adopted pets bring joy and companionship to your family.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
        <span className="text-5xl mb-4">🌱</span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Reduce Shelter Overload</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Adoption helps manage shelter populations and encourages responsible pet ownership.
        </p>
      </div>
    </div>
  </div>
</section>


  
      <section className="bg-gradient-to-r from-[#FFF1E6] to-[#E6FFFA] py-20 my-20 rounded-3xl mx-8 px-8">
  <div className="max-w-[1600px] mx-auto text-center">
  
    <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-12 relative inline-block">
      Meet Our Pet Heroes
      <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-primary rounded-full"></span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {petHeroes.map((hero, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
        >
     
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-primary/20 blur-2xl"></div>

    
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-4">
            <img
              src={hero.img}
              alt={hero.name}
              className="w-full h-full object-cover"
            />
          </div>

     
          <h3 className="text-xl font-bold text-gray-800 mb-1">{hero.name}</h3>
          <p className="text-gray-500 mb-3">{hero.role}</p>

     
          <div className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-semibold">
            PawMart Hero
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
