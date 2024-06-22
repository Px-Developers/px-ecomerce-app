import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Categorey = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/category/all-category`
        );
        setCategories(response.data.categories); // Assuming response.data has a 'categories' field
        console.log("Fetch category", response.data.categories); // Assuming response.data has a 'categories' field
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategory();
  }, []);

  const handleInsertCategory = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please Insert Name of Category First");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/category/create-category`,
        { name }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setCategories([...categories, response.data.category]); // Update categories state with new category
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Create category error:", err);
      toast.error("Failed to create category");
    }
  };

  const handleUpdate = async (cid) => {
    const newName = prompt("Enter New Name: ");
    try {
      if (newName === "") {
        toast.error("Please Enter Name Properly...");
      }

      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/v1/category/update-category/${cid}`, {
          name: newName,
        })
        .then((result) => {
          if (result.data.success) {
            toast.success(result.data.message);
          } else {
            toast.error(result.data.message);
          }
        });
    } catch (error) {
      toast.error("update category catch called");
    }
  };

  return (
    <Layout>
      <div className="text-white m-auto md:text-5xl flex">
        {/* Left Sidebar */}
        <div className="bg-gray-900 admin-left-panel">
          <h1 className="text-white text-center md:text-5xl py-10">
            Crud Operations
          </h1>
          <div className="flex flex-col w-full mx-auto md:w-2/3">
            <Link
              to="/dashboard/category"
              className="admin-panel-btn text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 md:my-4 md:mx-auto md:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

        {/* Right Panel */}
        <aside className="admin-right-panel">
          <form
            className="max-w-md mx-auto my-20"
            onSubmit={handleInsertCategory}
          >
            <div className="relative">
              <input
                value={name}
                type="text"
                id="category-name"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter category name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Insert New Category
              </button>
            </div>
          </form>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                {categories?.map((element) => (
                  <tr
                    key={element._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {element.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <button
                        onClick={() => {
                          handleUpdate(element._id);
                        }}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          try {
                            const response = await axios.delete(
                              `${process.env.REACT_APP_API_URL}/api/v1/category/delete-category/${element._id}`
                            );
                            if (response.data.success) {
                              toast.success(response.data.message);
                            }
                          } catch (error) {
                            toast.error("Catch called fe");
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
        </aside>
      </div>
    </Layout>
  );
};

export default Categorey;
