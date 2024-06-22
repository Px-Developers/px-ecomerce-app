import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const Contact = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/send-email`,
        {
          clientEmail,
          description,
        }
      );

      if (response.status === 200) {
        setMessage("Email sent successfully!");
      } else {
        setMessage("Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to send email. Please try again later.");
    }

    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="w-1/2 mx-auto pt-10 about-container contact-container">
        <div className="about p-6">
          <h1 className="text-4xl text-center py-4">Contact</h1>

          <div className="flex contact">
            <div className="left-side-contact">
              <p className="py-10">📧 pxdevelopers208@gmail.com</p>
              <p>☎️ +923250880762 </p>
            </div>
            <div className="relative p-4 w-full max-w-md max-h-full ml-20 right-0 bottom-contact">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-blue-900 contact-form">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Contact Us Via Mail
                  </h3>
                </div>
                {/* Modal body */}
                <form
                  onSubmit={handleSubmit}
                  className="p-4 md:p-5 contact-box"
                  style={{ height: "30vh" }}
                >
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="clientEmail"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        id="clientEmail"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Your email address"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Description
                      </label>
                      <textarea
                        id="description"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Write product description here"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                  {message && (
                    <p className="text-sm mt-2 text-gray-700">{message}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
