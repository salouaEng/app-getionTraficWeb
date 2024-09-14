import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { COUNTRIES } from "../../utils/index";

const CountrySelector = ({
    id,
    open,
    disabled = false,
    onToggle,
    onChange,
    selectedCountries,
    setSelectedCountries,
}) => {
    const ref = useRef(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const mutableRef = ref.current;

        const handleClickOutside = (event) => {
            if (mutableRef && !mutableRef.contains(event.target) && open) {
                onToggle();
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, open, onToggle, selectedCountries]);

    const handleSelectAll = () => {
        setSelectedCountries(COUNTRIES.map((country) => country.value));
    };

    const handleDeselectAll = () => {
        setSelectedCountries([]);
    };

    const handleSelectCountry = (country) => {
        if (selectedCountries.includes(country.value)) {
            setSelectedCountries(selectedCountries.filter((id) => id !== country.value));
        } else {
            setSelectedCountries([...selectedCountries, country.value]);
        }
    };

    return (
        <div ref={ref}>
            <div className="mt-1 relative">
                <button
                    type="button"
                    className={`${disabled ? "bg-neutral-100 " : "bg-white"
                        } relative w-full cursor-pointer border border-gray-300 dark:bg-gray-600 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={onToggle}
                    disabled={disabled}
                >
                    <span className="truncate flex items-center">
                        {selectedCountries.length === 0 ? (
                            <span>Nothing Selected</span>
                        ) : selectedCountries.length === 1 ? (
                            <span>
                                <img
                                    alt={`${selectedCountries[0]}`}
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountries[0]}.svg`}
                                    className={"inline mr-2 h-4 rounded-sm"}
                                />
                                {selectedCountries[0]}
                            </span>
                        ) : (
                            <span>
                                <img
                                    alt={`${selectedCountries[0]}`}
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountries[0]}.svg`}
                                    className={"inline mr-2 h-4 rounded-sm"}
                                />
                                {selectedCountries[0]}
                                {" and " + (selectedCountries.length - 1) + " more"}
                            </span>
                        )}
                    </span>
                    <span
                        className={`cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${disabled ? "hidden" : ""
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
                                    placeholder="Search a country"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </li>
                            <hr />
                            <div className="flex justify-between items-center py-2 pl-3 pr-3 ">
                                <button
                                    type="button"
                                    className="text-sm text-white w-full bg-primary hover:bg-primary-dark px-3 py-2 mr-3 rounded-md"
                                    onClick={handleSelectAll}
                                >
                                    Select All
                                </button>
                                <button
                                    type="button"
                                    className="text-sm text-white w-full bg-primary hover:bg-primary-dark px-3 py-2 rounded-md"
                                    onClick={handleDeselectAll}
                                >
                                    Deselect All
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                "max-h-64 scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll"
                            }
                        >
                            {COUNTRIES.filter((country) =>
                                country.title.toLowerCase().startsWith(query.toLowerCase())
                            ).length === 0 ? (
                                <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                    No countries found
                                </li>
                            ) : (
                                COUNTRIES.filter((country) =>
                                    country.title.toLowerCase().startsWith(query.toLowerCase())
                                ).map((value, index) => {
                                    return (
                                        <li
                                            key={`${id}-${index}`}
                                            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-100 transition"
                                            id="listbox-option-0"
                                            role="option"
                                            onClick={() => {
                                                handleSelectCountry(value);
                                                onChange(value.value);
                                                setQuery("");
                                                onToggle();
                                            }}
                                        >
                                            <img
                                                alt={`${value.value}`}
                                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                                                className={"inline mr-2 h-4 rounded-sm"}
                                            />
                                            <span className="font-normal truncate">
                                                {value.title}
                                            </span>
                                            {selectedCountries.includes(value.value) ? (
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
                                    );
                                })
                            )}
                        </div>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CountrySelector;
