import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './SearchCard.css';
import { IoSearchSharp } from "react-icons/io5";
// import { IoMdRefresh } from "react-icons/io";
// import { TiDelete } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";


function SearchCard({ data }) {
    const [errors, setErrors] = useState({});
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [formData, setFormData] = useState({ title: "" });

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        if (isDropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownVisible]);

    return (
        <div className="p-2 w-full overflow-y-hidden">
            {errors.server && <p className="text-red-500">{errors.server}</p>}
            <div className="relative flex flex-row gap-2 h-[38px] items-center w-full ">
                <input
                    className=" p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 m-auto w-full"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Search an address"
                />
                {isDropdownVisible && addressSuggestions.length > 0 && (
                    <ul ref={dropdownRef} className="absolute w-full mt-1 max-h-[150px] overflow-y-auto bg-white border rounded-md shadow-md z-10">
                        {addressSuggestions.map((suggestion, index) => (
                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAddressSelect(suggestion)}>
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-center items-center gap-1">
                    <button onClick={fetchAddressSuggestions} className="flex justify-center items-center transparent border rounded-md hover:bg-blue-500 text-blue-600 hover:text-white h-[36px] w-[34px] ">
                        <IoSearchSharp className="h-full w-full py-[6px]" />
                    </button>
                    <button onClick={handleClear} className="flex justify-center items-center rounded-md hover:bg-red-400  text-red-600 hover:text-white h-[36px] w-[34px] transparent border ">
                        <RxCross2 className="h-full w-full  py-[5px]"/>
                    </button>
                </div>
            </div>
            <div className="p-2 mt-2 text-sm text-gray-600">
                {/* sort feature soon*/}
                Sort by:
            </div>
        </div>
    );
}

export default SearchCard;
