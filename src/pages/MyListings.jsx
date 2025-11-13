import React, { useEffect, useState } from "react";
import { Edit, Trash2, PawPrint, Package, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getMyListings, updateProduct, deleteProduct } from "../api/productApi";
import { handleError } from "../utils/handleError";
import { MyListingSkeleton } from "../components/skeletons/MyListingSkeleton";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    const fetchMyListings = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const result = await getMyListings();
        setListings(result?.products || []);
        setProductCount(result?.count || 0);
      } catch (error) {
        console.log(error)
        toast.error(handleError(error));
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, [user]);

  const handleDelete = async (id) => {
    setDeleteLoading(true)
    try {
      await deleteProduct(id);
      setListings((prev) => prev.filter((item) => item._id !== id));
      setShowConfirm(null);
      toast.success("Listing deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete listing");
      setDeleteLoading(false)
    }
  };

  const handleSave = async (e) => {
    setUpdateLoading(true)
    e.preventDefault();
    try {
      const result = await updateProduct(editingItem._id, editingItem);
      setListings((prev) =>
        prev.map((item) =>
          item._id === editingItem._id ? result.product : item
        )
      );
      setEditingItem(null);
      toast.success("Listing updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update listing");
      setUpdateLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (item) => setEditingItem(item);
  const handleDeleteConfirm = (id) => setShowConfirm(id);



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-16">
      <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">🐾 My Listings</h2>

        {loading ? (
          <MyListingSkeleton />
        ) : listings.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            You haven’t added any listings yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base text-left text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-800 font-semibold">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Location</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => {
                  const statusText = item.isPet
                    ? item.adoptionStatus === "available"
                      ? "Available for Adoption"
                      : "Adopted"
                    : item.stock > 0
                      ? "Available"
                      : "Out of Stock";

                  const statusColor = item.isPet
                    ? item.adoptionStatus === "available"
                      ? "text-green-600 bg-green-100"
                      : "text-gray-600 bg-gray-100"
                    : item.stock > 0
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100";

                  return (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      </td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 flex items-center gap-2">
                        {item.isPet ? (
                          <>
                            <PawPrint className="text-pink-500 w-4 h-4" /> Pet
                          </>
                        ) : (
                          <>
                            <Package className="text-blue-500 w-4 h-4" /> Product
                          </>
                        )}
                      </td>
                      <td className="p-4">
                        {item.isPet ? "Free" : `${item.price}৳`}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                        >
                          {statusText}
                        </span>
                      </td>
                      <td className="p-4">{item.location}</td>
                      <td className="p-4 flex gap-3 justify-end">
                        <button
                          onClick={() => handleUpdate(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(item._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              ✏️ Edit {editingItem.isPet ? "Pet Listing" : "Product Listing"}
            </h3>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingItem.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editingItem.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editingItem.description}
                  onChange={handleChange}
                  placeholder="Write a short description..."
                  rows="3"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="font-semibold text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={editingItem.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {editingItem.isPet ? (
                <>
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Breed
                    </label>
                    <input
                      type="text"
                      name="breed"
                      value={editingItem.breed}
                      onChange={handleChange}
                      placeholder="Enter breed"
                      className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Age (years)
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={editingItem.age}
                      onChange={handleChange}
                      placeholder="Enter age"
                      min="0"
                      className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col sm:col-span-2">
                    <label className="font-semibold text-gray-700 mb-1">
                      Adoption Status
                    </label>
                    <select
                      name="adoptionStatus"
                      value={editingItem.adoptionStatus}
                      onChange={handleChange}
                      className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="available">Available</option>
                      <option value="adopted">Adopted</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Price (৳)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editingItem.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      min="0"
                      className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={editingItem.stock}
                      onChange={handleChange}
                      placeholder="Enter stock count"
                      min="0"
                      className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-2 flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  disabled={updateLoading}
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  {
                    updateLoading ? 'Updating...' : 'Save Changes'
                  }

                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Listing?
            </h4>
            <p className="text-gray-500 mb-5">
              Are you sure you want to delete this listing? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(showConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
