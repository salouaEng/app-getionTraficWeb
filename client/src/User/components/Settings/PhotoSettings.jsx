import { useState, useEffect } from 'react';
import user from '../../assets/user/user-01.png';
import userCover from '../../assets/cover/cover-01.jpg'
import { BsCameraFill } from "react-icons/bs";

const PhotoSettings = () => {
    const [imageCover, setImageCover] = useState(userCover);
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
            const base64String = reader.result;
            setProfileImage(base64String); // Update state with base64 string representation of the image
            localStorage.setItem('profileImagePath', base64String); // Update local storage
        };
    
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL (base64)
        }
    };
    
    const handleFileCoverChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const base64String = reader.result;
            setImageCover(base64String); // Update state with base64 string representation of the image
            localStorage.setItem('coverImagePath', base64String); // Update local storage
        };
    
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL (base64)
        }
    };
    


    const onChange = (date) => {
        setDate(date);
    };

    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Your Photo
                </h3>
            </div>
            <div className="p-7">
                <form action="#">
                    <div className="">
                        <div className=''>
                            <div className="overflow-hidden rounded-lg border border-gray-300">
                                <div className="relative h-40 md:h-50">
                                    <img
                                        src={imageCover}
                                        alt="cover"
                                        className="h-full w-full rounded-lg object-cover object-center"
                                    />
                                    <label
                                        htmlFor="cover"
                                        className="absolute cursor-pointer bottom-1 right-1 overflow-hidden hover:bg-blue-500 flex items-center justify-center gap-2 rounded py-1 px-2 text-white hover:bg-opacity-30"
                                        onChange={handleFileCoverChange}
                                    >
                                        <input type="file" name="cover" id="cover" className="sr-only" />
                                        <span className=''>
                                            <BsCameraFill className='text-2xl cursor-pointer' />
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-25'>
                        <div className="relative">
                            <img src={profileImage} alt="profile" className="absolute border w-30 h-auto rounded-full top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]" />
                        </div>
                        <div className="flex relative top-5 left-9 items-center justify-center">
                            <label
                                htmlFor="profile"
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-full overflow-hidden bg-blue-400 hover:bg-blue-500 dark:text-white bg-opacity-80 hover:bg-opacity-100"
                                style={{ width: '30px', height: '30px' }}
                                onChange={handleFileChange}
                            >
                                <input type="file" name="profile" id="profile" className="sr-only" />
                                <span>
                                    <BsCameraFill className='text-xl cursor-pointer' />
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className=" flex justify-center gap-6">
                        {/*{/* Save Button */}
                        {/*
                        <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-10 py-2.5 text-center"
                        >
                            Save
                        </button>
                        {/* Cancel Button */}
                        {/*
                        <button
                            type="submit"
                            className="py-2.5 px-8 bg-white border border-stroke rounded-lg text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white dark:bg-gray-600 dark:border-0"
                        >
                            Cancel
                        </button>*/}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PhotoSettings