import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserOne from '../../assets/user/user-01.png';
import { FaRegUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { SlArrowDown } from "react-icons/sl";
import axios from 'axios';


const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(UserOne); // Default profile image


    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const profileImagePath = localStorage.getItem('profileImagePath');
                if (profileImagePath) {
                    setProfileImage(profileImagePath);
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('recoveryToken'); // Get the email token from local storage
                const response = await axios.get('http://localhost:5000/user/get-userByEmail', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const user = response.data.user;
                setUserData({
                    first_name: user.first_name,
                    last_name: user.last_name,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchProfileImage();
        fetchUserData();

        const handleStorageChange = (e) => {
            if (e.key === 'profileImagePath') {
                setProfileImage(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
    });



    return (
        <div className="relative z-50">
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                to="#"
            >
                <span className="hidden text-right lg:block">
                    <span className="block text-sm text-black dark:text-white">
                        {userData ? userData.first_name + " " + userData.last_name : 'Loading...'}
                    </span>
                    <span className="block text-gray-500 text-xs">Client</span>
                </span>

                <span className="h-12 w-12 rounded-full top-[50%] left-[50%]">
                    <img src={profileImage} alt="User" />
                </span>

                <SlArrowDown />
            </Link>

            {/* Dropdown Start */}
            <div
                ref={dropdown}
                className={`absolute right-0 mt-1.5 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <ul className="flex flex-col gap-5 border-b dark:border-b-gray-600 border-stroke px-6 py-7.5 dark:border-strokedark">
                    <li>
                        <Link
                            to="/client/profile"
                            className="flex items-center gap-3.5 text-sm text-gray-600 duration-300 ease-in-out hover:text-primary lg:text-base dark:text-gray-300 dark:hover:text-primary"
                        >
                            <FaRegUser className='text-xl' />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/client/calendar"
                            className="flex items-center gap-3.5 text-sm text-gray-600 duration-300 ease-in-out hover:text-primary lg:text-base dark:text-gray-300 dark:hover:text-primary"
                        >
                            <IoCalendarOutline className='text-xl' />
                            <span>Calendar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/client/settings"
                            className="flex items-center gap-3.5 text-sm text-gray-600 duration-300 ease-in-out hover:text-primary lg:text-base dark:text-gray-300 dark:hover:text-primary"

                        >
                            <FiSettings className='text-xl' />

                            <span>Account Settings</span>
                        </Link>
                    </li>
                </ul>
                <Link
                    to="/"
                    className="flex items-center text-sm text-gray-600 ease-in-out gap-3.5 px-6 py-3.5 hover:text-primary lg:text-base dark:text-gray-300 dark:hover:text-primary">
                    <BiLogOut className='text-xl' />
                    <span>Log Out</span>
                </Link>
            </div>
        </div>
    );
};

export default DropdownUser;
