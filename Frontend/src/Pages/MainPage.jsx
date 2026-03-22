import React from "react";
import Feed from "../Component/LandingPage/Feed.jsx";
import SideBar from "../Component/LandingPage/SideBar.jsx";
import { Outlet } from "react-router-dom";

function MainPage(){
    return(
       <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            {/* Page content */}
            <div className="drawer-content flex flex-col">
                
                {/* Navbar */}
                <nav className="navbar w-full bg-gray-50 text-[#0c2b78] shadow-sm sticky top-0 z-20">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                </nav>

                {/* Feed / Companies renders here */}
                <div className="flex flex-col items-center p-4">
                    <Outlet />
                </div>

            </div>

            {/* Sidebar */}
            <div className="drawer-side is-drawer-close:overflow-visible z-30">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <SideBar />
            </div>

        </div>

    )
}
export default MainPage;