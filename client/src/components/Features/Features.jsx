import React, { useEffect } from "react";
import Img1 from "../../assets/Feature-1.png";
import Img2 from "../../assets/Feature-2.jpg";
import Img3 from "../../assets/Feature-3.png";

const Features = () => {
  return (
    <section id="features">
      <main data-aos="fade-up" data-aos-offset="200">
        <section className="container mb-10 py-8">
          <h1 className="mb-8 border-l-4 py-2 pl-2 text-center text-3xl font-bold">
            Our Features
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div
              id="card"
              className="p-4 shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950"
            >
              <div className="overflow-hidden">
                <img
                  src={Img1}
                  alt="No image"
                  className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
                />
              </div>

              <div className="space-y-3 py-6">
                <h1 className="line-clamp-1 text-xl text-center font-bold">
                  Redirection
                </h1>
                <p className="line-clamp-2 text-center">
                  Effortlessly guide users to relevant content based on their geographic location, ensuring a seamless browsing experience.
                </p>
              </div>
            </div>
            <div
              id="card"
              className="p-4 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-slate-950"
            >
              <div className="overflow-hidden">
                <img
                  src={Img2}
                  alt="No image"
                  className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
                />
              </div>
              <div className="space-y-3 py-6">
                <h1 className="line-clamp-1 text-xl text-center font-bold">
                  Protection IOS
                </h1>
                <p className="line-clamp-2 text-center">
                  Shield your platform from malicious attacks and ensure uninterrupted service by implementing robust DDoS protection measures.
                </p>
              </div>
            </div>
            <div
              id="card"
              className="p-4 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-slate-950"
            >
              <div className="overflow-hidden">
                <img
                  src={Img3}
                  alt="No image"
                  className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
                />
              </div>
              <div className="space-y-3 py-6">
                <h1 className="line-clamp-1 text-xl text-center font-bold">
                  Flow control
                </h1>
                <p className="line-clamp-2 text-center">
                  Condense lengthy URLs into concise, shareable links, simplifying content distribution and enhancing user engagement.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </section>
  );
};

export default Features;