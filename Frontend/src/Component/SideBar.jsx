import React from 'react';
import { useState } from 'react';   
import { useNavigate } from 'react-router-dom';
import {FaBuilding,FaHome} from 'react-icons/fa'

function SideBar(){
      const Navigate = useNavigate();
    return (
        <div className="flex min-h-full flex-col items-start bg-gray-200 text-[#0c2b78] is-drawer-close:w-18 is-drawer-open:w-64 z-[50] fixed shadow-xl rounded-2xl">
            <ul className="menu w-full grow gap-10 mt-14  ">

                <li className=''>
                    <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex item-center justify-center  h-12 rounded-4xl"
                        data-tip="Homepage"
                        onClick={() => Navigate('/MainPage/HomePage')}
                    >
                        <FaHome className="inline-block size-4" />
                        <span className="is-drawer-close:hidden">Homepage</span>
                    </button>
                </li>

                <li>
                    <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right  flex item-center justify-center"
                        data-tip="Projects"
                        onClick={() => Navigate('/MainPage/Projects')}
                    >
                        <FaBuilding className="inline-block size-4" />
                        <span className="is-drawer-close:hidden">Projects</span>
                    </button>
                </li>

                <li>
                    <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right  flex item-center justify-center"
                        data-tip="Settings"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                            <path d="M20 7h-9"></path>
                            <path d="M14 17H5"></path>
                            <circle cx="17" cy="17" r="3"></circle>
                            <circle cx="7" cy="7" r="3"></circle>
                        </svg>
                        <span className="is-drawer-close:hidden">Settings</span>
                    </button>
                </li>

            </ul>
        </div>
    )

}
export default SideBar;
    
    