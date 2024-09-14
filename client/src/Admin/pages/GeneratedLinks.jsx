import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import PageLink from '../components/PageLinks/PageLink';
import { CiSearch } from 'react-icons/ci';
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb';
import axios from 'axios';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import toastr from 'toastr';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook


import user01 from '../assets/user/user-01.png';
import user02 from '../assets/user/user-02.png';
import user03 from '../assets/user/user-03.png';
import user04 from '../assets/user/user-04.png';
import user05 from '../assets/user/user-05.png';
import user06 from '../assets/user/user-06.png';

const GeneratedLinks = () => {
  const [packageData, setPackageData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [openRows, setOpenRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const divRefs = useRef([]);
  

  useEffect(() => {
    const fetchFlowInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get_flowInfo_byUser');
        setPackageData(response.data);
        setOpenRows(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching flow info:', error);
        toastr.error('Failed to load data');
      }
    };

    fetchFlowInfo();
  }, []);

  const toggleDeleteModal = (index) => {
    setIndexToDelete(index);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = (index) => {
    const updatedPackageData = [...packageData];
    updatedPackageData.splice(index, 1);
    setPackageData(updatedPackageData);
    toggleDeleteModal();
    toastr.success('User deleted successfully');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = packageData.filter(item =>
    `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lastFlowName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.offerPage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.whitePage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Array of user images
  const userImages = [
    user01,
    user02,
    user03,
    user04,
    user05,
    user06,
  ];

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigate = useNavigate();

  const handleEditClick = (userId) => {
    localStorage.setItem('userId', userId);
    const user_Id= localStorage.getItem('userId');
    console.log('User ID:', user_Id);
    navigate('/admin/client-generated-links');
  };

  return (
    <div>
      <DefaultLayout>
        <PageLink pageName="Generated Links" />
        <div className="flex flex-col gap-10 rounded-lg">
          <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto rounded-lg">
              <div className="sm:flex">
                <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                  <div>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3.5">
                        <CiSearch className="text-xl text-gray-500 dark:text-gray-400" />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-[#EFF4FB] py-2.5 pl-11.5 pr-30 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="Search"
                        id="Search"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:ml-auto flex justify-end">

                </div>
              </div>
              <table className="w-full table-auto rounded-lg mt-7">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4 rounded-lg">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Full Name
                    </th>
                    <th className="py-4 mx-8 font-medium text-black dark:text-white">
                      Total
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Flow Name
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Offered Page
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      White Page
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((item, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-3 px-4 pl-1 dark:border-strokedark xl:pl-1">
                        <div className="flex items-center gap-3 px-2.5 xl:px-5">
                          <div className="flex-shrink-0 rounded-full w-[70px] h-auto">
                            <img src={userImages[key % userImages.length]} alt="User" />

                          </div>
                          <p className="text-black dark:text-white sm:block">
                            {item.firstName} {item.lastName}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.totalFlows}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.lastFlowName}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.offerPage}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.whitePage}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center gap-3">
                          <Link to="/admin/client-generated-links" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                            <MdOutlineEdit 
                            className="text-lg" 
                            onClick={() => handleEditClick(item.userId)}/>
                          </Link>
                          <button onClick={() => toggleDeleteModal(key)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500">
                            <AiOutlineDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
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
                  <span className="font-medium">{Math.ceil(filteredData.length / usersPerPage)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>
          <div className="relative z-50 bg-white rounded-lg px-6 py-4">
            <h2 className="text-xl font-semibold mb-4">Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                onClick={toggleDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(indexToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedLinks;

