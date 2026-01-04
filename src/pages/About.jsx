import React from "react";

const About = () => {

  return (
    <div className="bg-[#F8F9FA] min-h-screen px-4 md:px-16 py-12 mt-10">

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FF8C42] mb-4">
          About PawMart
        </h1>
        <p className="text-[#2D2D34]/90 text-lg md:text-xl max-w-2xl mx-auto">
          PawMart is your ultimate platform for pet adoption, pet supplies, and connecting pet lovers. Our mission is to make it easier for pet owners and enthusiasts to find pets, services, and products in one convenient place.
        </p>
      </header>

     
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Pet Adoption</h3>
          <p className="text-[#2D2D34]/90">
            Browse pets available for adoption and give a loving home to furry friends in your community.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Pet Supplies</h3>
          <p className="text-[#2D2D34]/90">
            Find high-quality pet products including food, toys, accessories, and healthcare essentials.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Community & Support</h3>
          <p className="text-[#2D2D34]/90">
            Connect with other pet lovers, share experiences, and access resources for better pet care.
          </p>
        </div>
      </section>

   
      <section className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF8C42] mb-4">
          Our Mission
        </h2>
        <p className="text-[#2D2D34]/90 max-w-3xl mx-auto text-lg">
          We aim to simplify pet adoption, make pet products accessible, and build a strong community for pet lovers everywhere. PawMart is committed to improving the lives of pets and their owners by providing a reliable, easy-to-use platform.
        </p>
      </section>
    </div>
  );
};

export default About;
