import React, { useState, useContext, useEffect, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toastr from "toastr"; // Import Toastr library
import "toastr/build/toastr.css"; // Import Toastr CSS

const RecoveryContext = createContext();

const Resend = () => {
  const recoveryContext = useContext(RecoveryContext);
  const { email, otp } = recoveryContext || {};
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [token, SetToken]=useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("recoveryToken");
    if (!token) {
      toastr.error("No verification token found. Please register again.");
      navigate("/forgot-password");
    } 
  }, [navigate]);

  function verifyOTP(event) {
    
        toastr.success('Code verified successfully!', { autoClose: 5000 });
        setTimeout(() => {
          navigate('/reset');
        }, 2000);
     
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-black">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl dark:bg-gray-700 dark:text-white">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400 dark:text-gray-300">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {[...Array(4)].map((_, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        maxLength="1"
                        className="dark:bg-gray-600 dark:border-gray-400 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput((prevInput) => {
                            const updatedInput = [...prevInput];
                            updatedInput[index] = e.target.value;
                            return updatedInput;
                          })
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-600 border-none text-white text-sm shadow-sm"
                      type="button" // Change button type to "button"
                      onClick={verifyOTP}
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 dark:text-gray-300">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => console.log("Resend OTP")}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resend;
