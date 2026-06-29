import React, { useState } from "react";
import AutoComplete from "../Component/CompanySection/AutoComplete";
import { useSelector } from "react-redux";
import { SearchBar } from "../Component/CompanySection/SearchBar";
import { useDispatch } from "react-redux";
import { FetchSearchQuery } from "../Redux/Slices/SearchQuery";
import { CompanyProfile } from "../Component/CompanySection/CompanyProfile";
import FilterSys from "../Component/CompanySection/Filter";
import { FetchData } from "../Redux/Slices/GetCompanies";
import { Placeholder, PlaceholderLine } from "semantic-ui-react";

import { CompanyCard } from "../Component/CompanySection/CompanyCard";
import { useEffect } from "react";
export function Companies() {
  const [SearchInput, SetInput] = useState("");
  const [Item, SetItem] = useState("");
  const [ShowResult, SetShowResults] = useState(false);
  const [Show, SetShow] = useState(false);
  const [index, setIndex] = useState("");
  const [removeSearchRes, setRemoveSearchRes] = useState(true);
  const [justTrue, setJustTrue] = useState(true);

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
    <div className="flex justify-center items-center flex-col  bg-amber-200 h-auto  relative left-100">
      <SearchBar
        onChange={SetInput}
        onClick={HandleClick}
        value={SearchInput}
      />

      <FilterSys
        ViewProfileCompany={HandleViewProfile}
        handleReset={HandleReset}
      />

      <AutoComplete
        SearchInput={SearchInput}
        data={selectData}
        onSelect={SetInput}
      />

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
  );
}
export default Companies;
