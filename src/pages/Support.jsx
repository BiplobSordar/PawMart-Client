import React from "react";
import usePageTitle from "../utils/usePageTitle";

const Support = () => {
   usePageTitle(`PawMart`);
   
  return (
    <div className="bg-[#F8F9FA] min-h-screen px-4 md:px-16 py-12">

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FF8C42] mb-4">
          Support
        </h1>
        <p className="text-[#2D2D34]/90 text-lg md:text-xl max-w-2xl mx-auto">
          Need help? Our support team is here to assist you with any questions or issues related to PawMart. We aim to provide fast, friendly, and effective assistance for all users.
        </p>
      </header>

   
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Account & Login</h3>
          <p className="text-[#2D2D34]/90">
            Issues with logging in, signing up, or managing your account? Contact us and we will help you access your PawMart account quickly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Orders & Listings</h3>
          <p className="text-[#2D2D34]/90">
            Need assistance with your pet listings or purchases? Our support team can guide you through adding, updating, or managing your products and services.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Community Support</h3>
          <p className="text-[#2D2D34]/90">
            Connect with other pet owners or report community concerns. We ensure a safe and helpful environment for all users.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-[#FF8C42] mb-2">Technical Help</h3>
          <p className="text-[#2D2D34]/90">
            Facing any technical issues with the website or app? Reach out to our support team to resolve bugs, errors, or feature requests.
          </p>
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF8C42] mb-4">
          Contact Support
        </h2>
        <p className="text-[#2D2D34]/90 max-w-3xl mx-auto text-lg">
          You can reach our support team via email at <span className="font-semibold">support@pawmart.com</span> or call us at <span className="font-semibold">+123-456-7890</span>. We aim to respond within 24 hours.
        </p>
      </section>
    </div>
  );
};

export default Support;
