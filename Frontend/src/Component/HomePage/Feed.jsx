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

export function Feed({ data }) {
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const [PopupOpen, SetPopupopen] = useState(false);
  const [Items, SetItems] = useState({});
  const [OpenViewDetails, setOpenViewDetails] = useState("");
  const [OpenImage, SetOpenImage] = useState("");
  const [preview, setPreview] = useState(false);
  const Navigate = useNavigate();

  const DispatchData = useDispatch();
  const {
    // GetData: feed,
    isloading,
    rejected,
  } = useSelector((state) => state.feed);

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
    <div className="relative top-10 ">
      <div className="flex flex-col justify-center items-center gap-10">
        {/* MAP START */}
        {data.map((item, index) => (
          <div className="flex flex-col gap-2">
            <div
              key={item.id || index}
              className="flex flex-row bg-white w-230 h-auto shadow-xl relative rounded-2xl"
            >
              <div className="w-100 h-auto">
                {isloading == true ? (
                  <Placeholder fluid>
                    <PlaceholderParagraph>
                      <PlaceholderLine />
                      <PlaceholderLine />
                    </PlaceholderParagraph>
                  </Placeholder>
                ) : (
                  <Swiper slidesPerView={1} spaceBetween={10} className="h-80">
                    {item.images?.map((img, imgIdx) => (
                      <SwiperSlide key={imgIdx}>
                        <img
                          src={`http://localhost:5194${img.image}`}
                          alt="Project"
                          className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl "
                          onClick={() => HandleImages(img.image)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <div className="flex flex-col border-l-5 border-[#F97316] pl-3">
                {isloading == true ? (
                  <Placeholder className="w-170 h-40  ">
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
                  <div className="relative w-123">
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

                    <div className="absolute top-0 right-3 mt-6">
                      <p className="text-[14x] bg-[#0c2b78] text-white px-3 py-1.5 rounded-sm">
                        {item.projectCategory}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold">{item.projectTitle}</h3>

                      <p className="stat-title text-[13px]   whitespace-normal">
                        {item.projectDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className=" absolute right-95 bottom-4">
                {isloading == true ? (
                  <PlaceholderLine />
                ) : (
                  <h5 className="stat-title text-[#0c2b78] ">
                    {` $ ${item.minBudget} - ${item.maxBudget} `}
                  </h5>
                )}
              </div>

              {/* Added onClick to trigger your Popup function */}
              <div className="absolute right-3 bottom-3  w-60">
                <button
                  onClick={() => PopupPost(item, index)}
                  className="border-t w-25 pt-2 stat-title text-[10px] text-gray-400 cursor-pointer  "
                >
                  {OpenViewDetails === index ? "Hide Details" : "View Details"}
                </button>
                <button
                  className="border-t w-25 pt-2 stat-title text-[10px] text-gray-400 cursor-pointer relative left-8"
                  onClick={() =>
                    Navigate("/QuotationPage", { state: { item } })
                  }
                  key={index}
                >
                  Quotation +
                </button>
              </div>
            </div>

            {/* Expanded Details Section */}
            {PopupOpen && Items && OpenViewDetails === index && (
              <div className=" w-full bg-white z-10 p-4 shadow-xl flex flex-col transition-all duration-300 rounded-3xl">
                <div className="flex flex-row justify-around h-8 items-center ">
                  <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-4 py-1 rounded-sm shadow">
                    <label className="stat-title text-xs">Start Date</label>
                    <div className="text-gray-700 font-bold text-[12px]">
                      {new Date(item.startDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-col  text-center justify-center items-center bg-gray-200 px-4  py-1 rounded-sm shadow">
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

                  <div className="flex flex-col text-center justify-center items-center bg-gray-200 px-4 py-1 rounded-sm shadow">
                    <FaEnvelope className="text-red-700" />
                    <p className="text-[13px]">{item.user.email}</p>
                  </div>
                  <div className="fflex flex-col text-center justify-center items-center bg-gray-200 px-4 py-1 rounded-sm shadow">
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
      </div>

      {preview == true && (
        <div className="w-200 h-120 fixed top-30 z-20 flex justify-center items-center ml-20 overflow-hidden cursor-grabbing  ">
          <button
            className="z-40 text-white text-2xl absolute top-4 right-4 cursor-pointer "
            onClick={() => setPreview(false)}
          >
            <FaTimes />
          </button>
          {
            <img
              src={`http://localhost:5194${OpenImage}`}
              alt=""
              className=" "
            />
          }
        </div>
      )}
    </div>
  );
}

export default Feed;
