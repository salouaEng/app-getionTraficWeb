import React, { useState, useEffect } from 'react';
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { GiPositionMarker } from "react-icons/gi";
import { IoIosCalendar } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const InfoSettings = () => {

    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        phone_number: '',
        email: '',
        address: '',
        profil: ''
    });

    useEffect(() => {
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
                    birthday: user.birthday,
                    phone_number: user.phone_number,
                    email: user.email,
                    address: user.address,
                    profil: user.profil
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('recoveryToken');
            await axios.put('http://localhost:5000/user/update', userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                toastr.success('Account updated successfully!', { autoClose: 5000 });
            })
            .catch(error => {
                toastr.error(error.response.data.message, { autoClose: 5000 });
            });
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                </h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="firstName">
                                First Name
                            </label>
                            <div className="relative">
                                <span className="absolute left-4.5 top-3.5">
                                    <FiUser className='text-xl text-gray-500 dark:text-gray-400' />
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    placeholder="Devid"
                                    value={userData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="lastName">
                                Last Name
                            </label>
                            <div className="relative">
                                <span className="absolute left-4.5 top-3.5">
                                    <FiUser className='text-xl text-gray-500 dark:text-gray-400' />
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    placeholder="Jhon"
                                    value={userData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="birthday">
                                Birthday
                            </label>
                            <div className="relative">
                                <span className="absolute left-4.5 top-3.5">
                                    <IoIosCalendar className='text-xl text-gray-500 dark:text-gray-400' />
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="birthday"
                                    id="birthday"
                                    placeholder="09/12/2000"
                                    value={userData.birthday}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                    <FaPhone className='text-gray-500 dark:text-gray-400' />
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    placeholder="+212 7343 7865"
                                    value={userData.phone_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-3.5">
                                <HiOutlineMail className='text-xl text-gray-500 dark:text-gray-400' />
                            </span>
                            <input
                                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@example.com"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="address">
                            Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-3.5">
                                <GiPositionMarker className='text-xl text-gray-500 dark:text-gray-400' />
                            </span>
                            <input
                                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="address"
                                id="address"
                                placeholder="address"
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bio">
                            BIO
                        </label>
                        <textarea
                            className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="profil"
                            id="profil"
                            placeholder="Tell us something about yourself"
                            value={userData.profil}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="flex justify-center gap-6">
                        <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-10 py-2.5 text-center">
                            Save
                        </button>
                        <button
                            type="button"
                            className="py-2.5 px-8 bg-white border border-stroke rounded-lg text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white dark:bg-gray-600 dark:border-0"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InfoSettings;
