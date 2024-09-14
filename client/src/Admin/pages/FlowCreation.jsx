import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import PageLink from '../components/PageLinks/PageLink';
import Button from '../components/FlowCreation/Button';
import Multistepper from '../components/FlowCreation/Multistepper.jsx';
import FiltrationForm from '../components/FlowCreation/FiltrationForm.jsx';
import LinkForm from '../components/FlowCreation/LinkForm.jsx';
import StatusForm from '../components/FlowCreation/StatusForm.jsx';
import GenerateReference from '../components/GenerateReference.jsx';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const FlowCreation = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        flowName: "",
        whitePage: "",
        offerPage: "",
        selection: "",
        whiteList: '',
    });
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [selectedBrowsers, setSelectedBrowsers] = useState([]);
    const [selectedOperatingSystems, setSelectedOperatingSystems] = useState([]);
    const [proxytraffic, setProxyTraffic] = useState(false);
    const [ipv6traffic, setIpv6Traffic] = useState(false);
    const [trafficWithoutIsp, setTrafficWithoutIsp] = useState(false);
    const [trafficWithoutReferer, setTrafficWithoutReferer] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [referenceCode, setReferenceCode] = useState('');
    const [confirmClicked, setConfirmClicked] = useState(false);
    const [stepsCompleted, setStepsCompleted] = useState({
        1: false,
        2: false,
        3: false,
    });
    const [buttonText, setButtonText] = useState('Next Step');

    useEffect(() => {
        if (confirmClicked && step === 3) {
            generateZip();
        }
    }, [confirmClicked, step]);

    const updateStepsCompleted = (stepNumber, isCompleted) => {
        setStepsCompleted((prevStepsCompleted) => ({
            ...prevStepsCompleted,
            [stepNumber]: isCompleted,
        }));
    };

    const handleFormDataChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const nextStep = () => {
        selected();
        setStep((prevStep) => prevStep + 1);
    };

    const goBack = () => {
        if (step === 1) return;
        setStep((step) => step - 1);
    };

    const isFormValid = () => {
        return formData.flowName && formData.whitePage && formData.offerPage && formData.selection;
    };

    const selected = () => {
        console.log("link form :", formData);
        console.log("Selected countries:", selectedCountries);
        console.log("Selected Browsers:", selectedBrowsers);
        console.log("Selected Devices:", selectedDevices);
        console.log("Selected OperatingSystems:", selectedOperatingSystems);
        console.log("trafficWithoutIsp :", trafficWithoutIsp);
        console.log("proxytraffic :", proxytraffic);
        console.log("ipv6traffic :", ipv6traffic);
        console.log("trafficWithoutReferer :", trafficWithoutReferer);
        console.log("selectedStatus :", selectedStatus);
        console.log("Generated reference code:", referenceCode);
    };

    const generateZip = async () => {
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

    const handleConfirm = async () => {
        try {
            if (!isFormValid()) {
                toastr.error('Please fill out all required fields.', 'Error');
                return;
            }
    
            const dataToSend = {
                reference: referenceCode,
                flowName: formData.flowName,
                whitePage: formData.whitePage,
                offerPage: formData.offerPage,
                selectedCountries: selectedCountries.join(','), // Converting array to comma-separated string
                selectedDevices: selectedDevices.join(','), // Converting array to comma-separated string
                selectedBrowsers: selectedBrowsers.join(','), // Converting array to comma-separated string
                selectedUserAgent: selectedOperatingSystems.join(','), // Converting array to comma-separated string
                proxytraffic: proxytraffic, // Converting boolean to 1 or 0
                ipv6traffic: ipv6traffic , // Converting boolean to 1 or 0
                trafficWithoutIsp: trafficWithoutIsp, // Converting boolean to 1 or 0
                trafficWithoutReferer: trafficWithoutReferer, // Converting boolean to 1 or 0
                selectedStatus: selectedStatus,
            };
    
            const response = await axios.post(
                "http://localhost:5000/flow/createFlow",
                {
                    email: "salouaouissa2002@gmail.com",
                    data: dataToSend
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            if (response.status === 201) {
                toastr.success(response.data.message, 'Success');
            } else {
                toastr.error(response.data.message || 'Failed to create flow.', 'Error');
            }
        } catch (error) {
            console.error("Error creating flow:", error);
            toastr.error('An error occurred while creating the flow.', 'Error');
        }
    };
    

    return (
        <div className="App">
            <DefaultLayout>
                <PageLink pageName="Flow editing" />
                <main className="overflow-hidden rounded-lg border border-gray-300 shadow-3 dark:border-strokedark flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:max lg:flex-row grow lg:p-4 lg:rounded-lg bg-white dark:bg-gray-700 lg:shadow">
                    <Multistepper
                        currentStep={step}
                        handleNextStep={setStep}
                        stepsCompleted={stepsCompleted}
                    />
                    <div className="px-4 relative lg:flex lg:flex-col lg:w-full ">
                        <form className=" px-6 py-8 rounded-lg flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
                            {step === 1 && (
                                <LinkForm
                                    handleNext={() => {
                                        handleFormSubmit(1);
                                        setStep(2);
                                    }}
                                    formData={formData}
                                    setFormData={handleFormDataChange}
                                />
                            )}
                            {step === 2 && (
                                <FiltrationForm
                                    handleNext={() => {
                                        handleFormSubmit(2);
                                        setStep(3);
                                    }}
                                    selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}
                                    selectedDevices={selectedDevices} setSelectedDevices={setSelectedDevices}
                                    selectedBrowsers={selectedBrowsers} setSelectedBrowsers={setSelectedBrowsers}
                                    selectedOperatingSystems={selectedOperatingSystems} setSelectedOperatingSystems={setSelectedOperatingSystems}
                                    proxytraffic={proxytraffic} setProxyTraffic={setProxyTraffic}
                                    ipv6traffic={ipv6traffic} setIpv6Traffic={setIpv6Traffic}
                                    trafficWithoutIsp={trafficWithoutIsp} setTrafficWithoutIsp={setTrafficWithoutIsp}
                                    trafficWithoutReferer={trafficWithoutReferer} setTrafficWithoutReferer={setTrafficWithoutReferer}
                                />
                            )}
                            {step === 3 && (
                                <StatusForm
                                    handleNext={() => {
                                        handleFormSubmit(3);
                                        setStep(4);
                                    }}
                                    selectedStatus={selectedStatus}
                                    setSelectedStatus={setSelectedStatus}
                                />
                            )}
                        </form>
                        {step === 2 && (
                            <GenerateReference onGenerate={setReferenceCode} />
                        )}
                        {step < 4 && (
                            <menu className="flex justify-between p-4">
                                {step > 1 && (
                                    <li>
                                        <Button
                                            type="ghost"
                                            onClick={goBack}
                                            className="border border-1 border-gray-600 "
                                        >
                                            Go Back
                                        </Button>
                                    </li>
                                )}
                                <li>
                                    <Button
                                        onClick={step !== 3 ? nextStep : handleConfirm}
                                        type={step !== 4 ? 'primary' : 'blue'}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                                        disabled={step === 1 && !isFormValid()}
                                    >
                                        {step !== 3 ? "Next Step" : "Confirm"}
                                    </Button>
                                </li>
                            </menu>
                        )}
                    </div>
                </main>
            </DefaultLayout>
        </div>
    );
}

export default FlowCreation;
