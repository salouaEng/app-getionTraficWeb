import React from "react";
import Banner from "../assets/globe.png";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <main className="bg-gradient-to-t from-[#033363] to-[#021F3B] pt-14 dark:bg-blue-950 rounded-lg">
      <section className="container flex h-[900px] flex-col items-center justify-center md:h-[600px] ">
        <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left md:mt-0"
          >
            <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[52px] text-white ss:leading-[80px] leading-[60px]">
              Clarity in a Click <br className="sm:block hidden" />{" "}
              <span className="text-gradient text-cyan-200">Black or White</span>{" "}<br />
              Lists Pick
            </h1>
            <p className="pt-6">
              Unlock the power of distinction at our Platform.
              Navigate effortlessly through curated lists, whether it's for clarity, security, or information.
            </p>
            <p className="pb-3">
              We're dedicated to providing a straightforward experience, helping you distinguish between the essentials. 
              </p>
            <div className="space-x-4">
            <Link to="/register">
              <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3 text-center">
                Start Free Trial
              </button>
              </Link>
              <Link to="/login" className="text-white bg-transparent border from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:border-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3 text-center">
                Loggin
                </Link>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-lg"
          >
            <img 
              src={Banner} 
              alt="No image" 
              className="hover:drop-shadow-md" 
              style={{ width: '450px', height: 'auto' }}/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;