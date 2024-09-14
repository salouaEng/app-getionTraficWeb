import React from "react";
import { Link } from "react-router-dom";


export default function Recovered() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center dark:bg-black">
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md dark:bg-gray-700 dark:border-gray-500">
      <form className="space-y-4">
      
            <h2 className="text-2xl font-bold text-center dark:text-white">Password succesfully set</h2>
            
            
            
            <div className='mt-4 flex justify-center items-center'>
            <Link
              to="/login"
              className="flex justify-center items-center w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Back to logging page
            </Link>
            </div>
         
        
      </form>
    </div>
  </div>
  );
}