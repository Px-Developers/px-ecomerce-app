import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UserCart = () => {
  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAllCart = async () => {
      const user = JSON.parse(localStorage.getItem("auth"));
      console.log(user.user);
      const email = user.user.email;
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/cart/get-cart",
          { email }
        );
        setCart(response.data.cart);
        console.log(response.data.message, response.data.error);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchAllCart();
  }, []);

  return (
    <Layout>
      <div
        className="text-white mx-auto md:text-5xl pt-10"
        style={{ width: "80vw" }}
      >
        <h1 className="mx-auto text-center text-2xl my-10">Cart</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((element) => (
                <tr
                  key={element.pid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.description}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.price}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={async () => {
                        console.log("fe delt prod");
                        try {
                          const user = JSON.parse(localStorage.getItem("auth"));
                          console.log(user.user, element._id);
                          const response = await axios.post(
                            `http://localhost:8080/api/v1/order/create-order`,
                            { email: user.user.email, pid: element.pid }
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
                    >
                      Order Now
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        try {
                          // Retrieve user data from localStorage
                          const user = JSON.parse(localStorage.getItem("auth"));

                          // Check if user data is valid
                          if (!user || !user.user || !user.user.email) {
                            toast.error("User is not authenticated");
                            return;
                          }

                          // Construct the DELETE request URL with query parameters
                          const response = await axios.delete(
                            `http://localhost:8080/api/v1/cart/delete-cart`,
                            {
                              params: {
                                email: user.user.email,
                                pid: element.pid,
                              },
                            }
                          );

                          // Handle response
                          if (response.data.success) {
                            toast.success(response.data.message);
                          } else {
                            toast.error(response.data.message);
                          }
                        } catch (error) {
                          console.error("Error deleting cart item:", error);
                          toast.error("Failed to delete item from cart");
                        }
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UserCart;
