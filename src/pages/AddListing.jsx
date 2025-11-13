
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { storeProduct } from "../api/productApi";
import { useCategory } from "../context/CategoryContext";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate=useNavigate()
  const { user } = useAuth();
  const { categories } = useCategory()


  const [mode, setMode] = useState("product");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
    age: "",
    breed: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        isPet: mode === "pet",
        sellerUid: user?.uid,
      };




      await storeProduct(payload)
      toast.success(`${mode === "pet" ? "Pet" : "Product"} added successfully! 🐾`);

      setForm({
        name: "",
        category: "",
        price: "",
        location: "",
        description: "",
        image: "",
        date: "",
        email: user?.email || "",
        age: "",
        breed: "",
        stock: "",
       
      });
      navigate('/my-listings')

    } catch (error) {
      console.error(error);
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mt-14 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
          {mode === "pet" ? "Add Pet for Adoption" : "Add New Product"}
        </h1>


       <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
  <button
    type="button"
    onClick={() => setMode("product")}
    className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl font-semibold border text-sm sm:text-base transition-all duration-300 ${
      mode === "product"
        ? "bg-primary text-white border-primary shadow-md scale-105"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    🛒 Add Product
  </button>

  <button
    type="button"
    onClick={() => setMode("pet")}
    className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl font-semibold border text-sm sm:text-base transition-all duration-300 ${
      mode === "pet"
        ? "bg-primary text-white border-primary shadow-md scale-105"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    🐾 Add Pet
  </button>
</div>


        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={`Enter ${mode === "pet" ? "pet name" : "product name"}`}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>



          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>


          {mode === "product" ? (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price (৳)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Adoption Status
              </label>
              <select
                name="adoptionStatus"
                value={form.adoptionStatus}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
          )}


          {mode === "pet" && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Age (in months)</label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Breed</label>
                  <input
                    type="text"
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    placeholder="Enter breed"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </>
          )}


          {mode === "product" && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                min="0"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={`Enter ${mode === "pet" ? "pet details" : "product details"}`}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none resize-none h-28"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              required
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>




          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 cursor-not-allowed"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors text-lg"
          >
            {loading ? "Submitting..." : `Add ${mode === "pet" ? "Pet" : "Product"}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
