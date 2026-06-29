import React from "react";

export function CompanyProfile({ item, BackBtn }) {
  return (
    <div className="w-150 bg-gray-100 rounded-xl shadow border flex flex-col  item-center  border-gray-100 overflow-hidden z-30 h-180">
      <div className="h-20 bg-white"></div>

      <div className="px-4 pb-4">
        <div className="-mt-5 mb-3">
          <div className="w-20 h-20 rounded-full  flex items-center justify-center font-medium text-amber-800 border-2 border-white overflow-hidden">
            <img
              className="  w-20 h-20  flex justify-center items-center rounded-full "
              src={item.companyLogo}
            />
          </div>
        </div>

        <h2 className="font-medium text-gray-900">{item.companyName}</h2>
        <p className="text-[11px] text-gray-500 mt-1">
          {item.solutionType} · {item.address}
        </p>

        <hr className="my-3 border-gray-100" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-medium">{item.companySize ?? "—"}</div>
            <div className="text-xs text-gray-400">employees</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-medium">
              {new Date(item.startedAt).getFullYear()}
            </div>
            <div className="text-xs text-gray-400">Founded</div>
          </div>
        </div>

        <hr className="my-3 border-gray-100" />

        {/* Contact */}
        <p className="text-xs font-medium text-gray-700 mb-2">Contact</p>
        <div className="text-xs text-gray-500 flex flex-col gap-1">
          <span>{item.email}</span>
          <span>{item.contactNumber}</span>
        </div>

        <hr className="my-3 border-gray-100" />

        <div className="text-xs text-gray-500 flex flex-col gap-1">
          <p className="text-xs font-medium text-gray-700 mb-2">Achievement</p>

          <ul className="timeline timeline-vertical lg:timeline-horizontal ">
            <li>
              <div className="timeline-start">1984</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">
                First Macintosh computer
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start">1998</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">iMac</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start">2001</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">iPod</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start">2007</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">iPhone</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start">2015</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">Apple Watch</div>
            </li>
          </ul>
        </div>
      </div>
      <button
        className=" mt-10 w-full btn btn-sm bg-[#505081] text-white"
        onClick={BackBtn}
      >
        Back
      </button>
    </div>
  );
}
export default CompanyProfile;
