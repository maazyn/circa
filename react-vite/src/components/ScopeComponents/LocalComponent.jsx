import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import MapCard from "../MapCard/MapCard";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function LocalComponent() {
  const [errors, setErrors] = useState({});
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({ title: "" }, {sort: ""});
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const sortOptions = ["None", "A - Z (Asc)", "Z - A (Desc)", "Date (Asc)", "Date (Desc)"];
  const [selectedSortType, setSelectedSortType] = useState("None");
  const sortDropdownRef = useRef(null);

  const user = useSelector((state) => state.session.user);
  const locations = useSelector((state) => state.locations);
  const filteredLocations = useMemo(() => {
    return user && locations
        ? Object.values(locations).filter(location =>
            location.user_id === user.id &&
            (!user.country || location.country === user.country)
        )
        : [];
}, [user, locations]);

  const [displayedLocations, setDisplayedLocations] = useState(filteredLocations);

  useEffect(() => {
    setDisplayedLocations(filteredLocations);
  }, [filteredLocations]);

  const defaultView = {
    center: [42.3601, -71.0589],
    zoom: 13  // B-town
  }



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

    let sorted = [...filteredLocations];

    if (sortType === "A - Z (Asc)") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "Z - A (Desc)") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === "Date (Asc)") {
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortType === "Date (Desc)") {
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      sorted = [...filteredLocations];
    }
    setDisplayedLocations(sorted);
};

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




  return (
    <div className="grid grid-cols-[2fr_4fr] w-full items-start gap-5 py-4 box-border h-[85vh] rounded-lg">
      <section className="flex flex-col w-full h-full bg-gray-100 shadow-md rounded-lg p-3 gap-3">
        <div className="bg-white rounded-lg h-[15vh] flex items-center justify-start p-3">
          {/* <SearchCard localLocations={filteredLocations}/> */}
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
            <div className="flex flex-row items-center p-1 mt-2 text-sm text-gray-600 rounded-md">
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


        </div>
        <div className="bg-white rounded-lg p-3 overflow-y-auto h-[60vh] flex-grow space-y-2">
          {displayedLocations?.map((location) => (
            <div key={location.id} className="bg-gray-50 rounded-md p-3 space-y-1">
              {location.title && location.title !== location.city && location.title !== location.country && (<p className="font-normal text-sm text-gray-500 ">{location.title}</p>)}
              {location.city && <p className="text-sm text-gray-500 ">{location.city}</p>}
              {location.region && <p className="text-xs text-gray-400">{location.region}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="w-full h-full z-10">
        <MapCard defaultView={defaultView} localLocations={displayedLocations}/>
      </section>
    </div>
  );
}

export default LocalComponent;
