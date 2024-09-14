import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function AddUser({ showModal, setShowModal }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        number_phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/createUserByAdmin', formData);
            console.log(response.data); // Handle success response
            setShowModal(false); // Close modal on success
            toastr.success(response.data.message); // Show success notification
        } catch (error) {
            console.error('Error creating user:', error);
            toastr.error('Error creating user'); // Show error notification
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal();
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);



    return (
        <div className='bg-white dark:bg-slate-900 mx-60 my-50 dark:text-white md:mx-80 md:my-80'>
            <section className="text-gray-500 body-font relative transition-all duration-200">
                <div className="container py-3 px-30 mx-auto">
                    <div className="lg:w-full md:w-full mx-auto">
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="first_name" className="leading-7 text-sm text-gray-600 dark:text-gray-400">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        placeholder='First Name'
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        htmlFor="last_name"
                                        className="leading-7 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        placeholder='Last Name'
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        htmlFor="email"
                                        className="leading-7 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder='Email'
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        htmlFor="number_phone"
                                        className="leading-7 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="number_phone"
                                        name="number_phone"
                                        placeholder='Phone'
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        htmlFor="address"
                                        className="leading-7 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder='Address'
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        htmlFor="password"
                                        className="leading-7 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder='Password'
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full justify-center text-center mt-2">
                                <button className="rounded-lg bg-white border border-gray-400 px-8 py-3 text-gray-700 transition-colors duration-300 hover:bg-white/90 hover:text-gray-800 mr-6" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3"
                                    onClick={handleSubmit}>
                                    Create User
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default AddUser;