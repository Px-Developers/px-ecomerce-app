import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrder = async () => {
      const user = JSON.parse(localStorage.getItem("auth"));
      if (!user || !user.user || !user.user.email) {
        console.error("User is not authenticated");
        return;
      }
      const email = user.user.email;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/order/get-all-order`,
          { email }
        );
        setOrders(response.data.orders);
        console.log(response.data.message, response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchAllOrder();
  }, []);

  const handleStatusChange = async (orderId, productId, value) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/order/order-status`,
        { uid: orderId, pid: productId, value }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      console.log("Order status updated:", response.data);
      // Optionally, handle success or show a toast
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optionally, handle error or show a toast
    }
  };

  const handleOrderDelete = async (orderId, productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("auth"));
      if (!user || !user.user || !user.user.email) {
        throw new Error("User is not authenticated");
      }
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/order/delete-order`,
        {
          params: {
            email: user.user.email,
            pid: productId,
          },
        }
      );
      console.log("Order deleted:", response.data);
      // Optionally, handle success or show a toast
    } catch (error) {
      console.error("Error deleting order:", error);
      // Optionally, handle error or show a toast
    }
  };

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
                  User Name
                </th>
                <th scope="col" className="px-16 py-3">
                  Product Name
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
              {orders.map((order) =>
                order.orders.map((item) => (
                  <tr
                    key={`${order.pid}-${item.pid}`}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.productPrice}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.orderDate}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <select
                        value={item.shipping}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            item.pid,
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value={0}>Processing</option>
                        <option value={1}>Shipping</option>
                        <option value={2}>Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOrderDelete(order._id, item.pid)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
