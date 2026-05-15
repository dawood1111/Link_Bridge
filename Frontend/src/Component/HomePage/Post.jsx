import React from "react";
import { FaPlus } from "react-icons/fa";
import { OpenModal } from "../../Redux/Slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostForm } from "./PostForm";

export function Post() {
  const Dispatch = useDispatch();

  return (
    <div className=" ">
      <div className="post bg-white w-130 h-17 flex justify-center items-center shadow-sm rounded-full relative">
        <div className="text-gray-700 font-bold text-[14px]">
          Create a new post
        </div>
        <button
          className=" absolute right-3 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer text-white bg-[#0c2b78]"
          onClick={() => Dispatch(OpenModal("CreatePost"))}
        >
          {" "}
          <FaPlus />{" "}
        </button>
      </div>
    </div>
  );
}
export default Post;
