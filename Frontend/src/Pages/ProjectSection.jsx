import React, { use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchData } from "../Redux/Slices/QuotationRequestSlice";
import { formatDistanceToNow, set } from "date-fns";
import { GetData } from "../Redux/Slices/ProjectsSlice";

import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Button, Header, Segment } from "semantic-ui-react";
import { DeleteModal } from "../Component/deleteModal";
import {
  Icon,
  PlaceholderParagraph,
  PlaceholderLine,
  PlaceholderHeader,
  Placeholder,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import { NotificationData } from "../Redux/Slices/NotificationSlice";
import { OpenModal, CloseModal } from "../Redux/Slices/ModalSlice";
import ConfirmModal from "../Component/ConfirmModal";
import { DeleteQuotationRequest } from "../Redux/Slices/QuotationDeleteSlice";

export function ProjectSection() {
  const { ProjectsData, isloading } = useSelector(
    (state) => state.UserProjects,
  );
  const [OpenDelete, SetOpenDelete] = useState("");
  const [SelectedId, SetSelectedId] = useState("");
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
  };
  const HandleHandeShake = () => {
    dispatch(OpenModal("OpenHandShakeModal"));
  };

  return (
    <div className="grid grid-cols-1 gap-6  h-auto sm:grid sm:grid-cols-2 ">
      {ProjectsData.map((item, index) =>
        isloading == true ? (
          <Placeholder
            fluid
            className="p-4 rounded-lg  bg-white w-160 h-200 mt-2 flex flex-col  "
          >
            <PlaceholderHeader>
              <PlaceholderLine length="full" />
              <PlaceholderLine length="full" />
              <PlaceholderLine length="medium" />
              <PlaceholderLine length="very short" />
              <PlaceholderLine length="full" />
              <PlaceholderLine length="full" />
            </PlaceholderHeader>

            <div className="mt-10">{""}</div>
            <PlaceholderParagraph>
              <PlaceholderLine length="full" />
              <PlaceholderLine length="full" />
              <PlaceholderLine length="medium" />
              <PlaceholderLine length="very short" />
              <PlaceholderLine length="full" />
              <PlaceholderLine length="full" />
            </PlaceholderParagraph>
            <div className="mt-10">{""}</div>
            <PlaceholderHeader image>
              <PlaceholderLine />
              <PlaceholderLine />
            </PlaceholderHeader>
            <div className="mt-10">{""}</div>

            <PlaceholderHeader image>
              <PlaceholderLine />
              <PlaceholderLine />
            </PlaceholderHeader>
            <div className="mt-10">{""}</div>
            <PlaceholderHeader image>
              <PlaceholderLine />
              <PlaceholderLine />
            </PlaceholderHeader>
          </Placeholder>
        ) : (
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
                  {item.maxBudget}
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
            {item.quotationRequests.length == 0 ? (
              <Segment placeholder>
                <Header icon>
                  <Icon name="pdf file outline" />
                  No quotation request yet.
                </Header>
              </Segment>
            ) : (
              item.quotationRequests.map((q, index) => (
                <div
                  key={index}
                  className=" bg-gray-100  pl-3 pr-5 pt-2 pb-2   rounded-xl  flex flex-row items-center relative justify-between  bg-gray-50"
                >
                  <div className="flex flex-row items-center gap-4">
                    <img
                      className="  w-10 h-10  flex justify-center items-center rounded-xl ml-3 bg-white"
                      src={q.companyLogo}
                    />
                    <div className="flex justify-center flex-col">
                      <div className="font-bold text-[14px] text-black">
                        {q.companyName}
                      </div>
                      <div className="stat-title text-black">
                        {timeAgo(q.date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="bg-white  text-[#38ad4d]  w-11 h-11 rounded-full text-2xl cursor-pointer"
                        onClick={() => dispatch(OpenModal("HandleShakeModal"))}
                      >
                        <Icon name="handshake" />
                      </button>
                      <ConfirmModal
                        modalName={"HandleShakeModal"}
                        Title={"Accept Quotation"}
                        Message={"Are you sure you want to accept it"}
                        OnConfirm={() =>
                          dispatch(
                            NotificationData({
                              message: "accepted your quotation",
                              type: "HandShake",
                              receiverId: q.aboutCompany.userId,
                            }),
                          )
                        }
                      />

                      <button
                        className="bg-white  text-[#b42828]  w-11 h-11 rounded-full text-2xl"
                        onClick={() => {
                          dispatch(OpenModal("DeleteQuotationRequest"));
                          SetSelectedId(item.id);
                          SetOpenDelete(index);
                        }}
                      >
                        <Icon name="thumbs down" />
                      </button>
                    </div>

                    <button
                      onClick={() => HandleURL(q.pdFurl)}
                      className="group flex items-center gap-2 
                      bg-white text-[#0c2b78] text-[11px] font-semibold
                       px-4 py-2 rounded-xl border border-white/20
                       transition-all duration-250 cursor-pointer
                         hover:bg-linear-to-r from-slate-900 to-blue-900  hover:text-white hover:border-orange-400
                         hover:-translate-y-0.5 active:scale-95 shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5 transition-transform duration-250 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                      </svg>
                      View PDF
                    </button>

                    <div className=" ">
                      <div className="relative right-20 top-1  ">
                        {index === OpenDelete && (
                          <ConfirmModal
                            Title={"Delete Quotation Request"}
                            Message={"Are you sure you want to delete"}
                            modalName={"DeleteQuotationRequest"}
                            OnConfirm={() =>
                              dispatch(DeleteQuotationRequest(SelectedId)).then(
                                () => {
                                  dispatch(GetData());
                                },
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ),
      )}
    </div>
  );
}
export default ProjectSection;
