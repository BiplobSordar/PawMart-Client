import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import ProductDetailsSkeleton from "../components/skeletons/ProductDetailSkeleton";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";
import { MapPin, User, Mail } from "lucide-react";
import { getProductById } from "../api/productApi";
import { handleError } from "../utils/handleError";
import OrderModal from "../components/OrderModal";

const ListingDetails = () => {

  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const { id } = useParams();
  const { sections, loadRecommended } = useProducts();
  const { data: recommended, loading: recommendedLoading } = sections.recommended;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProductById(id);
        if (!res?.product) throw new Error("Product not found");
        setProduct(res.product);

        if (res.product.category?._id) {
          loadRecommended(res.product.category._id);
        }
      } catch (err) {
        console.error(err);
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading) return <ProductDetailsSkeleton />;


  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold text-lg p-6">
        {error}
      </div>
    );


  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Product not found.
      </div>
    );

  return (
    <div className="min-h-screen px-4 md:px-8 py-10 bg-gray-50 space-y-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg p-6 md:p-10">

        <div className="w-full h-72 md:h-[420px] overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
          <img
            src={product.image || "/pet1.jpg"}
            alt={product.name || "Product"}
            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>


        <div className="flex flex-col justify-between space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            {product.name || "Unnamed Product"}
          </h1>

          {product.breed && (
            <p className="text-lg text-gray-600 font-medium">
              Breed: {product.breed}
            </p>
          )}

          <p className="text-2xl font-semibold text-primary">
            {product.price ? `$${product.price}` : "Free for Adoption"}
          </p>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="text-primary" size={20} />
            <span>{product.location || "Unknown Location"}</span>
          </div>

          <p className="text-gray-700 leading-relaxed mt-2">
            {product.description || "No description available."}
          </p>
          {product?.isPet ? <button onClick={()=>{setIsOrderOpen(true)}} className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent transition duration-300 shadow-md">
            Adopt
          </button> : <button onClick={()=>{setIsOrderOpen(true)}} className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent transition duration-300 shadow-md">
            Order Now
          </button>}

        </div>
      </div>


      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-md p-6 md:p-10 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">
          Seller Information
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-md flex items-center justify-center bg-gray-100">
              {product.seller?.avatar ? (
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name || "Seller"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Default Seller"
                  className="w-full h-full object-cover"
                />
              )}
            </div>


            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {product.seller?.name || "Unknown Seller"}
              </h3>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Mail size={16} className="text-primary" />
                {product.seller?.email || "No email available"}
              </p>
              {product.seller?.phone && (
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Phone size={16} className="text-primary" />
                  {product.seller.phone}
                </p>
              )}
            </div>
          </div>


          <div className="mt-5 sm:mt-0 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
            <p>
              <span className="font-medium text-gray-700">Seller UID:</span>{" "}
              {product.sellerUid || "N/A"}
            </p>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Recommended for You
        </h2>

        {recommendedLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : recommended && recommended.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommended.slice(0, 4).map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No recommendations found.</p>
        )}
      </div>
      {isOrderOpen && (

        <OrderModal
          isOpen={isOrderOpen}
          onClose={() => setIsOrderOpen(false)}
          product={product}

        />
      )}
    </div>
  );
};

export default ListingDetails;
