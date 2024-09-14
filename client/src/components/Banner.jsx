import React from "react";
import BannerImage from "../assets/reditection.jpg";
import {Link} from 'react-router-dom'


const Banner = () => {
  return (
    <section id="banner">
      <main className="bg-slate-100 dark:bg-slate-900 dark:text-white py-10">
        <section className="container flex flex-col items-center justify-center md:h-[500px] ">
          <div className="grid grid-cols-1 items-center gap-4  md:grid-cols-2">
            <div
              data-aos="fade-right"
              data-aos-duration="400"
              data-aos-once="true"
              className="flex flex-col items-start gap-4 text-left md:items-start md:p-8 md:text-left md:order-last"
            >
              <h1 className="text-2xl font-bolder md:text-4xl ">
                We Build Apps That Get Trending On Appworld
              </h1>
              <p className=" text-slate-600 dark:text-slate-400">
                Welcome to our innovative app your ultimate
                solution for efficient decision-making. <br />
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Our platform is designed to simplify and enhance
                your daily choices through carefully curated black and white lists.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Whether you're navigating information, selecting the best options, or ensuring security, our app provides
                a seamless experience.
              </p>
              
              <div className="space-x-4 pt-5">
              <Link to="/register">
                <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3 text-center">
                  Get Stared
                </button>
                </Link>
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-once="true"
              className="order-1"
            >
              <img
                src={BannerImage}
                alt="No image"
                className="max-auto w-full hover:drop-shadow-md"
              />
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Banner;