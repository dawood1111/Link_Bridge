import UserProfilePanel from "../Component/HomePage/UserProfile";
import { Feed } from "../Component/HomePage/Feed";
import { SearchBar } from "../Component/CompanySection/SearchBar";
import { AutoComplete } from "../Component/CompanySection/AutoComplete";
import { CompanyCard } from "../Component/CompanySection/CompanyCard";
import { CompanyProfile } from "../Component/CompanySection/CompanyProfile";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FetchSearchQuery } from "../Redux/Slices/SearchQuery";
import { FetchData } from "../Redux/Slices/GetCompanies";
import { Post } from "../Component/HomePage/Post";
import { Loader, Message, MessageHeader } from "semantic-ui-react";
import { FilterSys } from "../Component/HomePage/FilterSys";
import { PostForm } from "../Component/HomePage/PostForm";
import { NotificationsSection } from "../Component/HomePage/NotificationsSection";
import { UserData } from "../Redux/Slices/LogedUserSlice";

export function HomePages() {
  const [SearchInput, SetInput] = useState("");
  const [Item0, SetItem] = useState("");
  const [ShowResult, SetShowResults] = useState(false);
  const [Show, SetShow] = useState(false);
  const [index, setIndex] = useState("");

  const SelectData = useSelector((S) => S.AllCompanies.GetData);
  const { SearchData, isloading, isEmpty } = useSelector(
    (state) => state.SearchQuery,
  );

  const UserLoged = useSelector((state) => state.logedUser.UserData);
  console.log(UserLoged.email);

  const { Item } = useSelector((state) => state.modal);

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(UserData());
    Dispatch(FetchData({}));
  }, []);

  const HandleClick = () => {
    Dispatch(FetchSearchQuery({ CompanyName: SearchInput }));
    SetInput("");
  };

  const HandleReset = () => {
    SetShow(false);
    SetItem("");
  };

  const HandleViewProfile = (item, index) => {
    SetShow(true);
    SetItem(item);
    setIndex(index);
  };

  return (
    <div className="bg-gray-100 min-h-screen  w-full  ">
      <div>
        <div className=" mt-3 flex flex-row    ">
          <Post />
        </div>
        <div className="fixed z-50 top-1 ">
          {Item === "CreatePost" && <PostForm />}
        </div>
      </div>

      <div className="flex sm:flex-row  flex-col  justify-center mt-10 sm:mt-0  sm:gap-16   sm:justify-start sm:ml-30 ">
        <div className=" ">
          <FilterSys />
        </div>
        <div className="sm:flex flex-col  ">
          <div className="sm:flex sm:fixed top-40 right-6 justify-start items-center gap-3 bg-white w-100  pt-3 pb-3 rounded-full pl-6">
            <div className="[background:linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_35%,rgba(0,212,255,1)_100%)] w-11 h-11 text-white flex justify-center items-center font-bold rounded-full">
              {UserLoged.userName?.[0] || "U"}
            </div>
            <p className="font-semibold">{UserLoged.userName}</p>
          </div>
          <div className=" sm:flex flex-col gap-6 sm:w-100  sm:h-160 sm:m-10   hidden">
            <NotificationsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
