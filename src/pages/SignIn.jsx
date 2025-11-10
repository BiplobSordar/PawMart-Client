import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Github, Chrome } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF8C42] via-[#FFE066] to-[#FFB6B9] flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Login to PawMart
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form  className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-accent transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col mt-6 space-y-3">
          <button
            
            className="flex items-center justify-center gap-2 border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            <Chrome /> Sign in with Google
          </button>
          <button
           
            className="flex items-center justify-center gap-2 border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            <Github /> Sign in with GitHub
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
