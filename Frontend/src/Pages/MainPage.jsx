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
import { Loader } from "semantic-ui-react";

function MainPage() {
  const [SearchInput, SetInput] = useState("");
  const [Item0, SetItem] = useState("");
  const [ShowResult, SetShowResults] = useState(false);
  const [Show, SetShow] = useState(false);
  const [index, setIndex] = useState("");

  const SelectData = useSelector((S) => S.AllCompanies.GetData);
  const { SearchData, isloading, isEmpty } = useSelector(
    (state) => state.SearchQuery,
  );

  const Dispatch = useDispatch();
  useEffect(() => {
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
    <div className="drawer lg:drawer-open bg-gray-100 min-h-screen w-full ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col min-h-screen w-screen bg-gray-100  ">
        {/* Navbar */}
        <nav className="navbar w-395  flex  bg-white text-[#0c2b78] shadow-sm sticky top-0 left-100  z-50 h-26 rounded-tl-sm rounded-bl-sm   ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost rela "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </nav>
        <div className="flex flex-col items-center p-4">
          <Outlet />
        </div>

        {/* Feed / Companies renders here */}
      </div>
      <div className="  drawer-side is-drawer-close:overflow-visible z-50  flex flex-col items-start bg-white text-[#0c2b78] is-drawer-close:w-14 is-drawer-open:w-64">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar "
          className="drawer-overlay"
        ></label>
        <SideBar />
      </div>

      {/* Sidebar */}
    </div>
  );
}
export default MainPage;
