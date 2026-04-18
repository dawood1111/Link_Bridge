import React from "react";
import {FaSearch} from 'react-icons/fa';
 export function SearchBar({value,onClick,onChange}) {
    return(
    
       <div className="flex justify-center items-center flex-col   ">
            <div className="  flex flex-row justify-center  items-center  ">
                 <input className=" shadow-sm bg-gray-100  w-90  h-13 rounded-xl pl-3  text-[13px] font-medium text-gray-700 uppercase tracking-wider mb-2" type="text"  placeholder="Enter Company Name..."
            value={value}
            onChange={(e)=>onChange(e.target.value)}
        
            />
            <button onClick={onClick} className=" absolute left-83 top-7  w-11 h-11 rounded-3xl bg-[#0c2b78] text-white  flex justify-center items-center cursor-pointer "><FaSearch name="search"/></button>
             </div>
    
     </div>
    )
}
