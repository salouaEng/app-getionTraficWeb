import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const StatusSelector = ({ open, disabled = false, onToggle, onChange, selectedStatus, setSelectedStatus }) => {
    const ref = useRef(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const mutableRef = ref.current;

        const handleClickOutside = (event) => {
            if (mutableRef && !mutableRef.contains(event.target) && open) {
                onToggle();
                setQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, open, onToggle, selectedStatus]);

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        onChange(status);
        onToggle();
    };

    return (
        <div ref={ref}>
            <div className="mt-1 relative">
                <button
                    type="button"
                    className={`${disabled ? 'bg-neutral-100 ' : 'bg-white'
                    } relative w-full cursor-pointer border dark:bg-gray-600 dark:border-gray-700 border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={onToggle}
                    disabled={disabled}
                >
                    <span className="truncate flex items-center">
                        {selectedStatus ? (
                            <span>{selectedStatus}</span>
                        ) : (
                            <span>No Status Selected</span>
                        )}
                    </span>
                    <span
                        className={`cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${disabled ? 'hidden' : ''
                        }`}
                    >
                        <IoIosArrowDown className="cursor-pointer" />
                    </span>
                </button>
                {open && (
                    <ul
                        className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base sm:text-sm border border-gray-300"
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                    >
                        <div className=" top-0 z-10">
                            <li className=" cursor-default select-none relative py-2 px-3">
                                <input
                                    type="text"
                                    name="search"
                                    autoComplete="off"
                                    className="w-full sm:text-sm  rounded-md py-2 cursor-text border-gray-200 focus:border-white"
                                    placeholder="Search a status"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </li>
                            <hr />
                            <div className="max-h-64 scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
                                <li
                                    className={`text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-100 transition`}
                                    onClick={() => handleSelectStatus('Active')}
                                >
                                    <span className="font-normal truncate">active</span>
                                    {selectedStatus === 'active' ? (
                                        <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                                            <svg
                                                className="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    ) : null}
                                </li>
                                <li
                                    className={`text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-100 transition`}
                                    onClick={() => handleSelectStatus('paused')}
                                >
                                    <span className="font-normal truncate">paused</span>
                                    {selectedStatus === 'paused' ? (
                                        <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                                            <svg
                                                className="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    ) : null}
                                </li>
                            </div>
                        </div>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default StatusSelector;
