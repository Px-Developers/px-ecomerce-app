import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="w-1/2 mx-auto pt-20 about-container">
        <div className="about p-6">
          <h1 className="text-4xl text-center py-10">About Us</h1>
          <div className="flex">
            <img
              src={require("../resources/img/about.jpg")}
              className="about-img"
            />
            <div className="p-4 about-text">
              <p>
                Welcome to PX-Ecomerce, your premier destination for Best
                Quality Products. Founded with a passion for poduct, we strive
                to [mission statement or core goal]. With a commitment to
                quality and customer satisfaction, PX-Ecomerce offers Top Brand.
                Explore our offerings and join us
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
