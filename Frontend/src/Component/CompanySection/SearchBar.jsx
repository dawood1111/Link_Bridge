import React from "react";
import { FaSearch } from "react-icons/fa";
export function SearchBar({ value, onClick, onChange }) {
  return (
    <div className="flex justify-center items-center flex-col   ">
      <div className="  flex flex-row justify-center  items-center  ">
        <input
          className=" shadow-sm bg-gray-100  sm:w-100 w-70 h-12  rounded-full pl-5  text-[12px] font-medium text-gray-700 uppercase tracking-wider mb-2 placeholder:text-[11px] placeholder:text-gray-500 "
          type="text"
          placeholder="Enter Company Name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          onClick={onClick}
          className="sm:absolute sm:right-0  absolute right-0  z-10  sm:w-13.5 sm:h-13.5 h-12 w-12  rounded-full bg-linear-to-r from-slate-900 to-blue-900 text-white  flex justify-center items-center cursor-pointer "
        >
          <FaSearch name="search" />
        </button>
      </div>
    </div>
  );
}
