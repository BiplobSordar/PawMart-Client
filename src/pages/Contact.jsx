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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-5 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-primary">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-10 text-lg sm:text-xl">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8 flex flex-col gap-5"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-primary transition bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-primary transition bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-primary transition bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary dark:bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent dark:hover:bg-accent transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 text-center text-gray-700 dark:text-gray-300">
          <p>Email: support@pawmart.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
