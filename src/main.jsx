
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </CategoryProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 80,
          right: 16,
        }}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "0.95rem",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "#fff" },
            style: { background: "#22c55e", color: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
            style: { background: "#ef4444", color: "#fff" },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
