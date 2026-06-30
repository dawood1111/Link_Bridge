import React from "react";

export function CompanyProfile({ item, BackBtn }) {
  return (
    <div className="w-120 bg-gray-100 rounded-sm shadow-sm border sm:flex sm:flex-col  item-center  border-gray-100 overflow-hidden z-30 h-140 item-center relative right-130 top-20">
      <div className="h-25 bg-white"></div>

      <div className="px-4 pb-4">
        <div className="-mt-5 mb-3">
          <div className="w-20 h-20 rounded-full  flex items-center justify-center font-medium   overflow-hidden shadow-2xl">
            <img
              className="  w-20 h-20  flex justify-center items-center rounded-full  "
              src={item.companyLogo}
            />
          </div>
        </div>

        <h2 className="font-medium text-gray-900">{item.companyName}</h2>

        <hr className="my-3 border-gray-100" />

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs text-gray-400">employees</div>
            <div className="text-md font-medium">{item.companySize ?? "—"}</div>
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs text-gray-400">Founded</div>
            <div className="text-md font-medium">
              {new Date(item.startedAt).getFullYear()}
            </div>
          </div>

          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs text-gray-400">Solution</div>
            <div className="text-md font-medium">{item.solutionType}</div>
          </div>

          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs text-gray-400">Address</div>
            <div className="text-md font-medium">{item.address}</div>
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs text-gray-400">Contact</div>
            <div className="text-md font-medium">{item.contactNumber}</div>
          </div>

          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs text-gray-400">Email</div>
            <div className="text-md font-medium">{item.email}</div>
          </div>
        </div>
      </div>
      <button
        className="bg-[#0c2b78] text-white w-70 relative left-30 top-10 cursor-pointer  p-2 rounded-3xl "
        onClick={BackBtn}
      >
        Close
      </button>
    </div>
  );
}
export default CompanyProfile;
