import React from "react";
import Companies from "../../Redux/Slices/GetCompanies";
import { useSelector } from "react-redux";
export function CompanyCard({ QuerySearch, ViewCompanyProfile }) {
  return (
    <div className="flex flex-col gap-4 justify-center   h-auto ">
      {QuerySearch.map((item, index) => (
        <div
          className="card  w-100 h-45 bg-gray-100 shadow-xl rounded-sm"
          key={index}
        >
          <div className="card-body">
            <div className="flex flex-row gap-6 ">
              <div className="shadow-2xl  h-14 w-14 rounded-full flex justify-center items-center overflow-hidden border-2 border-gray-300">
                {" "}
                <img
                  src={item.companyLogo}
                  alt=""
                  className="  rounded-full overflow-fit "
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="card-title text-[16px] ">{item.companyName}</p>
                <p className=" stat-title   font-bold text-gray-500 relative bottom-3.5 left-1">
                  {item.solutionType}
                </p>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn  shadow-sm bg-[#0c2b78] text-white absolute bottom-2 "
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
