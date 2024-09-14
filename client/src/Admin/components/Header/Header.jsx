import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

const Header = ({ sidebarOpen, setSidebarOpen, theme, setTheme }) => {
    
    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const base64String = reader.result;
            setProfileImage(base64String); // Update state with base64 string representation of the image
            localStorage.setItem('profileImagePath', base64String); // Update local storage
        };
    
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL (base64)
        }
    };
    
    useEffect(() => {
        const rootElement = document.documentElement; // Access the root element

        if (theme === "dark") {
            rootElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            console.log("dark theme");
        } else {
            rootElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            console.log("light theme");
        }
    }, [theme]);

    return (
        <header className="sticky top-0 right-0 z-99 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-1.5 shadow-2 md:px-6 2xl:px-11">
                <div className="md:hidden rounded-full hover:bg-gray-200 p-2 mx-1 mr-6 cursor-pointer black:text-white dark:hover:bg-gray-700">
                    <HiOutlineMenuAlt2 
                        className='text-2xl'
                        onClick={openSidebar}
                    />
                </div>
                <div className="">
                    <form action="https://formbold.com/s/unique_form_id" method="POST">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <IoSearch className='text-xl'/>
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                            />
                        </div>
                    </form>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {theme === "dark" ? (
                            <BiSolidSun
                                onClick={() => setTheme("light")}
                                className="text-xl cursor-pointer"
                            />
                        ) : (
                            <BiSolidMoon
                                onClick={() => setTheme("dark")}
                                className="text-xl cursor-pointer"
                            />
                        )}
                        <DropdownNotification />
                        <DropdownMessage />
                    </ul>
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
