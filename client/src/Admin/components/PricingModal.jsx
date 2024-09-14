import React, { useState } from 'react';

const PricingModal = ({ showModal, setShowModal, currentPrices, setPrices }) => {
    const [price1, setPrice1] = useState(currentPrices.price1);
    const [price2, setPrice2] = useState(currentPrices.price2);
    const [price3, setPrice3] = useState(currentPrices.price3);

    const closeModal = () => setShowModal(false);

    const handleSave = () => {
        setPrices({ price1, price2, price3 });
        closeModal();
    };

    if (!showModal) return null;

    return (
        <div className='bg-white dark:bg-slate-900 mx-80 my-30 dark:text-white z-999'>
            <section className="text-gray-500 body-font relative transition-all duration-200">
                <div className="container py-8 mx-auto">
                    <div className="lg:w-2/3 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label className="leading-7 text-sm text-gray-600 dark:text-gray-200 font-medium">
                                        Basic Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price1"
                                        name="price1"
                                        placeholder='Enter price for Basic plan'
                                        value={price1}
                                        onChange={(e) => setPrice1(Number(e.target.value))}
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label className="leading-7 text-sm text-gray-600 dark:text-gray-200 font-medium">
                                        Standard Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price2"
                                        name="price2"
                                        placeholder='Enter price for Standard plan'
                                        value={price2}
                                        onChange={(e) => setPrice2(Number(e.target.value))}
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label className="leading-7 text-sm text-gray-600 dark:text-gray-200 font-medium">
                                        Premium Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price3"
                                        name="price3"
                                        placeholder='Enter price for Premium plan'
                                        value={price3}
                                        onChange={(e) => setPrice3(Number(e.target.value))}
                                        className="w-full bg-[#EFF4FB] dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-400 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex w-full justify-center text-center mt-2">
                                <button type="submit"
                                    className="py-2.5 px-8 bg-white border border-stroke rounded-lg text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white dark:bg-gray-600 dark:border-0 mr-6"
                                    onClick={closeModal}>
                                    Cancel
                                </button>
                            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
        </div>
            </section >
        </div >
    );
};

export default PricingModal;
