import React, { useEffect, useState, useRef } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import logo from '../../assets/logo.jpg';
import {Link} from 'react-router-dom';

import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  const [showMenu, setShowMenu] = useState(false);

  const element = document.documentElement;
  const menuRef =useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("dark theme");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("light theme");
    }
  }, [theme]);

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
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        data-aos="fade"
        data-aos-duration="300"
        className="relative z-[99] shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200"
      >
        <nav className="container flex h-[60px] items-center justify-between py-2 ">
          <div className="flex items-center">
            <img
              src={logo}
              alt="GeoBlend"
              className="rounded-full"
              style={{ width: '50px', height: 'auto' }}
            />
            <div className="text-2x md:text-3xl cursor-pointer ml-2">
              <a href="/#home" className="">
                Boost
                <span className="inline-block font-bold text-primary">Flow</span>
              </a>
            </div>
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10">
              <li className="cursor-pointer pl-8 hover:font-medium hover:text-cyan-300" onClick={() => scrollToSection('banner')}>
                <a>About</a>
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('features')}>
                <a>Features</a>
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('pricing')}>
                <a>Pricing</a>
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('testimonial')}>
                <a>Testimonial</a>
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => scrollToSection('contact')}>
                <a>Contact</a>
              </li>

              {/* Sig Up section */}
              <Link to="/register">
              <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2 text-center">
                Sign Up
              </button>
              </Link>

              {/* Light and dark mode switcher */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl cursor-pointer"
                />
              )}
            </ul>
          </div>

          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-6 py-2.5 text-center">
              Sign Up
            </button>
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </nav>
      </header>
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60" onClick={() => setShowMenu(false)}>
          <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>)}
    </>
  );
};

export default Navbar;