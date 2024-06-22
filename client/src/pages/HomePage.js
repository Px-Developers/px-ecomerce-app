import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import HomeProductCard from "./HomeProductCard";
import RadioButtonGroup from "../components/RatioButton";
const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMoved, setIsMoved] = useState(true);

  const toggleMove = () => {
    setIsMoved(!isMoved);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/category/all-category`
        );
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((category) => category !== value)
    );
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterProducts();
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange("all");
    setSearchQuery("");
    setFilteredProducts(allProducts);
  };

  const filterProducts = () => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    switch (selectedPriceRange) {
      case "option1":
        filtered = filtered.filter((product) => product.price < 100);
        break;
      case "option2":
        filtered = filtered.filter(
          (product) => product.price >= 101 && product.price <= 200
        );
        break;
      case "option3":
        filtered = filtered.filter(
          (product) => product.price >= 201 && product.price <= 300
        );
        break;
      case "option4":
        filtered = filtered.filter((product) => product.price > 300);
        break;
      default:
        break;
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [allProducts, selectedCategories, selectedPriceRange, searchQuery]);

  return (
    <Layout>
      <div className="flex">
        <button
          onClick={toggleMove}
          className="transition-button absolute text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Filters
        </button>
        <div
          className={`user-left-panel p-4   move-left ${
            isMoved ? "moved" : ""
          }`}
        >
          {/* Filter by Category */}

          <div>
            <h1 className="my-10 text-center text-2xl">Filter by Category</h1>
            <div className="flex p-2 flex-col">
              {categories?.map((item) => (
                <div key={item.name} className="flex items-center h-5 my-1">
                  <input
                    id={item.name}
                    type="checkbox"
                    value={item.name}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(item.name)}
                    className="w-4 h-4 border-gray-900 rounded bg-gray-900 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={item.name}
                    className="font-medium text-white dark:text-white px-2"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter by Price */}
          <div className="p-4">
            <h1 className="my-10 text-center text-2xl">Filter by Price</h1>
            <RadioButtonGroup
              selectedOption={selectedPriceRange}
              handleChange={handlePriceRangeChange}
            />
          </div>
          {/* Clear Filters Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="user-right-panel">
          {/* Search by Name */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-md mx-auto my-10"
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          {/* Product Display */}
          <div
            className="show-products admin-right-panel relative w-full flex flex-wrap overflow-scroll"
            style={{
              maxHeight: "60vh",
              overflow: "auto",
              paddingRight: "15px",
              paddingBottom: "15px",
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #e8e8e8",
            }}
          >
            {filteredProducts.map((product) => (
              <HomeProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
