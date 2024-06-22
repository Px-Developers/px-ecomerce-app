// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Product from "./pages/admin/Product";
import { Toaster } from "react-hot-toast";
import Categorey from "./pages/admin/Categorey";
import UserCart from "./pages/user/UserCart";
import Order from "./pages/user/Order";
import AdminOrder from "./pages/admin/AdminOrder";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          {/* Nested routes accessible only if authenticated */}
          <Route path="user" element={<HomePage />} />
          <Route path="cart" element={<UserCart />} />
          <Route path="order" element={<Order />} />
          {/* <Route path="settings" element={<Settings />} />
        <Route path="orders" element={<Orders />} /> */}
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Categorey />} />
          <Route path="admin-order" element={<AdminOrder />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
