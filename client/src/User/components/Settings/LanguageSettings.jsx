import React from 'react';

const LanguageSettings = () => {
    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Langauge settings
                </h3>
            </div>
            <div className="p-7 mb-4">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white ">Select language</label>
                <select id="settings-language" name="countries" className="bg-[#EFF4FB] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option>English (US)</option>
                    <option>Italiano</option>
                    <option>Français (France)</option>
                </select>
            </div>

        </div>
    )
}

export default LanguageSettings;