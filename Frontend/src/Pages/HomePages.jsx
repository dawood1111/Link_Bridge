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
export function HomePages() {
  const [SearchInput, SetInput] = useState("");
  const [Item, SetItem] = useState("");
  const [ShowResult, SetShowResults] = useState(false);
  const [Show, SetShow] = useState(false);
  const [index, setIndex] = useState("");

  const selectData = useSelector((S) => S.AllCompanies.GetData);
  const SelectQuery = useSelector((state) => state.SearchQuery.SearchData);

  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(FetchData({}));
  }, []);

  const HandleClick = () => {
    Dispatch(FetchSearchQuery({ CompanyName: SearchInput }));
    SetShowResults(true);
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
    <div className="">
      <div className=" relative top-3 flex flex-row  justify-center items-center right-50">
        <Post />
      </div>

      <div className="flex flex-row relative right-50 gap-20">
        <Feed />
      </div>
      <div className="flex flex-col items-center gap-4 fixed top-25 left-280 bg-gray-200 shadow-xl pt-6 rounded-sm h-200   w-100">
        <SearchBar
          onChange={SetInput}
          onClick={HandleClick}
          value={SearchInput}
        />
        {!ShowResult && (
          <AutoComplete
            SearchInput={SearchInput}
            data={selectData}
            onSelect={SetInput}
          />
        )}

        {Show && Item && (
          <CompanyProfile BackBtn={() => SetShow(false)} item={Item} />
        )}

        {ShowResult && !Show && (
          <CompanyCard
            c
            QuerySearch={SelectQuery}
            ViewCompanyProfile={HandleViewProfile}
          />
        )}
      </div>
    </div>
  );
}
