import React, { useState, useEffect } from 'react';
import Dash from '../assets/webpage.png';
import axios from 'axios';

const HelloCard = () => {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('recoveryToken');
                const response = await axios.get('http://localhost:5000/user/get-userByEmail', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFirstName(response.data.user.first_name);
                console.log("first name: "+ response.data.user.first_name)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="rounded-lg border border-stroke bg-gradient-to-l from-cyan-400 to-blue-600 py-2 px-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between">
                <div className='grid grid-cols-2'>
                    <div className='justify-start'> 
                        <h4 className="text-2xl font-bold text-white py-5">
                            Welcome, {firstName}
                        </h4>
                        <span className='text-sm text-white mt-10'>
                            As you explore, here's a quick overview to help you make the most of your analytics journey.
                        </span>
                    </div>

                    <div className='flex justify-end'>
                        <img
                            src={Dash}
                            alt=""
                            className="h-44 w-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelloCard;
