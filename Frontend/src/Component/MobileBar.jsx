import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaHome, FaBell } from "react-icons/fa";
import { Button, Icon } from "semantic-ui-react";
import { ClearInfo } from "../Redux/Slices/SignInSlice";
import { clearSignUp } from "../Redux/Slices/UserSlice";
import { useDispatch } from "react-redux";
function MobileBar() {
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:5194/api/User/LogOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      document.cookie =
        "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        ".AspNetCore.Cookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      Dispatch(ClearInfo());
      Dispatch(clearSignUp());

      window.location.replace("http://localhost:5173/SignIn");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <>
      {/* Mobile: bottom bar */}
      <div className="flex sm:hidden fixed bottom-0 left-0 w-full h-16 bg-white text-[#0c2b78] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 items-center justify-around px-4">
        <button
          onClick={() => navigate("/MainPage/HomePage")}
          className="flex flex-col items-center justify-center gap-1"
        >
          <FaHome className="size-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => navigate("/MainPage/Projects")}
          className="flex flex-col items-center justify-center gap-1"
        >
          <FaBuilding className="size-5" />
          <span className="text-[10px]">Projects</span>
        </button>

        <button className="flex flex-col items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="size-5"
          >
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </svg>
          <span className="text-[10px]">Settings</span>
        </button>

        <button
          onClick={() => navigate("/MainPage/Notifications")}
          className="flex flex-col items-center justify-center gap-1"
        >
          <FaBell className="size-5" />
          <span className="text-[10px]">Notification</span>
        </button>

        <button
          onClick={handleSignOut}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Icon name="sign out" />
          <span className="text-[10px]">Sign Out</span>
        </button>
      </div>
    </>
  );
}
export default MobileBar;
