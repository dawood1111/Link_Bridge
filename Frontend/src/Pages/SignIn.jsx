import { use, useState } from "react";
import { useEffect } from "react";
import images2 from "../Images/construction2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "../Redux/Slices/SignInSlice.jsx";
import { useFormik } from "formik";
import { SignInSchema } from "../Schema/Schema.js";

function SignIn() {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { isloading } = useSelector((state) => state.user2);

  async function onSubmit() {
    const DispatchData = await Dispatch(FetchData(values));
    if (FetchData.fulfilled.match(DispatchData)) {
      Navigate("/MainPage");
    } else {
      console.log("Sign In failed :", DispatchData.payload);
    }
  }
  const { handleChange, values, errors, handleSubmit } = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },

    validationSchema: SignInSchema,

    onSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-[Poppins,sans-serif]">
      <form
        onSubmit={handleSubmit}
        className="flex h-auto w-280 shadow-lg rounded-sm mt-[20px ] w-270"
      >
        <div className=" flex justify-center items-center overflow-hidden w-200">
          <img src={images2} alt="" className="" />
        </div>
        <div className="flex flex-col gap-14 bg-white  pr-30 pl-30 content-center justify-center   shadow-sm">
          <button className="bg-[#0c2b78] text-white pl-4 pr-4  pt-2.5 pb-2.5 border-none shadow-sm rounded-sm   text-[12px]">
            Sign in with Google
          </button>
          <div className="flex items-center justify-center text-[14px]">
            <div className="flex-1 h-px bg-gray-950"></div>
            <span className="pr-2.5 pl-2.5 font-[Poppins,sans-serif] font-semibold ">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-950"></div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="ml-1.5 text-[13px] font-[Poppins,sans-serif] font-medium">
              Email
            </label>
            <input
              id="Email"
              type="text"
              value={values.Email}
              name="Email"
              onChange={handleChange}
              className=" bg-gray-100  w-110 pl-2  pt-3 pb-3 rounded-sm shadow-sm"
            />
            <div>
              {errors.Email && (
                <p className="text-red-600 text-[12px] font-[Poppins,sans-serif] ml-1 mt-[-6px]">
                  {errors.Email}
                </p>
              )}
            </div>

            <label className="ml-1 text-[13px] font-[Poppins,sans-serif]  font-medium ">
              Password
            </label>
            <input
              id="Password"
              type="Password"
              name="Password"
              value={values.Password}
              onChange={handleChange}
              className="  bg-gray-100  w-110 pl-2  pt-3 pb-3 rounded-sm shadow-sm"
            />

            <div>
              {errors.Password && (
                <p className="text-red-600 text-[12px] font-[Poppins,sans-serif] ml-1 mt-[-6px]">
                  {errors.Password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mx-auto   bg-[#0c2b78] text-white pl-1 pr-1  pt-2.5 pb-2.5 border-none 
 rounded-[18px] shadow-sm text-center flex items-center justify-center   text-[12px] "
            >
              {isloading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
