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
  const { Item } = useSelector((state) => state.modal);

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
    <div className="bg-gray-100 min-h-screen  gap-10 ">
      <div>
        <div>
          <div className=" mt-3 flex flex-row    ">
            <Post />
          </div>
          <div className="fixed z-50 top-1 ">
            {Item === "CreatePost" && <PostForm />}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-10 justify-center ml-50   ">
        <div className=" ">
          <FilterSys />
        </div>

        <div className="flex flex-col items-center gap-5   bg-white shadow-sm pt-6 rounded-xl h-160 w-110 overflow-x-auto sticky top-0 mr-30">
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
        <div className="fixed left-150 z-50 top-22">
          {Show && Item0 && (
            <CompanyProfile BackBtn={() => SetShow(false)} item={Item0} />
          )}
        </div>
      </div>
    </div>
  );
}
