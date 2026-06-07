import React from "react";
export function AutoComplete({ data, SearchInput, onSelect }) {
  return (
    <>
      {SearchInput && (
        <div className="h-auto w-70 z-50  absolute top-22 left-0  p-2 bg-white shadow-lg rounded-xl ">
          {data
            .filter((item) => {
              const SearchTerm = SearchInput.toLowerCase();
              const CompanyName = item.companyName.toLowerCase();
              return SearchTerm && CompanyName.startsWith(SearchTerm);
            })
            .filter((item, index, arr) => {
              return (
                index ===
                arr.findIndex(
                  (el) =>
                    el.companyName.toLowerCase() ===
                    item.companyName.toLowerCase(),
                )
              );
            })
            .map((item, index) => (
              <div
                className="bg-white w-auto  pt-2.5 pb-2.5 pl-3 pr-3  hover:bg-gray-100 hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer  border-none h-auto     flex justify-start items-center stat-title text-blue-950 text-[14px] "
                key={index}
                onClick={() => onSelect(item.companyName)}
              >
                <div key={index} className="  ">
                  {item.companyName}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
export default AutoComplete;
