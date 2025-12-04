import React, { useState } from "react";
import usePageTitle from "../utils/usePageTitle";

const Contact = () => {
  usePageTitle("Contact Us | PawMart");

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-16 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">

     
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FF8C42] mb-4">
            Contact Us
          </h1>
          <p className="text-[#2D2D34]/90 text-lg md:text-xl">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

     
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#FF8C42] transition bg-gray-50 text-[#2D2D34]"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#FF8C42] transition bg-gray-50 text-[#2D2D34]"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={6}
            className="p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#FF8C42] transition bg-gray-50 text-[#2D2D34]"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#FF8C42] text-white font-semibold py-3 rounded-xl hover:bg-[#FFE066] hover:text-[#2D2D34] transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left text-[#2D2D34]/90">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-[#FF8C42] mb-2">Email</h3>
            <p>support@pawmart.com</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-[#FF8C42] mb-2">Phone</h3>
            <p>+880 1234 567890</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-[#FF8C42] mb-2">Address</h3>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
