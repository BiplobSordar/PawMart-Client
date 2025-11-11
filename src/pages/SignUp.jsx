import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Image, Chrome, Github } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { handleError } from '../utils/handleError.js'

const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser, loading, setLoading, error, setError, signUp, login, loginWithGoogle, loginWithGithub, logout } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", photoURL: "" });


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log(form, 'this i sthe from value')
      const result = await signUp(form?.email, form.password, form?.name, form.photoURL);
      setUser(result?.user)
      toast.success("Registration successful! 🎉");
      navigate("/");

    } catch (err) {
      console.log(err, 'thsi is ht error')
      setError(handleError(err))

      toast.error(handleError(err))
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      setUser(result?.user)
      toast.success("Registered with Google! 🐶");
      navigate("/");
    } catch (err) {
      setError(handleError(err))
      toast.error(handleError(err))
    } finally {
      setLoading(false);
    }
  };

  const handleGithub = async () => {
    setLoading(true);
    try {
      const result = await loginWithGithub();
      setUser(result?.user)
      toast.success("Registered with GitHub! 🐱");
      navigate("/");
    } catch (err) {
      setError(handleError(err))
      toast.error(handleError(err))
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF8C42] via-[#FFE066] to-[#FFB6B9] flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Create Your PawMart Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            onClick={handleGoogle}
            className="flex items-center justify-center gap-2 border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            <Chrome /> Sign up with Google
          </button>
          <button
            onClick={handleGithub}
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
