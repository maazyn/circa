import { useState, useEffect, useRef } from 'react';
import { useMode } from "../../context/ModeContext";
import './SearchCard.css';
import { IoSearchSharp } from "react-icons/io5";
// import { IoMdRefresh } from "react-icons/io";
// import { TiDelete } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";


function SearchCard({ localLocations, globalLocations }) {
    const [errors, setErrors] = useState({});
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [formData, setFormData] = useState({ title: "" }, {sort: ""});
    const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
    const sortOptions = ["None", "A - Z (Asc)", "Z - A (Desc)", "Date (Asc)", "Date (Desc)"];
    const [selectedSortType, setSelectedSortType] = useState();
    const sortDropdownRef = useRef(null);
    const { mode } = useMode();

    const locationsToUse = mode === 'Local' ? localLocations : globalLocations;
    
    // const [sortedLocations, setSortedLocations] = useState(locationsToUse);

    // useEffect(() => {
    //     setLocations(locationsToUse);
    // }, [locationsToUse]);


    const fetchAddressSuggestions = async () => {
        const { title } = formData;
        if (title) {
            const encodedInput = encodeURIComponent(title);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedInput}&format=json&addressdetails=1`);
                const data = await response.json();
                setAddressSuggestions(data);
                setDropdownVisible(true);
            } catch (error) {
                console.error("Error fetching address suggestions:", error);
            }
        } else {
            setAddressSuggestions([]);
            setDropdownVisible(false);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData({ title: value });
    };

    const handleAddressSelect = (suggestion) => {
        setFormData({ title: suggestion.display_name });
        setAddressSuggestions([]);
        setDropdownVisible(false);
    };

    const handleClear = () => {
        setFormData({ title: "" });
        setErrors({});
        setAddressSuggestions([]);
        setDropdownVisible(false);
    };

    const handleSortSelect = (sortType) => {
        setSelectedSortType(sortType);
        setSortDropdownVisible(false);

        let sorted = [...locationsToUse];

        if (sortType === "A - Z (Asc)") {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === "Z - A (Desc)") {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortType === "Date (Asc)") {
            sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sortType === "Date (Desc)") {
            sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        setLocations(sorted);
    };

    // const handleSortSelect = (sortType) => {
    //     setSelectedSortType(sortType);
    //     setSortDropdownVisible(false);
    //     let sorted = [...sortedLocations];

    //     if (sortType === "A - Z (Asc)") {
    //         sorted = [...sortedLocations].sort((a, b) => a.title.localeCompare(b.title));
    //     } else if (sortType === "Z - A (Desc)") {
    //         sorted = [...sortedLocations].sort((a, b) => b.title.localeCompare(a.title));
    //     } else if (sortType === "Date (Asc)") {
    //         sorted = [...sortedLocations].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    //     } else if (sortType === "Date (Desc)") {
    //         sorted = [...sortedLocations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    //     } else if (sortType === "None"){
    //         sorted = locationsToUse;
    //     }
    //     setSortedLocations(sorted);
    //     setLocations(sorted);
    // };




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setSortDropdownVisible(false);
            }
        };

        if (isDropdownVisible || sortDropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownVisible, sortDropdownVisible]);

    useEffect(() => {
    }, [selectedSortType]);

    return (
        <div className="p-2 w-full">
            {errors.server && <p className="text-red-500">{errors.server}</p>}
            <div className="relative flex flex-row gap-2 h-[38px] items-center w-full ">
                <input
                    className=" p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 m-auto w-full text-gray-500"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Search an address"
                />
                {isDropdownVisible && addressSuggestions.length > 0 && (
                    <ul ref={dropdownRef} className="absolute top-full left-0 mt-1 w-full max-h-[150px] overflow-y-auto bg-white border rounded-md shadow-md z-10">
                        {addressSuggestions.map((suggestion, index) => (
                            <li key={index} className="p-2 hover:bg-gray-100 text-blue-300 cursor-pointer" onClick={() => handleAddressSelect(suggestion)}>
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-center items-center gap-1">
                    <button onClick={fetchAddressSuggestions} className="flex justify-center items-center transparent border rounded-md hover:bg-blue-500 text-blue-600 hover:text-white h-[36px] w-[34px] ">
                        <IoSearchSharp className="h-full w-full py-[8px]" />
                    </button>
                    <button onClick={handleClear} className="flex justify-center items-center rounded-md hover:bg-red-400  text-red-600 hover:text-white h-[36px] w-[34px] transparent border ">
                        <RxCross2 className="h-full w-full  py-[7px]"/>
                    </button>
                </div>
            </div>
            <div className="flex flex-row items-center p-2 mt-2 text-sm text-gray-600 rounded-md">
                Sort by:
                <div className = "relative">
                    <button
                        onClick={() => setSortDropdownVisible(!sortDropdownVisible)}
                        className="ml-2 border rounded p-1 w-[120px] text-gray-400"
                    >
                        {selectedSortType || "Select Sort"}
                    </button>
                    {sortDropdownVisible && (
                        <ul ref={sortDropdownRef} className="absolute top-full left-2 mt-1 w-[120px] bg-white border rounded-md shadow-md z-10 ">
                            {sortOptions.map((sortType) => (
                                <li
                                    key={sortType}
                                    // defaultValue={sortOptions[0]}
                                    className="p-2 hover:bg-gray-100 cursor-pointer text-blue-300"
                                    onClick={() => handleSortSelect(sortType)}
                                >
                                    {sortType}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
