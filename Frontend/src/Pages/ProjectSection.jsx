import React, { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchData } from "../Redux/Slices/QuotationRequestSlice";
import { formatDistanceToNow } from "date-fns";
import { GetData } from "../Redux/Slices/ProjectsSlice";
import { Placeholder, PlaceholderLine } from "semantic-ui-react";
export function ProjectSection() {
  const { ProjectsData, isloading } = useSelector(
    (state) => state.UserProjects,
  );
  const dispatch = useDispatch();
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  useEffect(() => {
    dispatch(GetData());
  }, []);
  const HandleURL = (url) => {
    window.open(url);
    console.log(url);
  };

  return (
    <div className="flex flex-col justify-center items-center   h-auto ">
      {ProjectsData.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 p-4 rounded-lg shadow-xl w-180 flex flex-col gap-2 pl-20 pr-20 mt-10 pt-10"
        >
          <div>
            <h2 className="text-3xl font-bold">{item.projectTitle}</h2>
          </div>

          <div className="flex flex-row  items-center  stat-title text-[12px]  ">
            <div className="ml-1 ">
              {item.projectLocation} , {item.projectCategory} , Posted ·{" "}
              {timeAgo(item.postDate)}
            </div>
          </div>

          <div className="block stat-title text-[16px] font-bold text-black">
            {item.projectDescription}
          </div>

          <div className="flex flex-row justify-around  h-16 items-center  ">
            <div className="  flex flex-col text-center justify-end items-center  bg-gray-200 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow w-42">
              <label htmlFor="start-date" className="stat-title">
                Min Budget
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px] flex justify-end">
                {item.minBudget} USD
              </div>
            </div>
            <div className="  flex flex-col text-center justify-center items-center  bg-gray-200 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow  w-42">
              <label htmlFor="start-date" className="stat-title">
                Max Budget
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px] ">
                {item.minBudget} USD
              </div>
            </div>

            <div className="  flex  flex-col text-center justify-center items-center  bg-gray-200 pr-6 pl-6 pt-1 pb-1 rounded-sm shadow w-42 ">
              <label htmlFor="end-date" className="stat-title">
                Deadline
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px] ">
                {new Date(item.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <p className="stat-title text-gray-700 font-bold text-[12px]">
            Quotation Requests
          </p>
          {item.quotationRequests.map((q, index) => (
            <div
              key={index}
              className=" bg-gray-150 w-full  h-14 shadow-sm rounded-sm  flex flex-row relative"
            >
              <img
                className="  w-8 h-8 mt-2 flex justify-center items-center rounded-full ml-3 "
                src={q.companyLogo}
              />

              <div className="ml-6">
                <div className="font-bold">{q.companyName}</div>
                <div className="stat-title">{timeAgo(q.date)}</div>
              </div>
              <button
                className="absolute right-4 top-3 bg-gray-200 pl-3 pr-3 pt-1.5 pb-1.5 rounded-sm text-[12px] text-[#0c2b78] font-bold shadow-sm cursor-pointer "
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
