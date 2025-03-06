import React, { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "creditCard",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
          {/* Left Column - Shipping and Payment Form */}
          <div className="md:w-1/2 p-6 sm:p-8 self-start">
            <h2 className="text-2xl font-bold mb-2">Curly Haire Care</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Complete your purchase and enjoy your curly hair products!
            </p>

            <h3 className="text-xl font-bold mb-4">Checkout</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Please provide your shipping and payment details to finalize your
              order.
            </p>

            <form id="checkoutForm" onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <h4 className="text-lg font-semibold mb-3">Shipping Information</h4>
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="streetAddress"
                  className="block text-xs font-medium mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs font-medium mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-xs font-medium mb-1"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    <option value="CA">CA</option>
                    <option value="NY">NY</option>
                    <option value="TX">TX</option>
                    {/* Add more states as needed */}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-xs font-medium mb-1"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-xs font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Payment Method */}
              <h4 className="text-lg font-semibold mb-3">Payment Method</h4>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    className="h-5 w-5 text-customPurple focus:ring-customPurple"
                    checked={formData.paymentMethod === "creditCard"}
                    onChange={handleChange}
                  />
                  <img
                    src="/images/card.png"
                    alt="Credit Card"
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-medium">Credit Card</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    className="h-5 w-5 text-customPurple focus:ring-customPurple"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                  />
                  <img
                    src="/images/paypal.png"
                    alt="Paypal"
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-medium">Paypal</span>
                </label>
              </div>

              {formData.paymentMethod === "creditCard" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="cardNumber"
                      className="block text-xs font-medium mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-xs font-medium mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-xs font-medium mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Right Column - Order Summary and Buttons */}
          <div className="md:w-1/2 flex flex-col p-4 sm:p-6">
            <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {/* Product 1 */}
                <div className="flex items-center space-x-4">
                  <img
                    src="/images/brown-bouteille.png"
                    alt="Moisture Mist"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Moisture Mist</p>
                    <p className="text-xs text-gray-500">12 oz / Type 3 Curls</p>
                    <p className="font-medium text-sm">$24.99</p>
                  </div>
                </div>
                {/* Product 2 */}
                <div className="flex items-center space-x-4">
                  <img
                    src="/images/green-bouteille.png"
                    alt="Moisture Mist"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Moisture Mist</p>
                    <p className="text-xs text-gray-500">12 oz / Sulfate-Free</p>
                    <p className="font-medium text-sm">$19.99</p>
                  </div>
                </div>
                {/* Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">$44.98</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Shipping</span>
                    <span className="text-sm">Free</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Tax</span>
                    <span className="text-sm">$2.25</span>
                  </div>
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>$47.23</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons - Below the Order Summary */}
            <div className="w-full max-w-md mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                form="checkoutForm"
                className="bg-customPurple text-white uppercase py-2 px-5 rounded font-medium w-full sm:w-auto text-sm text-center"
              >
                Place Order
              </button>
              <button
                type="button"
                className="border border-gray-300 text-gray-700 uppercase py-2 px-5 rounded font-medium w-full sm:w-auto text-sm text-center"
              >
                Back
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center w-full max-w-md">
              🔒 Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}