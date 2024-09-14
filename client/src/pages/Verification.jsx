import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import eye001 from "../assets/eye001.png";
import eyee from "../assets/eyee.png";

export default function Verification() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [otpInput, setOtpInput] = useState(["", "", "", ""]);

    useEffect(() => {
        const storedToken = localStorage.getItem("recoveryToken");
        if (!storedToken) {
          toastr.error("No verification token found. Please register again.");
          navigate("/register");
        } else {
          setToken(storedToken);
        }
    }, [navigate]);

    const handleVerifyAccount = (e) => {
        e.preventDefault();
        const verificationCode = otpInput.join("");
        console.log("verificationCode"+ verificationCode);
        axios.post('http://localhost:5000/user/verification', { emailsaisi: email, code: verificationCode }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            toastr.success('Account verified successfully!', { autoClose: 5000 });
            setTimeout(() => {
                navigate('/client/dashboard');
            }, 5000);
        })
        .catch(error => {
            toastr.error(error.response.data.message, { autoClose: 5000 });
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center dark:bg-black dark:text-white">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-150 dark:bg-gray-700 dark:text-white">
                <div className="ml-4">
                    <Link to="/register" className="relative top-0 mt-0 ml-4 right-10">
                        <ArrowBackIcon />
                    </Link>
                </div>
                <form className="space-y-4" onSubmit={handleVerifyAccount}>
                    <h2 className="text-2xl font-bold text-center">Unlock Your Account</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center pb-5">
                        Congratulations on completing your registration!
                        We've just sent a verification code to the email address you provided.
                        Please check your inbox and follow the instructions to unlock your account.
                    </p>
                    <div className="w-full pb-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="dark:bg-gray-600 dark:border-gray-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 ring-blue-700 focus:border-blue-700 block w-full p-2.5"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="code" className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
                            Verification Code
                        </label>
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs pb-5">
                            {[...Array(4)].map((_, index) => (
                                <div className="w-15 h-15" key={index}>
                                    <input
                                        maxLength="1"
                                        className="dark:bg-gray-600 dark:border-gray-400 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        value={otpInput[index]}
                                        onChange={(e) =>
                                            setOtpInput((prevInput) => {
                                                const updatedInput = [...prevInput];
                                                updatedInput[index] = e.target.value;
                                                return updatedInput;
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center items-center'>
                        <button
                            type="submit"
                            className="flex mb-3 justify-center items-center w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Verify Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
