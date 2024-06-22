import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth(); // Using custom hook to access authentication state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  // Function to handle user sign out
  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth"); // Remove auth data from localStorage
  };

  const handleDropDownClick = () => {
    console.log("Drop Called");
    const dropdown = document.getElementById("ul-dropdown");
    dropdown.hidden = !dropdown.hidden;
  };

  const handleDesktopDropDown = () => {
    const item = document.getElementById("desktop-dropdown");
    item.hidden = !item.hidden;
    console.log("desktop drop-down called");
  };

  return (
    <div className="relative " style={{ height: "70px" }}>
      {/* Navigation bar */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo and site title */}
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              🛍️ Ecommerce App
            </span>
          </NavLink>

          {/* Desktop Menu Section */}
          <div
            className="hidden md:flex md:w-auto md:order-2"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  exact={"true"}
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/cart"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={
                    auth?.user?.role === 1
                      ? "/dashboard/admin-order"
                      : "/dashboard/order"
                  }
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
            <ul>
              <li className="mr-6">
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
                  {auth.user ? (
                    <>
                      <div className="relative ">
                        <button
                          onClick={handleDesktopDropDown}
                          id="dropdownDefaultButton"
                          data-dropdown-toggle="dropdown"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                          type="button"
                        >
                          {auth?.user?.name}
                          <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>
                        {/* Dropdown menu */}
                        <div
                          id="dropdown"
                          className="z-10 absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                            id="desktop-dropdown"
                          >
                            <li>
                              <NavLink
                                to={`/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Dashboard
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                onClick={handleSignOut}
                                to="/"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Sign Out{" "}
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Sign In/Up{" "}
                      </NavLink>
                    </>
                  )}
                  <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className=" mobile-menu inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile Menu Section */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-600`}
          >
            <ul className="flex flex-col p-4 md:p-0 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  exact={"true"}
                  to="/"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="bg-blue-700 text-white dark:bg-blue-600 dark:text-white"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="bg-blue-700 text-white dark:bg-blue-600 dark:text-white"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="bg-blue-700 text-white dark:bg-blue-600 dark:text-white"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/cart"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/order"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  activeclassname="text-blue-700 dark:text-blue-500"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  {auth.user ? (
                    <>
                      <div className="relative">
                        <button
                          onClick={handleDropDownClick}
                          id="dropdownDefaultButton"
                          data-dropdown-toggle="dropdown"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                        >
                          {auth?.user?.name}
                          <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>
                        {/* Dropdown menu */}
                        <div
                          id="dropdown"
                          hidden={true}
                          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            id="ul-dropdown"
                            aria-labelledby="dropdownDefaultButton"
                            hidden={true}
                          >
                            <li>
                              <NavLink
                                to={`/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Dashboard
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                onClick={handleSignOut}
                                to="/"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Sign Out{" "}
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Sign In/Up{" "}
                      </NavLink>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* </div> */}
      </nav>
    </div>
  );
};

export default Header;
