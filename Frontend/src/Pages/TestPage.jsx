import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaTags,
  FaCalendarAlt,
  FaDollarSign,
  FaImages,
  FaPlus,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import { ProjectFormSchema } from "../Schema/Schema";

const STATUS_OPTIONS = ["Pending", "In Progress", "Cancelled", "Completed"];
const CATEGORY_OPTIONS = [
  "IT Solutions",
  "Programming",
  "Construction",
  "Infrastructure",
  "Interior Design",
];

export function TestPage() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

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
      ProjectTitle: "",
      ProjectLocation: "",
      ProjectDescription: "",
      ProjectSize: "",
      StartDate: "",
      EndDate: "",
      ProjectStatus: "",
      ProjectCategory: "",
      MinBudget: "",
      MaxBudget: "",
    },
    validationSchema: ProjectFormSchema,
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

  const handleConfirm = () => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => formData.append(key, val));
    imageFiles.forEach((file) => formData.append("ImagesList", file));
    setShowConfirm(false);
  };

  const Field = ({ label, name, error, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
        }}
      >
        {label}
      </label>
      {children}
      {touched[name] && error && (
        <p style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>{error}</p>
      )}
    </div>
  );

  const inputStyle = {
    background: "#f3f4f6",
    border: "none",
    borderRadius: 4,
    padding: "9px 12px",
    fontSize: 13,
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    transition: "box-shadow 0.15s",
  };

  const sectionLabel = (icon, text) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "#0c2b78",
        fontWeight: 700,
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        paddingBottom: 10,
        marginBottom: 14,
        borderBottom: "0.5px solid #e5e7eb",
      }}
      className="flex item-center gap-8 font-medium pb-10 mb-14 border-b-2 border-[#e5e7eb] uppercase"
    >
      {icon} {text}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "24px 16px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "400px%", maxWidth: 600 }}
        noValidate
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER */}
          <div className="bg-white px-7 py-5 flex justify-between items-center border-b border-gray-200">
            <p className="flex gap-4 items-center text-[#0c2b78] uppercase font-bold">
              <FaBuilding size={13} /> NEW PROJECT
            </p>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              Fill in all required fields
            </span>
          </div>

          {/* BODY */}
          <div
            style={{
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 28,
              overflowY: "auto",
              maxHeight: "calc(96vh - 130px)",
            }}
          >
            {/* SECTION 1: Basic Info */}
            <div>
              {sectionLabel(<FaInfoCircle />, "Basic Information")}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div style={{ gridColumn: "span 2" }}>
                  <Field
                    label="Project Title"
                    name="ProjectTitle"
                    error={errors.ProjectTitle}
                  >
                    <input
                      name="ProjectTitle"
                      className="InputStyle"
                      placeholder="e.g. Downtown Office Renovation"
                      value={values.ProjectTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </div>
                <Field
                  label="Location"
                  name="ProjectLocation"
                  error={errors.ProjectLocation}
                >
                  <input
                    name="ProjectLocation"
                    className="InputStyle"
                    placeholder="City, Country"
                    value={values.ProjectLocation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field
                  label="Project Size"
                  name="ProjectSize"
                  error={errors.ProjectSize}
                >
                  <input
                    name="ProjectSize"
                    className="InputStyle"
                    placeholder="e.g. 2,400 m²"
                    value={values.ProjectSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <div style={{ gridColumn: "span 2" }}>
                  <Field
                    label="Description"
                    name="ProjectDescription"
                    error={errors.ProjectDescription}
                  >
                    <textarea
                      name="ProjectDescription"
                      style={{
                        ...inputStyle,
                        height: 90,
                        resize: "none",
                        lineHeight: 1.6,
                      }}
                      placeholder="Describe the scope and objectives of this project..."
                      value={values.ProjectDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* SECTION 2: Classification */}
            <div>
              {sectionLabel(<FaTags />, "Classification")}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 14,
                }}
              >
                <Field
                  label="Category"
                  name="ProjectCategory"
                  error={errors.ProjectCategory}
                >
                  <select
                    name="ProjectCategory"
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "none",
                    }}
                    value={values.ProjectCategory}
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
                </Field>
                <Field
                  label="Status"
                  name="ProjectStatus"
                  error={errors.ProjectStatus}
                >
                  <select
                    name="ProjectStatus"
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "none",
                    }}
                    value={values.ProjectStatus}
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
                </Field>
              </div>
              {/* Quick Status Pills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFieldValue("ProjectStatus", s)}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 500,
                      border: "0.5px solid",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      background:
                        values.ProjectStatus === s ? "#0c2b78" : "#f3f4f6",
                      color: values.ProjectStatus === s ? "#fff" : "#6b7280",
                      borderColor:
                        values.ProjectStatus === s ? "#0c2b78" : "#e5e7eb",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 3: Timeline */}
            <div>
              {sectionLabel(<FaCalendarAlt />, "Timeline")}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <Field
                  label="Start Date"
                  name="StartDate"
                  error={errors.StartDate}
                >
                  <input
                    type="date"
                    name="StartDate"
                    className="InputStyle"
                    value={values.StartDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field label="End Date" name="EndDate" error={errors.EndDate}>
                  <input
                    type="date"
                    name="EndDate"
                    className="InputStyle"
                    value={values.EndDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </div>
            </div>

            {/* SECTION 4: Budget */}
            <div>
              {sectionLabel(<FaDollarSign />, "Budget Range")}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <Field
                  label="Min Budget (USD)"
                  name="MinBudget"
                  error={errors.MinBudget}
                >
                  <input
                    type="number"
                    name="MinBudget"
                    className="InputStyle"
                    placeholder="0"
                    min="0"
                    value={values.MinBudget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field
                  label="Max Budget (USD)"
                  name="MaxBudget"
                  error={errors.MaxBudget}
                >
                  <input
                    type="number"
                    name="MaxBudget"
                    className="InputStyle"
                    placeholder="0"
                    min="0"
                    value={values.MaxBudget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </div>
            </div>

            {/* SECTION 5: Images */}
            <div>
              {sectionLabel(<FaImages />, "Project Images")}
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center gap-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-gray-400"
              >
                <FaImages size={28} color="#9ca3af" />
                <p style={{ fontSize: 13, color: "#6b7280" }}>
                  Click to upload or drag & drop
                </p>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>
                  PNG, JPG, WEBP — up to 10 files
                </span>
              </label>
              <input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {imageFiles.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 12,
                  }}
                >
                  {imageFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: 64,
                        height: 64,
                        borderRadius: 6,
                        overflow: "hidden",
                        border: "0.5px solid #e5e7eb",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          background: "rgba(0,0,0,0.55)",
                          border: "none",
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      >
                        <FaTrash size={8} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              background: "#0c2b78",
              padding: "16px 28px",
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <button
              type="button"
              style={{
                background: "transparent",
                border: "0.5px solid rgba(255,255,255,0.35)",
                color: "rgba(255,255,255,0.75)",
                padding: "8px 20px",
                borderRadius: 4,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "#fff",
                border: "none",
                color: "#0c2b78",
                padding: "8px 24px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              Submit Project
            </button>
          </div>
        </div>
      </form>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              width: 320,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0c2b78" }}>
              Submit Project
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280" }}>
              Are you sure you want to submit this project?
            </p>
            <div
              style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
            >
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "0.5px solid #e5e7eb",
                  color: "#6b7280",
                  fontSize: 13,
                  cursor: "pointer",
                  background: "#fff",
                  fontFamily: "inherit",
                }}
              >
                Never mind
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#0c2b78",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
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

export default TestPage;
