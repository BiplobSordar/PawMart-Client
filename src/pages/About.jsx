import React from "react";
import usePageTitle from "../utils/usePageTitle";

const About = () => {
  usePageTitle("About Us | PawMart");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-5 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-primary">
          About PawMart
        </h1>

        <p className="text-lg sm:text-xl mb-8 text-center text-gray-700 dark:text-gray-300">
          At PawMart, we believe every pet deserves a loving home. Our mission is to connect loving adopters with pets in need and make adoption easy and joyful.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-primary">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              To provide a platform where pets find forever homes and pet lovers can easily adopt or purchase quality pet supplies. We aim to improve pet welfare and support responsible pet ownership.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-primary">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              A world where every pet has a loving family and all pet owners have access to the best products and care advice. We strive to make adoption and pet care simple, safe, and rewarding.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Alice", role: "Founder", img: "/team1.jpg" },
              { name: "Bob", role: "Marketing Lead", img: "/team2.jpg" },
              { name: "Charlie", role: "Operations", img: "/team3.jpg" },
              { name: "Diana", role: "Community Manager", img: "/team4.jpg" },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
