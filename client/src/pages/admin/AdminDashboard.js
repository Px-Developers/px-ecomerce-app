import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row ">
        {/* Left Sidebar */}
        <div className="bg-gray-900  admin-left-panel">
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

        {/* Right Content Area */}
        <div className=" bg-gray-800 md:w-3/4 md:min-h-screen p-10">
          <h1 className="adminHeading text-white text-center md:text-5xl">
            Admin Operations
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
