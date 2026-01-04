import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Shield, Truck, Heart, Star, Users } from "lucide-react";

const CTASection = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Verified & Safe",
      description: "All users and listings are thoroughly verified",
      color: "bg-[color:var(--primary)] text-black",
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Nationwide Delivery",
      description: "Safe pet transport across the country",
      color: "bg-[color:var(--accent)] text-black",
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "24/7 Support",
      description: "Always here for you and your pets",
      color: "bg-[color:var(--primary)] text-black",
    },
    {
      icon: <PawPrint className="h-10 w-10" />,
      title: "10K+ Happy Pets",
      description: "Successful adoptions and counting",
      color: "bg-[color:var(--accent)] text-black",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Happy Pets Adopted", icon: <PawPrint className="h-6 w-6" /> },
    { value: "5,000+", label: "Active Sellers", icon: <Users className="h-6 w-6" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Star className="h-6 w-6" /> },
    { value: "24/7", label: "Support Available", icon: <Heart className="h-6 w-6" /> },
  ];

  return (
    <section className="relative overflow-hidden bg-[color:var(--background)]">
   
      <div className="absolute top-0 left-0 w-72 h-72 bg-[color:var(--primary)/8] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[color:var(--accent)/15] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-[1600px] mx-auto px-4 py-24">

        <div className="relative bg-[color:var(--primary)] rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative z-10 text-center px-6 py-20">
       
            <div className="inline-flex p-4 bg-white/20 rounded-full mb-8">
              <PawPrint className="h-12 w-12 text-white" />
            </div>

          
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Find Your
              <span className="block text-[color:var(--text)]">
                Perfect Companion?
              </span>
            </h2>


            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join our community of pet lovers and discover thousands of pets waiting for their forever homes
            </p>

      
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link
                to="/signup"
                className="px-10 py-5 bg-white text-[color:var(--primary)] font-bold rounded-full hover:bg-[color:var(--accent)] hover:text-[color:var(--text)] transition-all hover:scale-105 shadow-xl"
              >
                Get Started Free →
              </Link>

              <Link
                to="/pets-supplies"
                className="px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[color:var(--primary)] transition-all hover:scale-105"
              >
                Browse All Listings
              </Link>
            </div>

       
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <div className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4 ${f.color}`}>
                    {f.icon}
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2">{f.title}</h4>
                  <p className="text-white/80 text-sm">{f.description}</p>
                </div>
              ))}
            </div>

       
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition"
                >
                  <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-white/20 text-white">
                    {s.icon}
                  </div>
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-white/80 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        
       
      </div>
    </section>
  );
};

export default CTASection;
