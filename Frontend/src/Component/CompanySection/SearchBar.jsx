import React from "react";
import { FaSearch } from "react-icons/fa";
export function SearchBar({ value, onClick, onChange }) {
  return (
    <div className="flex justify-center items-center flex-col   ">
      <div className="  flex flex-row justify-center  items-center  ">
        <input
          className=" shadow-sm bg-gray-100  w-100  h-14 rounded-full pl-5  text-[12px] font-medium text-gray-700 uppercase tracking-wider mb-2 placeholder:text-[12px] "
          type="text"
          placeholder="Enter Company Name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          onClick={onClick}
          className="absolute right-3   z-10  w-12 h-12 rounded-full bg-[#0c2b78] text-white  flex justify-center items-center cursor-pointer "
        >
          <FaSearch name="search" />
        </button>
      </div>
    </div>
  );
}
