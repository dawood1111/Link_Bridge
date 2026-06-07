import React from "react";
import Companies from "../../Redux/Slices/GetCompanies";
import { useSelector } from "react-redux";
export function CompanyCard({ QuerySearch, ViewCompanyProfile }) {
  return (
    <div className="flex flex-col gap-4 justify-center   h-auto ">
      {QuerySearch.map((item, index) => (
        <div className="card  w-85 h-40 bg-gray-100 shadow-sm " key={index}>
          <div className="card-body">
            <div className="flex flex-row gap-2 ">
              <div className="shadow-2xl bg-gray-200 h-15 w-15 rounded-full flex justify-center items-center">
                {" "}
                <img
                  src={item.companyLogo}
                  alt=""
                  className="w-12  overflow-fit "
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="card-title text-[10px] ">{item.companyName}</h2>
                <p className=" stat-title   font-bold text-gray-500 relative bottom-3.5 left-1">
                  {item.solutionType}
                </p>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn  shadow-sm bg-[#0c2b78] text-white absolute bottom-5 w-35"
                onClick={() => {
                  ViewCompanyProfile(item, index);
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default CompanyCard;
