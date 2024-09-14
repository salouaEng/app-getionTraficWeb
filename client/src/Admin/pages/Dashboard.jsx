import React from 'react';
import CardDataStats from '../components/CardDataStats';
import BarChart from '../components/Charts/BarChart';
import CircularChart from '../components/Charts/CircularChart';
import LineChart from '../components/Charts/LineChart';
import DefaultLayout from '../layout/DefaultLayout';
import { HiOutlineUsers } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";
import HelloCard from '../components/HelloCard';
import LatestClients from '../components/LatestClients';

const Dashboard = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5 xl:grid-cols-4 2xl:gap-5">

        <div className="md:col-span-2 xl:col-span-2 2xl:col-span-2">
          <HelloCard className="" />
        </div>

        <div className="md:col-span-1 xl:col-span-1 2xl:col-span-1 ">
          <CardDataStats title="Total Profit" total="$1,2K" rate="4.35%" levelUp className="h-auto w-auto">
            <MdPayment className="text-2xl text-primary dark:text-white"/>
          </CardDataStats>
        </div>

        <div className="md:col-span-1 xl:col-span-1 2xl:col-span-1">
          <CardDataStats title="Total Clients" total="43" rate="0.95%" levelDown className="h-auto w-auto">
            <HiOutlineUsers className="text-2xl text-primary dark:text-white"/>
          </CardDataStats>
        </div>

      </div>

      <div className="mt-4 grid grid-cols-12 gap-3 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <LineChart />
        <BarChart />
        <CircularChart />
        <LatestClients />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;