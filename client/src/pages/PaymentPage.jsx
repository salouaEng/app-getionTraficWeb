import React, { useState } from 'react';
import master from "../assets/MasterCard.jpg";
import visa from "../assets/visa.jpg";
import paypal from "../assets/paypal.jpg";
import { Link, useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    toastr.success('Code verified successfully!', { autoClose: 5000 });
    setTimeout(() => {
      navigate('/client/dashboard');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center dark:bg-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl dark:bg-gray-700 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-6 md:mb-0">
            <div className="text-lg font-bold mb-2">PAYMENT METHODS</div>
            <div className="flex space-x-4">
              <img src={master} alt="MasterCard" className="h-8" />
              <img src={paypal} alt="PayPal" className="h-8" />
              <img src={visa} alt="Visa" className="h-8" />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center dark:bg-gray-800">
            <div className="mt-4 text-2xl font-bold text-blue-500">Get Started For Free Now</div>
            <button className="w-full text-white active:scale-[.98] gap-y-3 mt-5 text-xl font-bold ease-in-out transform py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:scale-[1.01]">
              <Link to="/client/dashboard" className="mt-4 text-xl font-bold">Free Trial</Link>
            </button>
          </div>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-white">Select Your payment Plan</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">--select--</option>
                <option value="mastercard">Free</option>
                <option value="paypal">Professional</option>
                <option value="visa">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-white">Select a payment method</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">--select--</option>
                <option value="mastercard">MasterCard</option>
                <option value="paypal">PayPal</option>
                <option value="visa">Visa</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-white">Expiration date</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600"
                placeholder="MM / YYYY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-white">Card Number</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-white">Security code</label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="ml-2 block text-gray-700 dark:text-white">Remember Me</label>
          </div>
    <div className='flex justify-end'>
          <Link
            to="/admin/dashboard"
            type="submit"
            className="text-center mt-6 w-full bg-blue-500 text-white py-2.5 px-5 rounded-md hover:bg-blue-600"
            onClick={handlePaymentSubmit}
          >
            Continue
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
