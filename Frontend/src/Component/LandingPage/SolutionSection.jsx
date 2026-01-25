import {StarIcon} from '@heroicons/react/24/solid';
import {ClockIcon} from '@heroicons/react/24/solid';
import {GlobeAltIcon} from '@heroicons/react/24/solid';
import Time from '../../Images/Time.jpg';
import Rating from '../../Images/Rating.jpg';
import handShake from '../../Images/handShake.jpg';   
import React from 'react';


function SolutionSection(){
    const SolutionContainer="bg-white flex flex-col justify-end  text-black h-90 gap-8 col-span-1 shadow-2xl rounded-md "
    const CenterSolution="bg-white flex flex-col justify-end   text-black  h-120 col-span-1 shadow-2xl gap-6 rounded-md "
    const H1Style="font-bold text-[17px] fomat-sans  pl-2 pr-2 bg-[#0c2b78] w-50 pt-2 pb-2 text-white "
    const PStyle="text-[15px]  pl-3 pr-3 font-normal text-white bg-black/60  mb-10 rounded-md w-100 "
    return (
        <div className="mb-5  mt-5">
         <h1 className="text-center text-[30px] font-bold text-[#0c2b78] "> Our Solutions</h1>
        
        <div className=" grid grid-cols-3 gap-1 items-center justify-center mt-5  p-5 ">
            <div className={SolutionContainer}
            style={{
                backgroundImage:`url(${handShake})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
                
                <h1 className={H1Style}>
                    easy connection 
                     
                </h1>
                <p className={PStyle}>
                    Easy connection to trusted IT and construction companies
                     through our user-friendly platform.
                </p>
         

                 </div>
            <div className={CenterSolution} 
            style={{
                backgroundImage:`url(${Time})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
               <h1 className={H1Style}>
                    Time and Cost Efficiency
                </h1>
                <p className={PStyle}>
                    Save time and reduce costs by comparing ratings and hiring
                     reliable partners quickly.
                </p>
            </div>
            <div className={SolutionContainer} 
            style={{
                backgroundImage:`url(${Rating})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
              

                <h1 className={H1Style}>
                    Rating and Reviews
                </h1>
                <p className={PStyle}>
                    Access genuine ratings and reviews to make informed decisions
                     when selecting partners for your projects.
                </p>
            </div>
            </div>
        </div>
       

    )
}

export default SolutionSection;