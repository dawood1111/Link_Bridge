import react from "react";
import { useState } from "react";
import { GoogleRegister } from "../Redux/Slices/GoogleRegisterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
export function GoogleRegisterPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const Dispatch = useDispatch();
  const Navigator = useNavigate();

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: "",
      role: "",
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
    },
    onSubmit: async (values) => {
      const DispatchData = await Dispatch(GoogleRegister(values));
      if (GoogleRegister.fulfilled.match(DispatchData)) {
        Navigator("/CompanySetup");
      } else {
        alert("Google Registration failed");
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-sm shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Registration
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Role</label>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="User">User</option>
            <option value="Company">Company</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition duration-200"
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
}
export default GoogleRegisterPage;
