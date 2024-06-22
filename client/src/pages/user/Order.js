import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrder = async () => {
      const user = JSON.parse(localStorage.getItem("auth"));
      console.log(user.user);
      const email = user.user.email;
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/order/get-order",
          { email }
        );
        setOrders(response.data.orders);
        console.log(response.data.message, response.data.orders);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchAllOrder();
  }, []);

  return (
    <Layout>
      <div
        className="text-white mx-auto md:text-5xl pt-10"
        style={{ width: "80vw" }}
      >
        <h1 className="mx-auto text-center text-2xl my-10">All Orders</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Shipping Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((element) => (
                <tr
                  key={element.pid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.productName}
                  </td>
                  {/* <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.description}
                  </td> */}
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.productPrice}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.orderDate}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {element.shipping === 0 ? (
                      <p>Processing</p>
                    ) : element.shipping === 1 ? (
                      <p>Shipping</p>
                    ) : (
                      <p>Completed</p>
                    )}
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
                            `http://localhost:8080/api/v1/order/delete-order`,
                            {
                              params: {
                                email: user.user.email,
                                pid: element.pid,
                              },
                            }
                          );
                          console.log(response.data.message);
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

export default Order;
