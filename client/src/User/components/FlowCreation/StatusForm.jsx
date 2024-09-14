import React, { useState } from 'react';
import StatusSelector from './StatusSelector';

const StatusForm = ({selectedStatus, setSelectedStatus, formData, setFormData}) => {

    const [isOpenStatus, setIsOpenStatus] = useState(false);
    const [whiteList, setWhiteList] = useState('');

    const handleWhiteListChange = (e) => {
        const value = e.target.value;
        setWhiteList(value);
        setFormData({ ...formData, whiteList: value });
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="mt-1 relative gap-4">
                <label className=" block text-sm font-medium text-black dark:text-white">
                    Status
                </label>
                <StatusSelector
                    open={isOpenStatus}
                    onToggle={() => setIsOpenStatus(!isOpenStatus)}
                    onChange={(val) => setSelectedStatus(val)}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
            </div>
            <div className="mt-1 relative">
                <label className=" block text-sm font-medium text-black dark:text-white">
                    IP Black List
                </label>
                <textarea
                    className="mt-1 focus:ring-blue-500 ring-black  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-[#EFF4FB] py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="Enter IPs separated by commas"
                    rows={4}
                    value={whiteList}
                    onChange={handleWhiteListChange}
                />
            </div>
        </div>
    );
};

export default StatusForm;
