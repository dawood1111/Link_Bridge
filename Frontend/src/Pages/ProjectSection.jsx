import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useState , useEffect } from "react";
import { FetchData } from "../Redux/Slices/UserProjectSlice";
import {formatDistanceToNow} from 'date-fns';

export function ProjectSection() {
  const SelectData = useSelector(
    (state) => state.userProjectsSlice.UserProjectData,
  );
  const timeAgo=(date)=>{
         return formatDistanceToNow(new Date(date), { addSuffix: true });
      }
      const Dispatch = useDispatch();
        useEffect(()=>{
            Dispatch(FetchData());
        },[Dispatch])

  return (
    <div className="fkex flex-col justify-center items-center   h-auto ">
      {SelectData.map((item, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm w-160 flex flex-col gap-2 pl-20 pr-20 mt-10 pt-10">
            <div>
            <h2 className="text-2xl font-bold">{item.projectDescription}</h2>
            </div>

<div  className="flex flex-row  items-center  stat-title text-[12px]  ">
            <div className="  ">
              
              Posted  {timeAgo(item.postDate)} ·
              
            </div>

            <div className=" ml-1  ">
              
             
                 {item.projectCategory} · 
              
            </div>

            <div className="ml-1  ">
              
           
                {item.projectTitle}
             
            </div>
          </div>


           
          <div
            className="flex flex-row justify-around  h-16 items-center  "
         
          >
            <div className="  flex flex-col text-center justify-center items-center  bg-gray-200 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow ">
              <label htmlFor="start-date" className="stat-title">
                Budget
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px]">
                ${item.minBudget} - ${item.maxBudget} 
              </div>
            </div>

            <div className="  flex flex-col text-center justify-center items-center  bg-gray-200 pr-6 pl-6 pt-1 pb-1 rounded-sm shadow ">
              <label htmlFor="end-date" className="stat-title">
                Deadline
              </label>
              <div className="stat-title text-gray-700 font-bold text-[12px]">
                {new Date(item.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>


           
        </div>
      ))}
    </div>
  );
}
export default ProjectSection;
