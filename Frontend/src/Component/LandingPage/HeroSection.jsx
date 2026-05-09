import React from "react";
import SwitchImg from "../../Images/Switch.jpg";
import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function HeroSection() {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] flex  items-center">
      <img src={SwitchImg} className="absolute w-full h-full object-cover" />
      <div className="relative max-w-3xl px-8 sm:px-16 text-white space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-xl">
          Connect with Trusted IT & Construction Companies
        </h1>

        <p className="text-1xl sm:text-20 text-gray-200">
          Find reliable partners, compare ratings, and get your project done
          faster.
        </p>
      </div>

      <div className="   z-10 absolute bottom-28  left-20 flex  justify-between space-x-4 w-80">
        <button
          className="bg-[white] hover:bg-orange-600 px-10 py-3 rounded-sm font-semibold text-[#0c2b78] "
          onClick={Navigate("/SignUp")}
        >
          Get Started
        </button>

        <button className="border border-white px-8 py-3 rounded-sm  font-semibold text-white hover:bg-white hover:text-black transition">
          Explore
        </button>
      </div>
    </div>
  );
}
export default HeroSection;
