<div align="center" style="padding:20px;">
  <h1 style="font-size:40px; color:#FF6F61;">🐾 Pawmart Frontend – React & Tailwind</h1>
  <p>
    Frontend of <strong>Pawmart</strong> web application where users can adopt pets, purchase pet products, 
    and sellers can list, update, or delete products. Built using <strong>React 19, TailwindCSS v4, DaisyUI, Firebase</strong> and more.
  </p>
</div>

<hr/>

<h2 style="color:#FF6F61;">📌 Features</h2>

<h3>🔐 Authentication & Authorization</h3>
<ul>
  <li>Firebase Authentication for signup, login, logout</li>
  <li>JWT token handling with backend integration</li>
  <li>Protected routes using React Router v7</li>
  <li>React Context API used for managing global auth state</li>
</ul>

<h3>🐶 Pet Adoption & Product Features</h3>
<ul>
  <li>Browse available pets for adoption</li>
  <li>Create adoption requests</li>
  <li>Browse products and place orders</li>
  <li>Sellers can add, update, delete products via API</li>
</ul>

<h3>📦 Cart & Orders</h3>
<ul>
  <li>View cart and manage product orders</li>
  <li>Order summary with PDF export using jsPDF & jsPDF-AutoTable</li>
</ul>

<h3>💅 UI & Styling</h3>
<ul>
  <li>TailwindCSS v4 for responsive design</li>
  <li>DaisyUI components for modern UI</li>
  <li>Swiper.js for carousels and slides</li>
  <li>Lucide-react icons for interactive UI</li>
</ul>

<h3>📡 API & State Management</h3>
<ul>
  <li>Axios for API requests to backend server</li>
  <li>React Context API for auth, cart, and global state</li>
  <li>Zod for client-side form validation</li>
  <li>React-hot-toast & React-toastify for notifications</li>
</ul>

<h3>🧰 Utilities & Performance</h3>
<ul>
  <li>Lodash for data manipulation</li>
  <li>PDF generation for orders and reports</li>
</ul>

<hr/>

<h2 style="color:#FF6F61;">🛠 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React 19.1.1</li>
  <li>React Router v7.9.5</li>
  <li>TailwindCSS v4.1.17 + DaisyUI v5.4.7</li>
  <li>Axios</li>
  <li>React-hot-toast & React-toastify</li>
  <li>Firebase 12.5.0</li>
  <li>Swiper 12.0.3</li>
  <li>jsPDF & jsPDF-AutoTable</li>
  <li>Lodash</li>
  <li>Zod (validation)</li>
  <li>Lucide-react icons</li>
</ul>

<hr/>

<h2 style="color:#FF6F61;">📂 Folder Structure (Example)</h2>

<pre>
<code class="language-bash">
src/
 ├─ components/
 │
 ├─ context/
 │   └─ AuthContext.js
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ Products.jsx
 │   ├─ PetAdoption.jsx
 │   ├─ Cart.jsx
 │   └─ Profile.jsx
 ├─ services/
 │   └─ api.js
 ├─ utils/
 ├─ App.jsx
 └─ main.jsx
</code>
</pre>

<hr/>

<h2 style="color:#FF6F61;">⚙️ Installation & Setup</h2>

<pre>
<code class="language-bash">
# Clone the repository
git clone https://github.com/BiplobSordar/PawMart-Client.git

# Navigate into folder
cd PawMart-Client


# Install dependencies
npm install
</code>
</pre>

<h3>Environment Variables (.env)</h3>
<P>Fill the .env file using the firebase creadentials</P>
<pre>
<code>
VITE_FIREBASE_API_KEY=FireBase_Creadentials
VITE_FIREBASE_AUTH_DOMAIN=FireBase_Creadentials
VITE_FIREBASE_PROJECT_ID=FireBase_Creadentials
VITE_FIREBASE_STORAGE_BUCKET=FireBase_Creadentials
VITE_FIREBASE_MESSAGING_SENDER_ID=FireBase_Creadentials
VITE_FIREBASE_APP_ID=FireBase_Creadentials
VITE_FIREBASE_MEASUREMENT_ID=FireBase_Creadentials
VITE_API_BASE_URL=Backend_Url

</code>
</pre>

<h3>Start the App</h3>
<pre>
<code class="language-bash">
npm run dev
</code>
</pre>

<hr/>



<h2 style="color:#FF6F61;">🚀 Future Improvements</h2>
<ul>
  <li>Real-time chat for adopters and sellers</li>
  <li>Payment integration for products</li>
  <li>Advanced search & filters for pets/products</li>
  <li>User activity dashboard & analytics</li>
</ul>

<hr/>

<h2 style="color:#FF6F61;">🧑‍💻 Author</h2>
<p>
  <strong>Biplob Sordar</strong><br/>
  Full Stack Developer – Bangladesh<br/>
  Portfolio: <em>Add link</em><br/>
  LinkedIn: <em>https://www.linkedin.com/in/biplob-sordar-047a87264/</em>
</p>

<hr/>

<h2>⭐ Support</h2>
<p>If you like this frontend project, please star ⭐ the repository!</p>
