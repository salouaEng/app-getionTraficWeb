    import React, { useState, useEffect } from 'react';
    import PageLink from '../components/PageLinks/PageLink';
    import DefaultLayout from '../layout/DefaultLayout';
    import CoverOne from '../assets/cover/cover-01.jpg';
    import user from '../assets/user/user-01.png';
    import { Link } from 'react-router-dom';
    import { BsCameraFill } from "react-icons/bs";
    import { FaUserEdit } from "react-icons/fa";
    import Calendar from 'react-calendar';
    import axios from 'axios';
    import '../components/calendar.css';
    
    const ProfileClient = () => {
        const [date, setDate] = useState(new Date());
        const [isHovering, setIsHovering] = useState(false);
        const [userData, setUserData] = useState(null);
        const [imageCover, setImageCover] = useState(CoverOne);
        const [profileImage, setProfileImage] = useState(user); // Default profile image
        const [token, setToken] = useState("");
    
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const token = localStorage.getItem('recoveryToken');
                    const profileImagePath = localStorage.getItem('profileImagePath');
                    const coverImagePath = localStorage.getItem('coverImagePath');
                    if (profileImagePath && token && coverImagePath) {
                        // Ton code de récupération des données utilisateur
                        setProfileImage(profileImagePath);
                        setImageCover(coverImagePath);
                    }
                    const response = await axios.get('http://localhost:5000/user/get-userByEmail', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserData(response.data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            fetchUserData();
        }, []);
    
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImagePath', reader.result);
            };
    
            if (file) {
                reader.readAsDataURL(file);
            }
        };
    
        const handleFileCoverChange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setImageCover(reader.result);
                localStorage.setItem('coverImagePath', reader.result);
            };
    
            if (file) {
                reader.readAsDataURL(file);
            }
        };
    
    
        const onChange = (date) => {
            setDate(date);
        };
    
        return (
            <DefaultLayout>
                <PageLink pageName="Profile" />
    
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-3 dark:border-strokedark dark:bg-boxdark pb-3 mb-4">
                    <div className="relative h-40 md:h-55">
                        <img
                            src={imageCover}
                            alt="profile cover"
                            className="h-full w-full rounded-lg object-cover object-center z-1"
                        />
                        <label
                            htmlFor="cover"
                            className="absolute cursor-pointer bottom-1 right-1 z-3 overflow-hidden hover:bg-blue-500 flex items-center justify-center gap-2 rounded py-1 px-2 text-white hover:bg-opacity-30"
                        >
                            <input type="file" name="cover" id="cover" className="sr-only" onChange={handleFileCoverChange} />
                            <span>
                                <BsCameraFill className='text-2xl cursor-pointer' />
                            </span>
                        </label>
                    </div>
    
                    <div className='w-full h-46'>
                        <div className="relative  z-4">
                            <img src={profileImage} alt="profile" className="absolute w-35 h-auto rounded-full top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]" />
                        </div>
                        <div className="flex relative top-9 left-9 z-99 items-center justify-center">
                            <label
                                htmlFor="profile"
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-full overflow-hidden bg-blue-400 hover:bg-blue-500 dark:text-white bg-opacity-80 hover:bg-opacity-100"
                                style={{ width: '40px', height: '40px' }}
                            >
                                <input type="file" name="profile" id="profile" className="sr-only" onChange={handleFileChange} />
                                <span>
                                    <BsCameraFill className='text-2xl cursor-pointer' />
                                </span>
                            </label>
                        </div>
                    </div>
    
                    <div className="text-center -mt-26">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{userData ? userData.first_name + " " + userData.last_name : 'Loading...'}</h2>
                        <span className="text-sm font-medium text-primary">Client</span>
                    </div>
                </div>
    
                <div className="flex flex-col xl:flex-row justify-between space-y-4 xl:space-y-0 xl:space-x-4">
                    <div className="flex-1 overflow-hidden shadow-3 rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="mb-9 w-full">
                            <div className="flex items-center justify-between px-4 pb-3 pt-1">
                                <h4 className="text-xl font-medium text-navy-700 dark:text-white">
                                    General Information
                                </h4>
                                <div className="relative"
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}>
                                    {isHovering && (
                                        <div className="absolute top-3 -left-25 p-2 bg-black shadow-lg rounded text-white dark:text-black dark:bg-white dark:font-medium text-sm z-10">
                                            <p>Edit Profile</p>
                                        </div>
                                    )}
                                    <Link to="/client/setting" className="cursor-pointer rounded-full  p-2">
                                        <FaUserEdit className="text-xl text-primary" />
                                    </Link>
                                </div>
                            </div>
    
                            <p className="mt-2 px-6 text-base text-gray-600 dark:text-gray-400">
                                As we live, our hearts turn colder. Cause pain is what we go through
                                as we become older. We get insulted by others, lose trust for those
                                others. We get back stabbed by friends. It becomes harder for us to
                                give others a hand. We get our heart broken by people we love, even
                                that we give them all...
                            </p>
                        </div>
                        {/* Cards */}
                        <div className="grid grid-cols-2 gap-4 px-4 mb-8">
                            <div className="flex flex-col items-start justify-center rounded-xl  bg-clip-border px-4 py-4 shadow-3xl shadow-shadow-500 bg-gray-100 dark:bg-gray-800 dark:text-white dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {userData ? userData.first_name + " " + userData.last_name : 'Loading...'}
                                </p>
                            </div>
    
                            <div className="flex flex-col justify-center rounded-xl bg-clip-border px-4 py-4 shadow-3xl shadow-shadow-500 bg-gray-100 dark:bg-gray-800 dark:text-white dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Birthday</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {userData ? userData.birthday : 'Loading...'}
                                </p>
                            </div>
    
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-4 py-4 shadow-3xl shadow-shadow-500 bg-gray-100 dark:bg-gray-800 dark:text-white dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {userData ? userData.phone_number : 'Loading...'}
                                </p>
                            </div>
    
                            <div className="flex flex-col justify-center rounded-xl  bg-clip-border px-4 py-4 shadow-3xl shadow-shadow-500 bg-gray-100 dark:bg-gray-800 dark:text-white dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {userData ? userData.email : 'Loading...'}
                                </p>
                            </div>
    
                            <div className="flex flex-col col-span-2 items-start justify-center rounded-xl bg-clip-border px-4 py-4 shadow-3xl shadow-shadow-500 bg-gray-100 dark:bg-gray-800 dark:text-white dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {userData ? userData.address : 'Loading...'}
                                </p>
                            </div>
                        </div>
                    </div>
    
                    <div className="flex-1 overflow-hidden shadow-3 rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="px-4 xsm:px-6 pt-5">
                            <Calendar onChange={onChange} value={date} />
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    };
    
    export default ProfileClient;
    