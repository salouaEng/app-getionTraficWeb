import React, { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const PasswordSettings = () => {
    const [token, setToken] = useState("");
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { currentPassword, newPassword, confirmPassword } = passwordData;
    
        if (newPassword !== confirmPassword) {
            toastr.error("New password and confirm password do not match.");
            return;
        }
    
        try {
            const token = localStorage.getItem('recoveryToken'); 
            console.log(token);
            const response = await axios.put(
                'http://localhost:5000/user/update-password-purposely',
                {
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.data.success) {
                toastr.success(response.data.message);
            } else {
                toastr.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            toastr.error('Server error. Please try again later.');
        }
    };
    

    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Password
                </h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="currentPassword"
                        >
                            Current Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-3.5">
                                <HiOutlineMail className='text-xl text-gray-500 dark:text-gray-400' />
                            </span>
                            <input
                                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                placeholder="Current Password"
                                value={passwordData.currentPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="newPassword"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-3.5">
                                <HiOutlineMail className='text-xl text-gray-500 dark:text-gray-400' />
                            </span>
                            <input
                                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                placeholder="New Password"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-9">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-3.5">
                                <HiOutlineMail className='text-xl text-gray-500 dark:text-gray-400' />
                            </span>
                            <input
                                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
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
};

export default PasswordSettings;
