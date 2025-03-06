import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    hairType: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your form submission logic here
  };

  return (
    <main className="flex-grow bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Left Column - Form with Smaller Font Sizes */}
          <div className="md:w-1/2 p-6 sm:p-8 self-start">
            <h2 className="text-2xl font-bold mb-2">Curly Haire Care</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Your journey to beautiful curls starts here
            </p>

            <h3 className="text-xl font-bold mb-4">Create your account</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Join our community of curl and discover products perfect for your
              unique hair type.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-medium mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="hairType"
                  className="block text-xs font-medium mb-1"
                >
                  Your Hair Type
                </label>
                <select
                  id="hairType"
                  name="hairType"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                  value={formData.hairType}
                  onChange={handleChange}
                >
                  <option value="">Select your hair type</option>
                  <option value="2a">2A - Wavy</option>
                  <option value="2b">2B - Wavy</option>
                  <option value="2c">2C - Wavy</option>
                  <option value="3a">3A - Curly</option>
                  <option value="3b">3B - Curly</option>
                  <option value="3c">3C - Curly</option>
                  <option value="4a">4A - Coily</option>
                  <option value="4b">4B - Coily</option>
                  <option value="4c">4C - Coily</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="mt-0.5 mr-2 h-4 w-4"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span className="text-xs text-gray-600">
                    I agree to Curly Haire Care’s Terms of Service and Privacy
                    Policy, and consent to receiving personalized hair care
                    recommendations.
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="submit"
                  className="bg-customPurple text-white uppercase py-2 px-5 rounded font-medium w-full sm:w-auto text-sm text-center"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className="border border-gray-300 text-gray-700 uppercase py-2 px-5 rounded font-medium w-full sm:w-auto text-sm text-center"
                >
                  Back
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Column - Image (Hidden on smaller screens) */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
              <img
                src="/images/woman-picture.png"
                alt="Woman with beautiful curly hair"
                className="w-full h-auto object-cover rounded-r-lg max-h-[650px] md:max-h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}