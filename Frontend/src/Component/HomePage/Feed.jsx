import { GetData as FetchFeed } from "../../Redux/Slices/FeedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { formatDistanceToNow } from "date-fns";
import { FaLocationArrow, FaPhone, FaEnvelope, FaTimes } from "react-icons/fa";
import { OpenModal } from "../../Redux/Slices/ModalSlice";
import QuotationForm from "./QuotationForm";
import {
  PlaceholderParagraph,
  PlaceholderLine,
  PlaceholderHeader,
  Placeholder,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { FilterSys } from "../HomePage/FilterSys";
import { Icon, Label } from "semantic-ui-react";

export function Feed({ data }) {
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const STATUS_MAP = {
    0: {
      text: "Pending",
      icon: "hourglass half",
      color: "text-amber-500",
      loading: false,
    },
    1: {
      text: "In Progress",
      icon: "spinner",
      color: "text-blue-500",
      loading: true,
    },
    2: {
      text: "Completed",
      icon: "check circle",
      color: "text-green-500",
      loading: false,
    },
    3: {
      text: "Cancelled",
      icon: "times circle",
      color: "text-red-500",
      loading: false,
    },
  };

  const [PopupOpen, SetPopupopen] = useState(false);
  const [Items, SetItems] = useState({});
  const [OpenViewDetails, setOpenViewDetails] = useState("");
  const [OpenImage, SetOpenImage] = useState("");
  const [preview, setPreview] = useState(false);
  const Navigate = useNavigate();

  const DispatchData = useDispatch();
  const { isloading, rejected } = useSelector((state) => state.feed);

  function PopupPost(item, opendetails) {
    if (OpenViewDetails === opendetails) {
      SetPopupopen(false);
      SetItems("");
      setOpenViewDetails("");
    } else {
      SetPopupopen(true);
      SetItems(item);
      setOpenViewDetails(opendetails);
    }
  }
  const HandleImages = (img) => {
    setPreview(true);
    SetOpenImage(img);
  };

  useEffect(() => {
    DispatchData(FetchFeed());
  }, [DispatchData]);

  if (rejected) {
    return (
      <Message negative>
        <MessageHeader>Connection Error</MessageHeader>
        <p>Failed to load the feed.</p>
      </Message>
    );
  }

  return (
    <div className="mt-10 ">
      <div className="flex flex-col justify-center items-center gap-6  ">
        {data.map((item, index) => (
          <div className="flex flex-col gap-2 w-full  ">
            <div
              key={item.id || index}
              className="flex flex-col w-110 bg-white h-auto shadow-sm  rounded-xl  sm:flex-row  sm:w-full "
            >
              <div className="w-full  h-auto shrink-0 sm:w-110      ">
                {isloading == true ? (
                  <Placeholder fluid>
                    <PlaceholderParagraph>
                      <PlaceholderLine />
                      <PlaceholderLine />
                    </PlaceholderParagraph>
                  </Placeholder>
                ) : (
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    className="h-92 w-110 sm:w-full overflow-hidden sm:rounded-tl-xl"
                  >
                    {item.images?.map((img, imgIdx) => (
                      <SwiperSlide key={imgIdx}>
                        <img
                          src={`http://localhost:5194${img.image}`}
                          alt="Project"
                          className="w-full sm:w-120 h-full object-cover sm:rounded-tl-2xl sm:rounded-bl-xl sm:h-full overflow-hidden cursor-pointer rounded-tr-xl rounded-tl-xl"
                          onClick={() => HandleImages(img.image)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <div className="flex flex-col gap-16 border-l-5 border-[#0b006f] pl-3 flex-1">
                {isloading == true ? (
                  <Placeholder className="w-120 h-20   ">
                    <PlaceholderHeader image>
                      <PlaceholderLine length="medium" />
                      <PlaceholderLine length="full" />
                      <PlaceholderLine length="medium" />
                      <PlaceholderLine length="full" />
                      <PlaceholderLine length="medium" />
                      <PlaceholderLine length="full" />
                    </PlaceholderHeader>
                    <PlaceholderParagraph>
                      <PlaceholderLine length="full" />
                      <PlaceholderLine length="medium" />
                    </PlaceholderParagraph>
                  </Placeholder>
                ) : (
                  <div className=" w-full  sm:w-140 flex  justify-between items-start pr-6">
                    <div className="mt-5 flex  ">
                      <div className="bg-amber-700 h-11 w-11 flex justify-center items-center rounded-full text-white">
                        {item.user.userName?.[0] || "U"}
                      </div>
                      <div className="flex  ml-4 flex-col justify-center  ">
                        <div>
                          <p>{item.user.userName}</p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-xs  ">
                            {timeAgo(item.postDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className=" mt-6">
                      <p className=" bg-gray-100 text-[#0c2b78] w-30 rounded-xl stat-title text-[13px] flex justify-center pt-2 pb-2 font-bold shadow-sm border">
                        {item.projectCategory}
                      </p>
                    </div>
                  </div>
                )}

                <div className="sm:w-full w-90  ">
                  <div>
                    <h3 className="font-bold">{item.projectTitle}</h3>

                    <p className="stat-title  text-[10px] sm:text-[13px]   whitespace-normal">
                      {item.projectDescription}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-6 py-1 rounded-xl sm:gap-3 gap-1 ">
                      <label
                        className={`stat-title text-sm ${STATUS_MAP[item.projectStatus]?.color || "text-gray-500"}`}
                      >
                        <Icon
                          name={
                            STATUS_MAP[item.projectStatus]?.icon ||
                            "help circle"
                          }
                          loading={
                            STATUS_MAP[item.projectStatus]?.loading || false
                          }
                        />
                      </label>

                      <span className="sm:text-[12px] text-[10px]  font-bold text-gray-700">
                        {STATUS_MAP[item.projectStatus]?.text || "Unknown"}
                      </span>
                    </div>

                    <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-4 py-1 rounded-xl sm:gap-3 gap-1 ">
                      <FaPhone className="text-green-700" />
                      <p className="sm:text-[12px] text-[10px] font-bold text-gray-700">
                        {item.user.phoneNumber}
                      </p>
                    </div>

                    <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-6 py-1 rounded-xl sm:gap-3 gap-1 ">
                      <FaLocationArrow className="text-yellow-500" />
                      <p className="sm:text-[12px] text-[10px] font-bold text-gray-700">
                        {item.projectLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Added onClick to trigger your Popup function */}
                <div className="w-full sm:w-135 flex justify-between  items-center  mb-4 ">
                  {isloading == true ? (
                    <PlaceholderLine />
                  ) : (
                    <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-6 py-1 rounded-xl  gap-2  ">
                      <label htmlFor="">
                        {<Icon name="currency" className="text-green-800" />}
                      </label>
                      <p className="text-[13px] font-bold text-gray-700">
                        {`${item.minBudget} - ${item.maxBudget} `}
                      </p>
                    </div>
                  )}
                  <div className=" flex gap-4 ">
                    <button
                      onClick={() => PopupPost(item, index)}
                      className=" w-35 pt-2 pb-2 rounded-sm shadow-md   text-[#0c2b78] cursor-pointer  flex justify-center items-center gap-2  bg-gray-100  "
                    >
                      {OpenViewDetails === index ? (
                        <>
                          Hide Details {""}
                          <Icon
                            name="arrow circle up"
                            className="text-[#0c2b78] "
                          />
                        </>
                      ) : (
                        <>
                          Show Details{" "}
                          <Icon
                            name="arrow circle down"
                            className="text-[#0c2b78] "
                          />
                        </>
                      )}
                    </button>
                    <button
                      className="w-35 pt-2 pb-2 rounded-sm shadow-md   cursor-pointer  flex justify-center items-center gap-2  bg-gray-100 text-[#0c2b78] "
                      onClick={() =>
                        Navigate("/QuotationPage", { state: { item } })
                      }
                      key={index}
                    >
                      Quotation <Icon name="plus circle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details Section */}
            {PopupOpen && Items && OpenViewDetails === index && (
              <div className="w-110 sm:w-full bg-white z-10 p-4 shadow-xl flex flex-col transition-all duration-300 sm:rounded-sm rounded-full ">
                <div className="flex flex-row justify-around h-8 items-center ">
                  <div className="flex flex-row text-center justify-center items-center bg-gray-100 px-4 py-1 rounded-xl sm:gap-3 gap-1">
                    <label className="text-orange-800">
                      <Icon name="calendar plus" />
                    </label>
                    <div className="text-gray-700 font-bold sm:text-[12px] text-[10px]">
                      {new Date(item.startDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-row  text-center justify-center items-center bg-gray-100 px-4  py-1 rounded-xl sm:gap-3 gap-1">
                    <label className="text-green-700">
                      <Icon name="calendar check" />
                    </label>
                    <div className="text-gray-700 font-bold sm:text-[12px] text-[10px]">
                      {new Date(item.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-row  justify-center items-center bg-gray-100 px-4 py-1 rounded-xl sm:gap-3 gap-1 ">
                    <FaEnvelope className="text-red-700" />
                    <p className="sm:text-[12px] text-[10px]">
                      {item.user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {preview == true && (
        <div className="w-200 h-120 fixed top-30 z-20 flex justify-center items-center ml-20 overflow-hidden cursor-grabbing  ">
          <button
            className="z-40 text-white text-3xl cursor-pointer bg-gray-200 absolute top-6 right-2 rounded-full w-6 h-6 flex justify-center items-center "
            onClick={() => setPreview(false)}
          >
            <FaTimes className="text-black" />
          </button>
          {
            <img
              src={`http://localhost:5194${OpenImage}`}
              alt=""
              className=" rounded-sm"
            />
          }
        </div>
      )}
    </div>
  );
}

export default Feed;
