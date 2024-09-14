import { useState } from "react";
import EditAccounts from "./EditAccounts";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

const AccountsSettings = () => {
    const [facebook, setFacebook] = useState("www.facebook.com");
    const [twitter, setTwitter] = useState("www.twitter.com");
    const [instagram, setInstagram] = useState("www.instagram.com");
    const [github, setGithub] = useState("www.github.com");
    const [linkedin, setLinkedin] = useState("www.linkedin.com");
  
    const [showModal, setShowModal] = useState(false);
  
    const toggleModal = () => {
      setShowModal(true);
    };

    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Social accounts
                </h3>
            </div>
            <div className="px-7 mb-3">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <FaFacebook className='text-xl' />                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                    Facebook account
                                </span>
                                <a href={`${facebook}`} className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                    {facebook}
                                </a>
                            </div>

                        </div>
                    </li>
                    <li className="py-3">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <FaTwitterSquare className='text-xl' />                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                    Twitter account
                                </span>
                                <a href={`${twitter}`} className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                    {twitter}
                                </a>
                            </div>

                        </div>
                    </li>
                    <li className="py-3">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <FaInstagram className='text-xl' />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                    Instagram account
                                </span>
                                <a href={`${instagram}`} className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                    {instagram}
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="py-3">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <FaGithub className='text-xl' />                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                    Github account
                                </span>
                                <a href={`${github}`} className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                    {github}
                                </a>
                            </div>

                        </div>
                    </li>
                    <li className="pt-3 pb-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <CiLinkedin className='text-2xl' />                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                    Linkedin account
                                </span>
                                <a href={`${linkedin}`} className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                    {linkedin}
                                </a>
                            </div>

                        </div>
                    </li>
                </ul>
                <div className='pb-4 flex justify-center'>
                    <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-2.5 text-center" onClick={toggleModal}>
                        Edit Accounts
                    </button>
                </div>
            </div>
            {showModal && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-999">
        <div className="w-3/4 max-w-4xl">  {/* Control width here */}
            <EditAccounts
                showModal={showModal}
                setShowModal={setShowModal}
                setFacebook={setFacebook}
                setTwitter={setTwitter}
                setInstagram={setInstagram}
                setGithub={setGithub}
                setLinkedin={setLinkedin}
            />
        </div>
    </div>
)}

        </div>

    )
}

export default AccountsSettings