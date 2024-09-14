import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import UserOne from '../assets/user/user-01.png';
import UserTwo from '../assets/user/user-02.png';
import UserThree from '../assets/user/user-03.png';
import UserFour from '../assets/user/user-04.png';
import UserFive from '../assets/user/user-05.png';
import UserSix from '../assets/user/user-06.png';

const LatestClients = () => {
  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get-users');
        const clients = response.data.clients;
        if (!clients || !Array.isArray(clients)) {
          throw new Error('Invalid user data received');
        }
        const users = clients.map((client, index) => ({
          avatar: [UserOne, UserTwo, UserThree, UserFour, UserFive, UserSix][index % 6], // Cycle through user images
          name: `${client.first_name} ${client.last_name}`,
          email: client.email,
          status: client.status,
        }));
        const filteredUsers = users.filter(user => user.isAdmin !== 1);
        const latestSixUsers = filteredUsers.slice(0, 6).reverse(); // Get the latest 6 users and reverse
        setClientsData(latestSixUsers);
      } catch (error) {
        console.error(error);
        toastr.error('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-5 px-7.5 text-xl font-semibold text-black dark:text-white">
        Latest Clients
      </h4>

      <div>
        {clientsData.map((client, key) => (
          <Link
            to="/"
            className="flex items-center gap-4 py-4 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-12 w-12 rounded-full">
              <img src={client.avatar} alt="User" className='' />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {client.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {client.email}
                  </span>
                </p>
              </div>
            </div>

            <div className='flex flex-2 items-center justify-end'>
              <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                client.status === 'actif'||'Actif'
                  ? 'bg-success text-success'
                  : 
                    'bg-danger text-danger'
                    
              }`}>
                {client.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestClients;
