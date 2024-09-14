import React, { useState } from "react";

import CountrySelector from "./CountrySelector";
import DeviceSelector from "./DeviceSelector";
import OperatingSysSelector from "./OperatingSysSelector";
import BrowserSelector from "./BrowserSelector";

const FiltrationForm = ({ 
  handleNext, 
  selectedCountries, setSelectedCountries, 
  selectedDevices, setSelectedDevices,
  selectedOperatingSystems, setSelectedOperatingSystems,
  selectedBrowsers, setSelectedBrowsers,
  proxytraffic, setProxyTraffic,
  ipv6traffic, setIpv6Traffic,
  trafficWithoutIsp, setTrafficWithoutIsp,
  trafficWithoutReferer, setTrafficWithoutReferer
}) => {

  const toggleProxyTraffic = () => setProxyTraffic(!proxytraffic);
  const toggleIpv6Traffic = () => setIpv6Traffic(!ipv6traffic);
  const toggleTrafficWithoutIsp = () => setTrafficWithoutIsp(!trafficWithoutIsp);
  const toggleTrafficWithoutReferer = () => setTrafficWithoutReferer(!trafficWithoutReferer);

  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [isOpenDevices, setIsOpenDevices] = useState(false);
  const [isOpenOperatingSys, setIsOpenOperatingSys] = useState(false);
  const [isOpenBrowser, setIsOpenBrowser] = useState(false);


  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div
          className={`autoSaverSwitch relative inline-flex cursor-pointer select-none items-center ${proxytraffic ? "isChecked" : ""
            }`}
          onClick={toggleProxyTraffic}
        >
          <input
            type="checkbox"
            name="vpn/proxytraffic"
            className="sr-only"
            checked={proxytraffic}
            onChange={() => { }}
          />
          <span
            className={`slider mr-3 flex h-6 w-12 items-center rounded-full p-1 duration-200 ${proxytraffic ? "bg-primary" : "bg-[#CCCCCE]"
              }`}
          >
            <span
              className={`dot h-4 w-4 rounded-full bg-white duration-200 ${proxytraffic ? "translate-x-6" : ""
                }`}
            ></span>
          </span>
        </div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Disable VPN / Proxy traffic
        </label>
      </div>
      <div className="flex items-center gap-4">
        <div
          className={`autoSaverSwitch relative inline-flex cursor-pointer select-none items-center ${ipv6traffic ? "isChecked" : ""
            }`}
          onClick={toggleIpv6Traffic}
        >
          <input
            type="checkbox"
            name="ipv6traffic"
            className="sr-only"
            checked={ipv6traffic}
            onChange={() => { }}
          />
          <span
            className={`slider mr-3 flex h-6 w-12 items-center rounded-full p-1 duration-200 ${ipv6traffic ? "bg-primary" : "bg-[#CCCCCE]"
              }`}
          >
            <span
              className={`dot h-4 w-4 rounded-full bg-white duration-200 ${ipv6traffic ? "translate-x-6" : ""
                }`}
            ></span>
          </span>
        </div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Disable IPv6 traffic
        </label>
      </div>
      <div className="flex items-center gap-4">
        <div
          className={`autoSaverSwitch relative inline-flex cursor-pointer select-none items-center ${trafficWithoutIsp ? "isChecked" : ""
            }`}
          onClick={toggleTrafficWithoutIsp}
        >
          <input
            type="checkbox"
            name="trafficwithoutisp"
            className="sr-only"
            checked={trafficWithoutIsp}
            onChange={() => { }}
          />
          <span
            className={`slider mr-3 flex h-6 w-12 items-center rounded-full p-1 duration-200 ${trafficWithoutIsp ? "bg-primary" : "bg-[#CCCCCE]"
              }`}
          >
            <span
              className={`dot h-4 w-4 rounded-full bg-white duration-200 ${trafficWithoutIsp ? "translate-x-6" : ""
                }`}
            ></span>
          </span>
        </div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Disable traffic without ISP
        </label>
      </div>
      <div className="flex items-center gap-4">
        <div
          className={`autoSaverSwitch relative inline-flex cursor-pointer select-none items-center ${trafficWithoutReferer ? "isChecked" : ""
            }`}
          onClick={toggleTrafficWithoutReferer}
        >
          <input
            type="checkbox"
            name="trafficwithoutreferer"
            className="sr-only"
            checked={trafficWithoutReferer}
            onChange={() => { }}
          />
          <span
            className={`mb-3 slider mr-3 flex h-6 w-12 items-center rounded-full p-1 duration-200 ${trafficWithoutReferer ? "bg-primary" : "bg-[#CCCCCE]"
              }`}
          >
            <span
              className={` dot h-4 w-4 rounded-full bg-white duration-200 ${trafficWithoutReferer ? "translate-x-6" : ""
                }`}
            ></span>
          </span>
        </div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Disable traffic without Referer
        </label>
      </div>

      <label
        className="-mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="countries"
      >
        Countries
      </label>
      <CountrySelector
        id={'countries'}
        open={isOpenCountry}
        onToggle={() => setIsOpenCountry(!isOpenCountry)}
        onChange={(val) => selectedCountries(val)}
        selectedCountries={selectedCountries} // Pass selectedCountries from parent
        setSelectedCountries={setSelectedCountries} // Callback function to update selectedCountries in parent
      />

      <label
        className="-mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="devices"
      >
        Devices
      </label>
      <DeviceSelector
        open={isOpenDevices}
        onToggle={() => setIsOpenDevices(!isOpenDevices)}
        onChange={(val) => setSelectedDevices(val)}
        selectedDevices = {selectedDevices}
        setSelectedDevices = {setSelectedDevices}
      />

      <label className="-mb-3 block text-sm font-medium text-black dark:text-white">
        Operating Systems
      </label>
      <OperatingSysSelector
        open={isOpenOperatingSys}
        onToggle={() => setIsOpenOperatingSys(!isOpenOperatingSys)}
        onChange={(val) => setSelectedOperatingSystems(val)}
        selectedOperatingSystems = {selectedOperatingSystems}
        setSelectedOperatingSystems={setSelectedOperatingSystems}
      />

      <label className="-mb-3 block text-sm font-medium text-black dark:text-white">
        Browsers
      </label>
      <BrowserSelector
        open={isOpenBrowser}
        onToggle={() => setIsOpenBrowser(!isOpenBrowser)}
        onChange={(val) => setSelectedBrowsers(val)}
        selectedBrowsers={selectedBrowsers}
        setSelectedBrowsers={setSelectedBrowsers}
      />

    </div>
  );
};

export default FiltrationForm;
