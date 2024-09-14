import React from "react";

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {

  console.log("showMenu", showMenu);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setShowMenu(false);
    }
  };

  return (
    <div
    className={`${
      showMenu ? "left-0" : "-left-[100%]"
    } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 dark:text-white px-8 pb-6 pt-24 transition-all duration-200 md:hidden menu-wrapper`}
    data-aos={showMenu ? "slide-right" : "slide-left"} 
    data-aos-duration="300" 
  >
      <div className="card">
        <nav className="mt-2">
          <ul className="space-y-4 text-xl">
            <li>
              <a className="mb-5 inline-block cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('banner')}>
                About us
              </a>
            </li>
            <li>
              <a className="mb-5 inline-block cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('features')}>
                Features
              </a>
            </li>
            <li>
              <a className="mb-5 inline-block cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('pricing')}>
                Pricing
              </a>
            </li>
            <li>
              <a className="mb-5 inline-block cursor-pointer hover:text-cyan-300 " onClick={() => scrollToSection('testimonial')}>
                Testimonial
              </a>
            </li>
            <li>
              <a className="mb-5 inline-block cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('contact')}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;