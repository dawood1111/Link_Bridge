import React, { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchData } from "../Redux/Slices/QuotationRequestSlice";
import { formatDistanceToNow, set } from "date-fns";
import { GetData } from "../Redux/Slices/ProjectsSlice";
import { Icon, Placeholder, PlaceholderLine } from "semantic-ui-react";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
export function ProjectSection() {
  const { ProjectsData, isloading } = useSelector(
    (state) => state.UserProjects,
  );
  const dispatch = useDispatch();
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const [RequestNum, SetRequestNum] = useState(0);
  useEffect(() => {
    dispatch(GetData());
  }, []);
  const HandleURL = (url) => {
    window.open(url);
    console.log(url);
  };

  return (
    <div className="gird grid-cols-2 items-end   h-auto ">
      {ProjectsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-lg shadow-sm w-160  h-auto flex flex-col gap-4 pl-10 pr-10 mt-2 pt-6 overflow-scroll"
        >
          <div>
            <h2 className="text-3xl font-bold">{item.projectTitle}</h2>
          </div>

          <div className="flex flex-row gap-2  items-center  stat-title text-[12px]  ">
            <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-6 py-1 rounded-full gap-2   ">
              <FaLocationArrow className="text-yellow-500" />
              <p className="text-[10px] font-bold text-gray-700">
                {item.projectLocation}
              </p>
            </div>
            <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-6 py-1 rounded-full gap-2   ">
              <div>
                <Icon name="book" className="text-blue-300" />
              </div>

              <p className="text-[10px] font-bold text-gray-700">
                {item.projectCategory}
              </p>
            </div>
            <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-6 py-1 rounded-full gap-2   ">
              <div>
                <Icon name="time" className="text-black" />
              </div>

              <p className="text-[10px] font-bold text-gray-700">
                {timeAgo(item.postDate)}
              </p>
            </div>
          </div>

          <div className="block stat-title text-[14px] font-bold text-gay-500">
            {item.projectDescription}
          </div>

          <div className="flex flex-row justify-around   items-center  ">
            <div className="  flex flex-col text-center justify-end items-center  bg-gray-100 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow w-34">
              <label htmlFor="start-date" className="stat-title text-[10px]">
                Min Budget
              </label>
              <div className="stat-title text-gray-700 font-bold text-[10px] flex justify-end">
                {item.minBudget}
              </div>
            </div>
            <div className="  flex flex-col text-center justify-center items-center  bg-gray-100 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow  w-34 text-[10px]">
              <label htmlFor="start-date" className="stat-title text-[10px]">
                Max Budget
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px] ">
                {item.minBudget}
              </div>
            </div>

            <div className="  flex  flex-col text-center justify-center items-center  bg-gray-100 pr-6 pl-6 pt-1 pb-1 rounded-sm shadow w-34 ">
              <label htmlFor="end-date" className="stat-title">
                Deadline
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px] ">
                {new Date(item.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <p className="stat-title text-gray-700 font-bold text-[12px]">
            Quotation Requests({item.quotationRequests.length})
          </p>
          {item.quotationRequests.map((q, index) => (
            <div
              key={index}
              className=" bg-gray-100  pl-3 pr-5 pt-2 pb-2   rounded-sm  flex flex-row items-center relative justify-between  bg-linear-to-r from-slate-900 to-blue-900 "
            >
              <div className="flex flex-row items-center gap-4">
                <img
                  className="  w-10 h-10  flex justify-center items-center rounded-full ml-3 bg-white"
                  src={q.companyLogo}
                />
                <div className="flex justify-center flex-col">
                  <div className="font-bold text-[14px] text-white">
                    {q.companyName}
                  </div>
                  <div className="stat-title text-white">{timeAgo(q.date)}</div>
                </div>
              </div>
              <button
                className=" bg-white pl-3 pr-3 pt-2 pb-2 rounded-full  text-blue-950  shadow-sm cursor-pointert stat-title "
                onClick={() => HandleURL(q.pdFurl)}
              >
                View PDF
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default ProjectSection;
