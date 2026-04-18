import React from "react";
import {FaPlus} from 'react-icons/fa';
export function Post(){
    return(
        <div className=" ">
        
        <div className="post bg-gray-200 w-130 h-17 flex justify-center items-center shadow-sm rounded-full relative">
                <div className="text-gray-700 font-bold text-[14px]">Create a new post</div>
         <div className=" absolute right-3 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer text-white bg-[#0c2b78]"> <FaPlus /> </div>
        </div>
        </div>

    )

}
export default Post;