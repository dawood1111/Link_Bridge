import { use, useState } from "react";
import { useEffect } from "react";
import images2 from "../Images/construction2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "../Redux/Slices/SignInSlice.jsx";
import { useFormik } from "formik";
import { SignInSchema } from "../Schema/Schema.js";
import images4 from "../Images/aesthetic.jfif";
import { Icon } from "semantic-ui-react";

function SignIn() {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { isloading } = useSelector((state) => state.user2);

  async function onSubmit() {
    const DispatchData = await Dispatch(FetchData(values));
    if (FetchData.fulfilled.match(DispatchData)) {
      Navigate("/MainPage/HomePage");
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
  const GoogleNavigate = () => {
    window.location.href = "http://localhost:5194/api/Google/login-google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-[Poppins,sans-serif] ">
      <form
        onSubmit={handleSubmit}
        className="sm:flex sm:h-auto sm:w-280 shadow-lg rounded-sm mt-[20px ] w-140 "
      >
        <div className="hidden relative sm:flex justify-center items-center overflow-hidden w-200 ">
          <img src={images4} alt="" className="" />

          <div className="absolute bottom-0 left-0 right-0 z-10 p-8 bg-gradient-to-t from-[#081232] to-transparent">
            <h1
              className="font-['Cormorant_Garamond'] text-4xl font-light text-white leading-tight mb-3
     animate-[fadeUp_0.9s_0.2s_ease_both]"
            >
              Welcome to
              <br />
              <span className="font-semibold">Link Bridge</span>
            </h1>

            {/* Accent line */}
            <div className="w-9 h-0.5 bg-orange-400/80 mb-3 animate-[slideRight_0.8s_0.5s_ease_both]" />

            {/* Subtitle */}
            <p
              className="text-xs font-light text-white/50 leading-relaxed
     animate-[fadeUp_0.9s_0.4s_ease_both]"
            >
              Connecting projects,
              <br />
              building futures.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-14 bg-white  pr-30 pl-30 content-center justify-center   shadow-sm h-180  sm:h-170 rounded-sm sm:rounded-none  w-140 sm:w-180 ">
          <button
            className="bg-linear-to-r from-slate-900 to-blue-900 text-white pl-4 pr-4  pt-2.5 pb-2.5 border-none shadow-sm rounded-sm flex justify-center gap-2  sm:text-[12px] cursor-pointer  text-[10px] font-[Poppins,sans-serif] font-medium  w-90 sm:w-110"
            type="button"
            onClick={GoogleNavigate}
          >
            <Icon className="google" />
            <p className="stat-title text-white sm:text-[13px] font-[Poppins,sans-serif] font-medium  text-[11px]">
              Sign in with Google
            </p>
          </button>
          <div className="flex items-center justify-center sm:text-[14px] w-90 sm:w-110 font-[Poppins,sans-serif] font-medium text-gray-500">
            <div className="flex-1 h-px bg-gray-950"></div>
            <span className="pr-2.5 pl-2.5 font-[Poppins,sans-serif] font-semibold  ">
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
              className=" bg-gray-100  sm:w-110 w-90 pl-2  pt-3 pb-3 rounded-sm shadow-sm"
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
              className="  bg-gray-100  sm:w-110 w-90 pl-2  pt-3 pb-3 rounded-sm shadow-sm"
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
              className="mx-auto   bg-linear-to-r from-slate-900 to-blue-900 text-white  pt-2.5 pb-2.5 border-none 
              rounded-sm  text-center flex items-center justify-center  
              cursor-pointer sm:text-[12px] text-[10px] font-[Poppins,sans-serif] font-medium  w-90 sm:w-110 "
            >
              {isloading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
