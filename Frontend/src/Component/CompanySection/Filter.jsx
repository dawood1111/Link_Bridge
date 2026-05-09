import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchData } from "../../Redux/Slices/GetCompanies";
import { Swiper, SwiperSlide } from "swiper/react";
//import { QuotationForm } from "../HomePage/QuotationForm";
import "swiper/css";
import "swiper/css/navigation";

export function FilterSys({ ViewProfileCompany, handleReset }) {
  const Dispatch = useDispatch();
  const [Show, SetShow] = useState(false);
  const [Item, SetItem] = useState("");

  const SelectData = useSelector((state) => state.AllCompanies.GetData ?? []);
  const {
    GetData: feed,
    isloading,
    rejected,
  } = useSelector((state) => state.feed);

  const HandleClick = (item) => {
    SetShow(true);
    SetItem(item);
  };

  return (
    <div className="flex flex-row  justify-center  mt-4 relative  gap-4">
      <div className="flex flex-row gap-3 justify-center items-center  h-12 w-auto  border-r-2 border-gray-100 pr-4  absolute  top-2  right-30 bg-white rounded-lg shadow p-4 z-[49]">
        <p className="text-[11px] font-medium text-gray-700 uppercase tracking-wider mb-2">
          Filter By Type
        </p>

        {SelectData.map((item, index) => (
          <button
            key={index}
            className="btn stat-title text-black w-50 active:text-white active:bg-red-500 h-8"
            onClick={() => {
              HandleClick(item);
            }}
          >
            {item.solutionType}
          </button>
        ))}
        <input
          className="btn btn-square rounded-4xl"
          type="reset"
          onClick={() => {
            (SetShow(false), SetItem(""), handleReset);
          }}
          value="×"
        />
      </div>

      {Show && Item && (
        <div className="flex flex-col justify-center items-center gap-5">
          {feed
            .filter((item) => item.solutionType == Item.solutionType)
            .map((item, ind) => (
              <div
                key={item.id || index}
                className="flex flex-row bg-white w-220 h-70 shadow-2xl relative"
              >
                <div className="w-100 h-auto">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    className="h-full"
                  >
                    {item.images?.map((img, imgIdx) => (
                      <SwiperSlide key={imgIdx}>
                        <img
                          src={`http://localhost:5194${img.image}`}
                          alt="Project"
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="flex flex-col border-l-5 border-[#304f9e] pl-3">
                  <div className="mt-5">
                    <div className="bg-amber-700 h-10 w-10 flex justify-center items-center rounded-sm text-white">
                      {item.user.userName?.[0] || "U"}
                    </div>
                    <div className="flex relative left-10 bottom-10 justify-between ml-4 w-30">
                      <p>{item.user.userName}</p>
                      <p className="text-neutral-400 text-xs mr-4 absolute top-6">
                        {timeAgo(item.postDate)}
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-6 mt-6">
                    <p className="text-[14x] bg-[#0c2b78] text-white px-3 py-1.5 rounded-sm">
                      {item.projectCategory}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold">{item.projectTitle}</h3>
                    <p className="stat-title text-[13px]">
                      {item.projectDescription}
                    </p>
                  </div>

                  <div className="mt-10">
                    <h5 className="stat-title text-[#0c2b78]">
                      {` $ ${item.minBudget} - ${item.maxBudget} `}
                    </h5>
                  </div>
                </div>

                {/* Added onClick to trigger your Popup function */}
                <div className="absolute right-3 bottom-3  w-60">
                  <button
                    onClick={() => PopupPost(item, index)}
                    className="border-t w-25 pt-2 stat-title text-[10px] text-[#0c2b78] cursor-pointer  "
                  >
                    {OpenViewDetails === index
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                  <button
                    className="border-t w-25 pt-2 stat-title text-[10px] text-[#0c2b78] cursor-pointer relative left-8"
                    onClick={() => DispatchData(OpenModal(item))}
                    key={index}
                  >
                    Quotation+
                  </button>
                </div>

                {/* Expanded Details Section */}
                {PopupOpen && Items && OpenViewDetails === index && (
                  <div className="absolute top-full left-0 w-full bg-white z-10 border-t p-4 shadow-xl">
                    <div className="flex flex-row justify-around h-18 items-center mb-4">
                      <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-6 py-1 rounded-sm shadow">
                        <label className="stat-title text-xs">Start Date</label>
                        <div className="text-gray-700 font-bold text-[12px]">
                          {new Date(item.startDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-6 py-1 rounded-sm shadow">
                        <label className="stat-title text-xs">Deadline</label>
                        <div className="text-gray-700 font-bold text-[12px]">
                          {new Date(item.endDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-6 py-1 rounded-sm shadow">
                        <label className="stat-title text-xs">Status</label>
                        <span className="text-[12px] font-bold">
                          {item.projectStatus === 0 && "Pending"}
                          {item.projectStatus === 1 && "In Progress"}
                          {item.projectStatus === 2 && "Completed"}
                          {item.projectStatus === 3 && "Cancelled"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row justify-around h-18 items-center mb-4">
                      <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-6 py-1 rounded-sm shadow">
                        <FaEnvelope className="text-red-700" />
                        <p className="text-[13px]">{item.user.email}</p>
                      </div>
                      <div className="fflex flex-col text-center justify-center items-center bg-gray-200 px-6 py-1 rounded-sm shadow">
                        <FaPhone className="text-green-700" />
                        <p className="text-[13px]">{item.user.phoneNumber}</p>
                      </div>
                      <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-6 py-1 rounded-sm shadow">
                        <FaLocationArrow className="text-yellow-500" />
                        <p className="text-[13px]">{item.projectLocation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <QuotationForm />
        </div>
      )}
    </div>
  );
}
export default FilterSys;
