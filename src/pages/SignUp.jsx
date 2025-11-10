import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Image, Chrome, Github } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", photoURL: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF8C42] via-[#FFE066] to-[#FFB6B9] flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Create Your PawMart Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4">
          <div className="flex items-center border rounded-lg px-3">
            <User className="text-primary" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <Mail className="text-primary" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <Lock className="text-primary" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <Image className="text-primary" />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              onChange={handleChange}
              className="w-full p-2 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-accent transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="flex flex-col mt-6 space-y-3">
          <button
        
            className="flex items-center justify-center gap-2 border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            <Chrome /> Sign up with Google
          </button>
          <button
          
            className="flex items-center justify-center gap-2 border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            <Github /> Sign up with GitHub
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-text">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
