import React from "react";
export function AutoComplete({ data, SearchInput, onSelect }) {
  return (
    <div className="h-auto w-40 ">
      {data
        .filter((item) => {
          const SearchTerm = SearchInput.toLowerCase();
          const CompanyName = item.companyName.toLowerCase();
          return SearchTerm && CompanyName.startsWith(SearchTerm);
        })
        .map((item, index) => (
          <div
            className="bg-white w-50 absolute top-20 left-6  h-auto  pl-3 pt-1 rounded-xl pr-2 z-20"
            key={index}
          >
            <div
              key={index}
              onClick={() => onSelect(item.companyName)}
              className=" mb-2 hover:bg-gray-100 cursor-pointer pl-3 rounded-2xl pt-2 pb-2 "
            >
              {item.companyName}
            </div>
          </div>
        ))}
    </div>
  );
}
export default AutoComplete;
