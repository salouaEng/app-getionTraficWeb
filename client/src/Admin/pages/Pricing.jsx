import { useState, useRef } from 'react';

import PageLink from '../components/PageLinks/PageLink';
import DefaultLayout from '../layout/DefaultLayout';
import PricingCard from '../components/PricingCard';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PricingModal from '../components/PricingModal';

const Pricing = () => {

    const [showModal, setShowModal] = useState(false);
    const [prices, setPrices] = useState({ price1: 10, price2: 20, price3: 30 });

    const toggleModal = () => {
        setShowModal(true);
    };

    return (
        <div>
            <DefaultLayout>
                <PageLink pageName="Pricing" />
                <div className="flex flex-col gap-10 rounded-lg">
                    <div className="rounded-lg border border-stroke bg-white px-5 pt-5 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto rounded-lg">
                            <div className="">
                                <div className="items-center mb-3 md:mb-0">
                                    <Container
                                        id="pricing"
                                        sx={{
                                            pt: { xs: 2, sm: 2 },
                                            pb: { xs: 4, sm: 4 },
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: { xs: 2, sm: 6 },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: { sm: '100%', md: '100%' },
                                                textAlign: { sm: 'center', md: 'center' },
                                            }}
                                        >
                                            <div className="flex justify-between">
                                                <h1 className="flex justify-start text-3xl font-semibold lg:text-3xl"><span className="text-primary">Flexible </span> Plans</h1>
                                                <button
                                                    type="button"
                                                    className="flex justify-end text-white mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg py-2 px-5 text-center"
                                                    onClick={toggleModal}
                                                >

                                                    Edit Prcing
                                                </button>
                                            </div>
                                        </Box>
                                        <PricingCard prices={prices} />
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-999">
                    <PricingModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setPrices={setPrices}
                        currentPrices={prices}
                    />
                </div>
            )}
        </div>
    )
}

export default Pricing;