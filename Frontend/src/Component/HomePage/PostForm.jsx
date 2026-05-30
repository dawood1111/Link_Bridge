import React, { useState } from "react";
import { useFormik } from "formik";
import {
  FaBuilding,
  FaTags,
  FaCalendarAlt,
  FaDollarSign,
  FaImages,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { CloseModal } from "../../Redux/Slices/ModalSlice";
import { PostData } from "../../Redux/Slices/PostSlice";

const STATUS_OPTIONS = ["Pending", "In Progress", "Cancelled", "Completed"];
const CATEGORY_OPTIONS = [
  "IT Solutions",
  "Programming",
  "Construction",
  "Infrastructure",
  "Interior Design",
];

export function PostForm() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const Dispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      projectTitle: "",
      projectLocation: "",
      projectDescription: "",
      projectSize: "",
      startDate: "",
      endDate: "",
      projectStatus: "",
      projectCategory: "",
      minBudget: "",
      maxBudget: "",
    },
    onSubmit: () => {
      setShowConfirm(true);
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = async () => {
    const DataForm = { ...values, imagesList: imageFiles };
    console.log("Submitting form with data:", DataForm);

    const Result = await Dispatch(PostData(DataForm));
    if (PostData.fulfilled.match(Result)) {
      alert("Project posted successfully!");
      Dispatch(CloseModal());
    } else {
      alert("Failed: " + (Result.payload?.message || "Unknown error"));
    }
    setShowConfirm(false);
  };

  const input =
    "w-full bg-gray-100 rounded px-3 py-2 text-sm text-gray-900 outline-none font-sans";
  const label =
    "block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1";
  const error = "text-red-500 text-[11px] mt-1";

  const SectionLabel = ({ icon, text }) => (
    <div className="flex items-center gap-2 text-[#0c2b78] font-bold text-[11px] uppercase tracking-wider pb-2 mb-4 border-b border-gray-200">
      {icon} {text}
    </div>
  );

  return (
    <div className="flex justify-center items-center relative left-290 h-220 p-6 slide-in-right">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl" noValidate>
        <div className="bg-white  overflow-hidden shadow-sm flex flex-col h-200">
          {/* HEADER */}
          <div className="bg-white px-7 py-5 flex justify-between items-center border-b border-gray-200 h-20">
            <p className="flex gap-3 items-center text-[#0c2b78] uppercase font-bold text-sm">
              <FaBuilding size={13} /> NEW PROJECT
            </p>
            <span className="text-gray-400 text-xs">
              Fill in all required fields
            </span>
          </div>

          {/* BODY */}
          <div className="p-8 flex flex-col gap-8 overflow-y-auto h-[600px]">
            {/* SECTION 1: Basic Info */}
            <div>
              <SectionLabel icon={<FaInfoCircle />} text="Basic Information" />
              <div className="grid grid-cols-2 gap-4">
                {/* Project Title */}
                <div className="col-span-2">
                  <label className={label}>Project Title</label>
                  <input
                    name="projectTitle"
                    className={input}
                    placeholder="e.g. Downtown Office Renovation"
                    value={values.projectTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.projectTitle && errors.projectTitle && (
                    <p className={error}>{errors.projectTitle}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className={label}>Location</label>
                  <input
                    name="projectLocation"
                    className={input}
                    placeholder="City, Country"
                    value={values.projectLocation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.projectLocation && errors.projectLocation && (
                    <p className={error}>{errors.projectLocation}</p>
                  )}
                </div>

                {/* Project Size */}
                <div>
                  <label className={label}>Project Size</label>
                  <input
                    name="projectSize"
                    className={input}
                    placeholder="e.g. 2,400 m²"
                    value={values.projectSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.projectSize && errors.projectSize && (
                    <p className={error}>{errors.projectSize}</p>
                  )}
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className={label}>Description</label>
                  <textarea
                    name="projectDescription"
                    className={`${input} h-20 resize-none leading-relaxed`}
                    placeholder="Describe the scope and objectives of this project..."
                    value={values.projectDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.projectDescription && errors.projectDescription && (
                    <p className={error}>{errors.projectDescription}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: Classification */}
            <div>
              <SectionLabel icon={<FaTags />} text="Classification" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Category */}
                <div>
                  <label className={label}>Category</label>
                  <select
                    name="projectCategory"
                    className={`${input} cursor-pointer`}
                    value={values.projectCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {touched.projectCategory && errors.projectCategory && (
                    <p className={error}>{errors.projectCategory}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className={label}>Status</label>
                  <select
                    name="projectStatus"
                    className={`${input} cursor-pointer`}
                    value={values.projectStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select status</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {touched.projectStatus && errors.projectStatus && (
                    <p className={error}>{errors.projectStatus}</p>
                  )}
                </div>
              </div>

              {/* Status Pills */}
              <div className="flex gap-2 flex-wrap">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFieldValue("projectStatus", s)}
                    className={`px-4 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      values.projectStatus === s
                        ? "bg-[#0c2b78] text-white border-[#0c2b78]"
                        : "bg-gray-100 text-gray-500 border-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 3: Timeline */}
            <div>
              <SectionLabel icon={<FaCalendarAlt />} text="Timeline" />
              <div className="grid grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                  <label className={label}>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className={input}
                    value={values.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.startDate && errors.startDate && (
                    <p className={error}>{errors.startDate}</p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className={label}>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className={input}
                    value={values.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.endDate && errors.endDate && (
                    <p className={error}>{errors.endDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 4: Budget */}
            <div>
              <SectionLabel icon={<FaDollarSign />} text="Budget Range" />
              <div className="grid grid-cols-2 gap-4">
                {/* Min Budget */}
                <div>
                  <label className={label}>Min Budget (USD)</label>
                  <input
                    type="number"
                    name="minBudget"
                    className={input}
                    placeholder="0"
                    min="0"
                    value={values.minBudget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.minBudget && errors.minBudget && (
                    <p className={error}>{errors.minBudget}</p>
                  )}
                </div>

                {/* Max Budget */}
                <div>
                  <label className={label}>Max Budget (USD)</label>
                  <input
                    type="number"
                    name="maxBudget"
                    className={input}
                    placeholder="0"
                    min="0"
                    value={values.maxBudget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.maxBudget && errors.maxBudget && (
                    <p className={error}>{errors.maxBudget}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 5: Images */}
            <div>
              <SectionLabel icon={<FaImages />} text="Project Images" />
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center gap-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-[#0c2b78] transition"
              >
                <FaImages size={28} className="text-gray-400" />
                <p className="text-sm text-gray-500">
                  Click to upload or drag & drop
                </p>
                <span className="text-xs text-gray-400">
                  PNG, JPG, WEBP — up to 10 files
                </span>
              </label>
              <input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {imageFiles.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-3">
                  {imageFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0.5 right-0.5 bg-black/55 rounded-full w-4 h-4 flex items-center justify-center text-white cursor-pointer border-none"
                      >
                        <FaTrash size={7} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-linear-to-r from-slate-900 to-blue-900 px-7 py-4 flex justify-end gap-3">
            <button
              type="button"
              className="bg-transparent border border-white/30 text-white/75 px-5 py-2 rounded text-sm cursor-pointer font-sans hover:bg-white/10 transition"
              onClick={() => Dispatch(CloseModal())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-[#0c2b78] px-6 py-2 rounded text-sm font-bold cursor-pointer shadow-lg active:scale-95 transition"
            >
              Submit Project
            </button>
          </div>
        </div>
      </form>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 flex flex-col gap-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#0c2b78]">
              Submit Project
            </h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to submit this project?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm cursor-pointer hover:bg-gray-50 transition"
              >
                Never mind
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-[#0c2b78] text-white text-sm font-semibold cursor-pointer hover:bg-[#0a2463] active:scale-95 transition"
              >
                Let's do it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostForm;
