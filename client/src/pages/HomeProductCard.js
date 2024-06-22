import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handlOrder = async () => {};
  return (
    <div
      className=" product-card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      style={{ marginTop: "4%" }}
    >
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src={`/api/v1/product/product-photo/${product._id}`} // Use the generated URL here
          alt="Product Image"
          style={{ maxHeight: "200px", maxWidth: "80%" }}
        />
        {/* {toast.loading(product._id)} */}
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <p className="text-sm tracking-tight text-gray-900 dark:text-white">
            {product.description}
          </p>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Star ratings */}
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between card-mobile">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <button
            onClick={async () => {
              console.log("fe delt prod");
              try {
                const user = JSON.parse(localStorage.getItem("auth"));
                console.log(user.user, product._id);
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/api/v1/order/create-order`,
                  { email: user.user.email, pid: product._id }
                );
                if (response.data.success) {
                  toast.success(response.data.message);
                  console.log(response.data.message);

                  // navigate("/dashboard/product");
                } else {
                  toast.error(response.data.message);
                }
              } catch (error) {
                toast.error("Fe Catch block called");
              }
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 mr-2 dark:focus:ring-blue-800 card-btn"
            // style={{ fontSize: "25%" }}
          >
            Order Now
          </button>
          <button
            onClick={async () => {
              console.log("Handle Cart");
              try {
                // Retrieve and parse user data from localStorage
                const user = JSON.parse(localStorage.getItem("auth"));
                console.log(user.user);
                // Check if user data is available
                if (!user.user || !user.user.email) {
                  toast.error("User is not authenticated");
                  return;
                }
                console.log(product);
                // Ensure the product object is provided
                if (
                  !product ||
                  !product._id ||
                  !product.name ||
                  !product.description ||
                  !product.price
                ) {
                  toast.error("Product details are incomplete");
                  return;
                }

                // Make the API call to add the product to the cart
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/api/v1/cart/add-cart`,
                  {
                    email: user.user.email,
                    pid: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                  }
                );

                // Handle the response from the server
                if (response.data.success) {
                  toast.success(response.data.message);
                } else {
                  toast.error(response.data.message);
                }
              } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Failed to add item to cart");
              }
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm p-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 mr-2 dark:focus:ring-blue-800 card-btn"
            // style={{ fontSize: "25%" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
