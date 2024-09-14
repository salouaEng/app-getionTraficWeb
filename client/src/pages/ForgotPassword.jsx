import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios"; // Import Axios
import toastr from 'toastr'; // Import toastr for notifications
import 'toastr/build/toastr.css'; // Import toastr CSS for styling


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sentCode, setSentCode] = useState(false);
    const navigate = useNavigate();

    const sendVerificationCode = async (e) => {
        e.preventDefault(); // Prevent form submission
        console.log("Email to send:", email); 
        try {
            const response = await axios.post("http://localhost:5000/user/send_recovery_email", {
                recipient_email: email
            });
            
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('recoveryToken', token);
                console.log("Token stored in local storage:", localStorage.getItem("recoveryToken"));
                toastr.success("Verification code sent successfully!");
                console.log("Verification code sent successfully!");
                setTimeout(() => {
                    navigate('/resend');
                }, 4000); 
            } else {
                console.error("Failed to send verification code:", response.statusText);
                toastr.error("Failed to send verification code.");
            }
        } catch (error) {
            toastr.error('Error sending verification code: ' + error.message, 'Error');
            console.error("Error sending verification code:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center dark:bg-black dark:text-white">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md dark:bg-gray-700 dark:text-white">
                <div className="ml-4">
                    <Link to="/login" className="relative top-0 mt-0 ml-4 right-10">
                        <ArrowBackIcon />
                    </Link>
                </div>
                <form className="space-y-4" onSubmit={sendVerificationCode}>
                    {!sentCode && (
                        <>
                            <h2 className="text-2xl font-bold text-center">Forget Password</h2>
                            <p className="text-gray-600 text-center dark:text-gray-300 pb-8">
                                Oops! Forgotten your password? No problem!
                                <br />
                                Please enter your email address below, and we'll send you a verification code.
                            </p>
                            <div className="w-full">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="dark:bg-gray-600 dark:border-gray-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div className='mt-4 flex justify-center items-center'>
                                <button
                                    type="submit" // Set button type to submit
                                    className="flex justify-center items-center w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Send Verification Code
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
