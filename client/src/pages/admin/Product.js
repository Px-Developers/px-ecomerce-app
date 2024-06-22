import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import ProductModal from "./ProductToggle"; // Import ProductModal

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for showing modal

  const toggleModal = () => {
    setShowModal(!showModal); // Toggle showModal state
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/product/limited-products`
        );
        setAllProducts(res.data.products);
      } catch (error) {
        console.error("Could not fetch products", error);
      }
    };
    fetchProducts();

    
  }, []);

  return (
    <Layout>
      <div className="text-white m-auto md:text-5xl flex">
        {/* Left Sidebar */}
        <div className="bg-gray-900 admin-left-panel">
          <h1 className=" text-white text-center md:text-5xl py-10">
            Crud Operations
          </h1>
          <div className="flex flex-col w-full mx-auto md:w-2/3">
            <Link
              to="/dashboard/category"
              className=" admin-panel-btn text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 md:my-4 md:mx-auto md:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Category
            </Link>
            <Link
              to="/dashboard/product"
              className="admin-panel-btn text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 md:my-4 md:mx-auto md:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Products
            </Link>
            <Link
              to="/dashboard/orders"
              className="admin-panel-btn text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 md:my-4 md:mx-auto md:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Orders
            </Link>
          </div>
        </div>

        <aside className="admin-right-panel ">
          <button
            onClick={toggleModal}
            className="block mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto"
            type="button"
          >
            Create A New Product{" "}
          </button>
          {showModal && (
            <ProductModal
              toggleModal={toggleModal}
              title="Add New Product"
              btn=" Add Now"
            />
          )}{" "}
          {/* Render ProductModal if showModal is true */}
          <div
            className="show-products admin-right-panel relative w-full flex flex-wrap overflow-scroll"
            style={{
              maxHeight: "60vh",
            }}
          >
            {allProducts &&
              allProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default Product;
