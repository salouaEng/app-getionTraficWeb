import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const LatestFlows = () => {
  const [userId, setUserId] = useState('');
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserIdAndFlows = async () => {
      const token = localStorage.getItem('recoveryToken');
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const userInfoResponse = await axios.get('http://localhost:5000/user/user-id-and-email', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (userInfoResponse.status !== 200) {
          throw new Error('Error fetching user info');
        }

        const { userId } = userInfoResponse.data;
        setUserId(userId);

        const flowsResponse = await axios.get('http://localhost:5000/flow/getFlowsByUser', { params: { id: userId } });

        if (!flowsResponse.data) {
          throw new Error('Error fetching flows');
        }

        const fetchedFlows = flowsResponse.data.flows;
        setFlows(fetchedFlows);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        toastr.error('Error fetching data');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserIdAndFlows();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-5 px-2 text-xl font-semibold text-black dark:text-white">
        Latest Flows
      </h4>

      <div>
        {flows.map((flow, index) => (
          <div key={index} className="flex items-center gap-4 py-4 px-2 hover:bg-gray-3 dark:hover:bg-meta-4">
            <div>
              <h5 className="font-medium text-black dark:text-white">{flow.flowName}</h5>
            </div>
            <div>
              <p>
                <span className="text-sm text-black dark:text-white">White Page: {flow.whitePage}</span>
              </p>
            </div>
            <div>
              <p>
                <span className="text-sm text-black dark:text-white">Offer Page: {flow.offerPage}</span>
              </p>
            </div>
            <div>
              <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                flow.selectedStatus === 'active' ? 'bg-success text-success' : 'bg-warning text-warning'
              }`}>
                {flow.selectedStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestFlows;
