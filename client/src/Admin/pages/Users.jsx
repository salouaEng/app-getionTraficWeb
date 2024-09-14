import React, { useState, useRef, useEffect } from 'react';
import PageLink from '../components/PageLinks/PageLink';
import DefaultLayout from '../layout/DefaultLayout';
import { CiSearch } from "react-icons/ci";
import user1 from "../assets/user/user-01.png";
import user2 from "../assets/user/user-02.png";
import user3 from "../assets/user/user-03.png";
import user4 from "../assets/user/user-04.png";
import user5 from "../assets/user/user-05.png";
import user6 from "../assets/user/user-06.png";
import { Link, useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
import AddUser from "../components/AddUser";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import toastr from 'toastr';


const Users = () => {
  const [showOptions, setShowOptions] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [openRows, setOpenRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const divRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleEditClick = (item) => {
    localStorage.setItem('currentUser', JSON.stringify(item));
    const parsedUser= localStorage.getItem('currentUser');
    console.log('User Data:', parsedUser);
    navigate('/admin/client-profile');
  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      toastr.clear();
      try {
        const response = await axios.get('http://localhost:5000/user/get-users');
        const clients = response.data.clients;
        if (!clients || !Array.isArray(clients)) {
          throw new Error('Invalid user data received');
        }
        const users = clients.map((client, index) => ({
          photo: [user1, user2, user3, user4, user5, user6][index % 6], // Cycle through user images
          name: `${client.first_name} ${client.last_name}`,
          email: client.email,
          phone: client.phone_number,
          address: client.address,
          birthday: client.birthday,
          status: client.status,
          isAdmin: client.isAdmin
        }));
        const filteredUsers = users.filter(user => user.isAdmin !== 1);
        setPackageData(filteredUsers);
        setOpenRows(new Array(filteredUsers.length).fill(false));
        toastr.clear();
      } catch (error) {
        console.error(error);
        toastr.error('Failed to load users');
      }
    };

    fetchUsers();
  }, []);


  const filteredUsers = packageData.filter(user =>
    (typeof user.name === 'string' && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof user.email === 'string' && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof user.phone === 'string' && user.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof user.address === 'string' && user.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof user.status === 'string' && user.status.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  const toggleRow = (index) => {
    const updatedOpenRows = [...openRows];
    updatedOpenRows[index] = !updatedOpenRows[index];
    setOpenRows(updatedOpenRows);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutside = divRefs.current.every((ref) => ref && !ref.current.contains(event.target));
      if (clickedOutside) {
        setOpenRows(openRows.map(() => false));
      }
    };


    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openRows]);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(true);
  };

  const toggleDeleteModal = (key) => {
    setIndexToDelete(key); // Update the index to delete
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = () => {
    // Create a copy of the packageData array
    const updatedPackageData = [...packageData];
    // Remove the item at the specified index
    updatedPackageData.splice(indexToDelete, 1);
    // Update the state with the modified packageData array
    setPackageData(updatedPackageData);
    // Close the delete modal
    toggleDeleteModal(null);
    // Show a success message
    toastr.success('User deleted successfully');
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const sortedUsers = currentUsers.slice().sort((a, b) => b.id - a.id);

  return (
    <div>
      <DefaultLayout>
        <PageLink pageName="Users List" />
        <div className="flex flex-col gap-10 rounded-lg">
          <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto rounded-lg">
              <div className="sm:flex">
                <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                  <div className="relative">
                    <span className="absolute left-4.5 top-3.5">
                      <CiSearch className='text-xl text-gray-500 dark:text-gray-400' />
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-[#EFF4FB] py-2.5 pl-11.5 pr-30 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Search"
                      id="Search"
                      placeholder="Search"
                      onChange={(e) => handleSearch(e.target.value)} // Add onChange event
                    />

                  </div>
                </div>
                <div className="sm:ml-auto flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-2.5 text-center"
                    onClick={toggleModal}
                  >
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M13.5 10a1 1 0 01-1 1H10v2.5a1 1 0 01-2 0V11H6.5a1 1 0 010-2H8V6.5a1 1 0 012 0V9h2.5a1 1 0 011 1zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd"></path>
                    </svg>
                    Add user
                  </button>
                </div>

                {showModal && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-999">
                    <AddUser
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </div>
                )}
              </div>
              <table className="w-full table-auto rounded-lg mt-7">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4 rounded-lg">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Full Name</th>
                    <th className="min-w-[150px] py-4 px-3 font-medium text-black dark:text-white">Email</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Phone Number</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Address</th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.sort((a, b) => a.id - b.id).map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-0 px-4 pl-1 dark:border-strokedark xl:pl-1">
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                          <div className="flex-shrink-0 rounded-full w-[70px] h-auto">
                            <img src={item.photo} alt="User" />
                          </div>
                          <p className="text-black dark:text-white sm:block">{item.name}</p>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.email}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.phone}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.address}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className={`inline-flex rounded-full bg-opacity-[15%] py-1 px-3 text-sm font-medium ${item.status === "active" ? "bg-success text-success" : "bg-meta-1 text-meta-1"}`}>
                          {item.status}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                        <div className="relative flex justify-end" ref={(el) => (divRefs.current[index] = el)}>
                          <div >
                            <Link to="/admin/client-profile">
                              <MdOutlineEdit size={20}
                                className="cursor-pointer block text-gray-400"
                                onClick={() => handleEditClick(item)} />
                            </Link>
                          </div>
                          <div >
                            <AiOutlineDelete
                              size={20}
                              className="cursor-pointer block text-gray-400"
                              onClick={() => toggleDeleteModal(index)}
                            />

                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center">
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-stroke text-black shadow-sm"
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  >
                    <TbChevronLeft className="w-6 h-6" />
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-stroke text-black shadow-sm">
                    {currentPage}
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-stroke text-black shadow-sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <TbChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <p className="text-black dark:text-white">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{Math.ceil(filteredUsers.length / usersPerPage)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete User</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button className="text-red-500 font-semibold mr-2" onClick={() => toggleDeleteModal(index)}>Cancel</button>
              <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;
