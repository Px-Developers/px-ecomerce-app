import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main
        className="bg-gray-900 main"
        style={{
          height: "72.7vh",
          // overflow: "scroll",
          // background: " rgb(58, 57, 57)",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
