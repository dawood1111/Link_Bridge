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

export function HomePages() {
  const [SearchInput, SetInput] = useState("");
  const [Item, SetItem] = useState("");
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
    <div className="">
      <div className=" relative top-3 flex flex-row  justify-center items-center right-50">
        <Post />
      </div>
      <div className=" flex justify-center item-center absolute left-50">
        <FilterSys />
      </div>
      <div className="flex flex-col justify-center"></div>
      <div className="flex flex-col items-center gap-5 fixed top-25 left-315 bg-white shadow-xl pt-6 rounded-xl h-200 w-118 overflow-scroll">
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

        {Show && Item && (
          <CompanyProfile BackBtn={() => SetShow(false)} item={Item} />
        )}

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
    </div>
  );
}
