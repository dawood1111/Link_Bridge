import { useState } from "react";
import { FetchData } from "../Redux/Slices/CompanySetupSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CompanySetup() {
  const [FileHandling, SetFileHandling] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    solutionType: "",
    companyDescription: "",
    contactNumber: "",
    address: "",
    startedAt: "",
    companySize: "",
    companyLogo: null,
  });

  const Dispatch = useDispatch();
  const Navigator = useNavigate();

  const handleChange = (e) => {
    if (e.target.type == "file") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const DispatchData = await Dispatch(FetchData(form));
    console.log("DispatchData:", DispatchData);
    if (FetchData.fulfilled.match(DispatchData)) {
      Navigator("/MainPage");
    }

    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-sm shadow-xl w-170  p-8">
        <div className="text-center mb-6">
          <p className="text-[16px] font-bold text-gray-800">Company Setup</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          {["Register", "Company Info", "Verify"].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${i === 1 ? "bg-[#0c2b78] text-white" : "bg-gray-100 text-gray-400"}`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs ${i === 1 ? "text-[#0c2b78]font-medium" : "text-gray-300"}`}
                >
                  {label}
                </span>
              </div>
              {i < 2 && <div className="w-14 h-px bg-gray-200 mx-2 mb-4" />}
            </div>
          ))}
        </div>

        <p className="text-xl font-semibold text-gray-700 mb-6">
          Company Details
        </p>

        <div className="flex gap-4 items-start mb-4">
          <div className="flex-1">
            <label className="block text-xs border-none font-medium text-gray-500 mb-1">
              Company Name
            </label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition border-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <input
              type="file"
              name="companyLogo"
              className=" border-dotted w-30 h-10  "
              onChange={handleChange}
            />

            <span className="text-xs text-gray-400">Logo</span>
          </div>
        </div>

        {/* Solution Type */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Solution Type
          </label>
          <select
            name="solutionType"
            onChange={handleChange}
            className="w-full border border-none bg-gray-50 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition  text-gray-500"
          >
            <option value=""> Solution Type </option>
            {["Construction", "ITsolution", "Programing"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Company Description
          </label>
          <textarea
            name="companyDescription"
            onChange={handleChange}
            placeholder="Describe your company..."
            rows={3}
            className="w-full border border-none bg-gray-50 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition resize-none"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1 ">
              Contact Number
            </label>
            <input
              name="contactNumber"
              onChange={handleChange}
              placeholder="+962 7x xxx xxxx"
              className="w-full border border-none bg-gray-50 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Company Size
            </label>
            <input
              name="companySize"
              onChange={handleChange}
              type="number"
              placeholder="e.g. 50"
              className="w-full border border-none bg-gray-50 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Address
          </label>
          <div className="relative">
            <input
              name="address"
              onChange={handleChange}
              placeholder="Search address"
              className="w-full border border-none bg-gray-50 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition pr-9"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute right-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Founded Date
          </label>
          <input
            name="startedAt"
            onChange={handleChange}
            type="Date"
            className="w-full border-none bg-gray-50 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition text-gray-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#0c2b78] hover:bg-white hover:text-[#0c2b78] hover:border-[#0c2b78] active:scale-95 text-white font-semibold rounded-sm py-3 text-sm transition"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
export default CompanySetup;
