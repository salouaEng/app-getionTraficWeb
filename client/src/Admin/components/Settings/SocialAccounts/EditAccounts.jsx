import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaFacebook, FaGithub, FaTwitterSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const EditAccounts = ({ setShowModal, setFacebook, setTwitter, setInstagram, setGithub, setLinkedin }) => {
    const [facebookValue, setFacebookValue] = useState("www.facebook.com");
    const [twitterValue, setTwitterValue] = useState("www.twitter.com");
    const [instagramValue, setInstagramValue] = useState("www.instagram.com");
    const [githubValue, setGithubValue] = useState("www.github.com");
    const [linkedinValue, setLinkedinValue] = useState("www.linkedin.com");

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowModal]);

    const handleSave = () => {
        setFacebook(facebookValue);
        setTwitter(twitterValue);
        setInstagram(instagramValue);
        setGithub(githubValue);
        setLinkedin(linkedinValue);
        setShowModal(false);
    };

    return (
        <div ref={ref} className="bg-white dark:bg-slate-900 my-40 dark:text-white md:mx-60">
                <div className="container ">
                    <div className="flex justify-center">
                        <div className="p-4">
                            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                                {[
                                    { label: "Facebook account", icon: FaFacebook, value: facebookValue, setValue: setFacebookValue },
                                    { label: "Twitter account", icon: FaTwitterSquare, value: twitterValue, setValue: setTwitterValue },
                                    { label: "Instagram account", icon: FaInstagram, value: instagramValue, setValue: setInstagramValue },
                                    { label: "Github account", icon: FaGithub, value: githubValue, setValue: setGithubValue },
                                    { label: "Linkedin account", icon: CiLinkedin, value: linkedinValue, setValue: setLinkedinValue }
                                ].map((account, index) => (
                                    <div key={index} className="mb-5">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            {account.label}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-3.5">
                                                <account.icon className='text-xl text-gray-500 dark:text-gray-400' />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-[#EFF4FB] py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                placeholder={account.value}
                                                value={account.value}
                                                onChange={(e) => account.setValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-center gap-6">
                                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-10 py-2.5 text-center">
                                        Save
                                    </button>
                                    <button type="button" className="py-2.5 px-8 bg-white border border-stroke rounded-lg text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white dark:bg-gray-600 dark:border-0" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default EditAccounts;
