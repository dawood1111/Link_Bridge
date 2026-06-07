import React from "react";

import SideBar from "../Component/SideBar.jsx";
import { SearchBar } from "../Component/CompanySection/SearchBar.jsx";
import { AutoComplete } from "../Component/CompanySection/AutoComplete.jsx";
import { CompanyCard } from "../Component/CompanySection/CompanyCard.jsx";
import { CompanyProfile } from "../Component/CompanySection/CompanyProfile.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchData } from "../Redux/Slices/GetCompanies.jsx";
import { FetchSearchQuery } from "../Redux/Slices/SearchQuery.jsx";
import { Input, Loader } from "semantic-ui-react";
import { FaTimes } from "react-icons/fa";
import MobileBar from "../Component/MobileBar.jsx";

function MainPage() {
  const [SearchInput, SetInput] = useState("");
  const [Item0, SetItem] = useState("");
  const [ShowResult, SetShowResults] = useState(false);
  const [Show, SetShow] = useState(false);
  const [index, setIndex] = useState("");
  const [LastQuery, SetLastQuery] = useState("");
  const [State, SetState] = useState(false);

  const SelectData = useSelector((S) => S.AllCompanies.GetData);
  const { SearchData, isloading, isEmpty } = useSelector(
    (state) => state.SearchQuery,
  );
  const { Item } = useSelector((state) => state.modal);

  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(FetchData({}));
  }, []);

  const HandleClick = () => {
    Dispatch(FetchSearchQuery({ CompanyName: SearchInput }));
    SetInput("");
    SetState(true);
    SetLastQuery(SearchInput);
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
    <div className="drawer lg:drawer-open bg-gray-100 min-h-screen w-full ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen w-screen bg-gray-100  ">
        <nav className="navbar sm:w-full w-full flex justify-center items-center  bg-white text-[#0c2b78] shadow-sm sticky top-0  z-30 h-26 rounded-tl-sm rounded-bl-sm sm:ml-16   ">
          <div className="navbar-start mt-5 ml-3 ">
            <p
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Link Bridge
            </p>
          </div>

          <div className="navbar-center ">
            <div className="flex flex-col items-center pt-4  h-auto w-auto  relative ">
              <SearchBar
                onChange={SetInput}
                onClick={HandleClick}
                value={SearchInput}
              />

              {!ShowResult && (
                <AutoComplete
                  SearchInput={SearchInput}
                  data={SelectData}
                  onSelect={SetInput}
                />
              )}
            </div>
          </div>
          {LastQuery != null && State && (
            <div className="bg-white fixed h-140 sm:top-70 flex flex-col  items-center w-100 sm:left-326 shadow-xl rounded-sm p-6  overflow-x-hidden hide-scrollbar left-30 top-35  ">
              <div className="stat-title text-blue-950 text-[14px] shadow-2xl absolute top-0 w-full h-10 flex justify-center items-center   font-bold z-40">
                <button
                  className="absolute right-3 top-3 text-[#0c2b78s] cursor-pointer"
                  onClick={() => SetState(false)}
                >
                  <FaTimes />
                </button>
              </div>
              {!Show && (
                <CompanyCard
                  c
                  QuerySearch={SearchData}
                  ViewCompanyProfile={HandleViewProfile}
                />
              )}

              {isloading && (
                <div className="flex justify-center items-center h-96">
                  <Loader active inline="centered" />
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="flex flex-col items-center p-4">
          <Outlet />
        </div>
      </div>
      <div className="  drawer-side is-drawer-close:overflow-visible z-50  flex flex-col items-start bg-white text-[#0c2b78] is-drawer-close:w-14 is-drawer-open:w-64">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar "
          className="drawer-overlay"
        ></label>
        <SideBar />
      </div>
      <MobileBar />

      <div className="fixed left-150 z-50 top-22">
        {Show && Item0 && (
          <CompanyProfile BackBtn={() => SetShow(false)} item={Item0} />
        )}
      </div>
    </div>
  );
}
export default MainPage;
