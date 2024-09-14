import { useState, useEffect, useRef } from "react";
import ContactModal from "./ContactModal"

const ContactCard = () => {
    const [showModal, setShowModal] = useState(false);

    const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
      const clickHandler = ({ target }) => {
          if (!dropdown.current) return;
          if (
              !dropdownOpen ||
              dropdown.current.contains(target) ||
              trigger.current.contains(target)
          )
              return;
          setDropdownOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
  });

    const toggleModal = () => {
        setShowModal(true);
    };

    return (
        <section id="contact" className="bg-slate-100 dark:bg-slate-900 pb-40">
            <main className="bg-gradient-to-r from-cyan-500 to-blue-500 mx-20 rounded-lg">
                <section data-aos="fade-up" className="container py-8 md:py-12">
                    <div className="grid grid-cols-1 items-center gap-4 sm:text-ellipsis md:grid-cols-3 md:gap-8">
                        <div className="order-1 flex flex-col items-center gap-4 text-center text-white md:col-span-2 md:items-start md:text-left w-full md:w-auto">
                            <h1 className="text-4xl font-bold ">Ready to get started ?</h1>
                            <p className="text-xl">
                                Ready to begin? Click 'Start' to dive into geo-targeted content control or 'Contact Us' for assistance.
                            </p>
                        </div>
                        <div className="order-2 flex justify-center items-center gap-4 w-full md:w-auto">
                            <button className="rounded-lg bg-transparent border border-white px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-white/90 hover:text-blue-500">
                                Get Started
                            </button>
                            <button className="rounded-lg bg-white px-6 py-3 font-bold text-gray-700 transition-colors duration-300 hover:bg-white/90 hover:text-blue-500" onClick={toggleModal}>
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <ContactModal showModal={showModal} setShowModal={setShowModal} />
                </div>
            )}
        </section>
    );
};

export default ContactCard;
