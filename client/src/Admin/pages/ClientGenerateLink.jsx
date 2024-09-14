import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import PageLinks from '../components/PageLinks/PageLinks';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb';
import { FiDownload } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePauseCircle } from "react-icons/md";
import axios from 'axios';
import toastr from 'toastr';

const ClientGenerateLink = () => {
  const [packageData, setPackageData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [indexToPause, setIndexToPause] = useState(null);
  const userId = localStorage.getItem('userId');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage] = useState(10); // Number of items per page
  const navigate = useNavigate(); 

  const handleEditClick = (item) => {
    localStorage.setItem('flowRef', JSON.stringify(item));
    const flowID= localStorage.getItem('flowRef');
    console.log('Flow info :', flowID);
    navigate('/client/flow-edit');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flow/getFlowsByUser', { params: { id: userId } });

        if (!response.data) {
          throw new Error('Error fetching data');
        }

        setPackageData(response.data.flows);
      } catch (error) {
        console.error("Error fetching flows:", error);
        toastr.error('Error fetching data');
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const toggleDeleteModal = (key) => {
    setIndexToDelete(key);
    setShowDeleteModal(!showDeleteModal);
  };

  const togglePauseModal = (key) => {
    setIndexToPause(key);
    setShowPauseModal(!showPauseModal);
  };

  const handleDelete = (key) => {
    const updatedPackageData = [...packageData];
    updatedPackageData.splice(key, 1);
    setPackageData(updatedPackageData);
    toggleDeleteModal();
  };

  const handlePause = (key) => {
    if (key !== null && packageData[key]) {
      const updatedPackageData = [...packageData];
      const itemToUpdate = updatedPackageData[key];
      const updatedItem = { ...itemToUpdate, selectedStatus: itemToUpdate.selectedStatus === 'active' ? 'pause' : 'active' };
      updatedPackageData.splice(key, 1, updatedItem);
      setPackageData(updatedPackageData);
    }
    togglePauseModal(null);
  };

  const filteredData = packageData.filter(item =>
    item.flowName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage * perPage < filteredData.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const generateZip = async (referenceCode) => {
    const token = localStorage.getItem('recoveryToken');
    try {
        const response = await axios.post(
            "http://localhost:5000/user/generate-zip",
            { code: referenceCode },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            }
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${referenceCode}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toastr.success('ZIP file generated successfully!', 'Success');
        } else {
            console.log("Error generating ZIP file");
        }
    } catch (error) {
        console.error("Error generating ZIP file:", error);
    }
  };

  return (
    <div>
      <DefaultLayout>
        <PageLinks pageName="Client's Flows" link1="Client" link2="Links" />
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
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:ml-auto flex justify-end">
                  <Link to="/client/flow-creation">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-2.5 text-center"
                    >
                      Add New Flow
                    </button>
                  </Link>
                </div>
              </div>
              <table className="w-full table-auto rounded-lg mt-7">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4 rounded-lg">
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      <div className='flex items-center gap-3 px-2.5 xl:px-5'>
                        Name
                      </div>
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Reference
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      White Page
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Offer Page
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Management
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center gap-3 px-2.5 xl:px-5">
                          <p className="text-black dark:text-white sm:block">
                            {item.flowName}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.reference}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.whitePage}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.offerPage}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${item.selectedStatus === 'active'
                            ? 'bg-success text-success'
                            : 'bg-warning text-warning'

                            }`}
                        >
                          {item.selectedStatus}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <FiDownload
                            size={20}
                            className="cursor-pointer block text-gray-400"
                            onClick={() => generateZip(item.reference)}
                          />
                          <div>
                            <MdOutlineEdit
                              size={20}
                              className="cursor-pointer block text-gray-400"
                              onClick={() => handleEditClick(item.reference)} 
                            />
                          </div>
                          <div>
                            <AiOutlineDelete
                              size={20}
                              className="cursor-pointer block text-gray-400"
                              onClick={() => toggleDeleteModal(indexOfFirstItem + key)}
                            />
                          </div>
                          <div>
                            <MdOutlinePauseCircle
                              size={20}
                              className="cursor-pointer block text-gray-400"
                              onClick={() => togglePauseModal(indexOfFirstItem + key)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="flex items-center">
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-stroke text-black shadow-sm"
                  onClick={prevPage}
                >
                  <TbChevronLeft className="w-6 h-6" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-stroke text-black shadow-sm">
                  {currentPage}
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-stroke text-black shadow-sm"
                  onClick={nextPage}
                >
                  <TbChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div>
                <p className="text-black dark:text-white">
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{Math.ceil(filteredData.length / perPage)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete Flow</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this flow?</p>
            <div className="flex justify-end">
              <button className="text-red-500 font-semibold mr-2" onClick={() => toggleDeleteModal(null)}>Cancel</button>
              <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded" onClick={() => handleDelete(indexToDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showPauseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Change Flow Status</h2>
            <div className='text-center'>
              <p className="text-gray-600 mb-4">Are you sure you want to change the status of this flow?</p>
            </div>
            <div className="flex justify-end">
              <button className="text-red-500 font-semibold mr-2" onClick={() => togglePauseModal(null)}>Cancel</button>
              <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded" onClick={() => handlePause(indexToPause)}>Change status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientGenerateLink;
