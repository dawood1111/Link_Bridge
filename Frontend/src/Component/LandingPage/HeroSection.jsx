
import React from 'react';
import SwitchImg from '../../Images/Switch.jpg';    

function HeroSection(){
    return(



        <div className='bg-white  h-140 flex flex-col justify-center  gap-4 ' 
        style={{
            backgroundImage:`url(${SwitchImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
            ,opacity:'0.9'
        }}>
         
            <h1 className='font-bold text-[40px] text-white mt-11  ml-10'>Connect with Trusted IT & Construction Companies</h1>
            <h3 className='text-gray-400 font-bold w-100 ml-19'>Find reliable partners, compare ratings, and get your project done faster.</h3>
            <div className='mt-10'>
                 <button className=' bg-[#F97316] text-white font-bold h-10 w-33  ml-19 '>Get Started</button>
                <button className=' bg-[#F97316] text-white font-bold h-10 w-33  ml-8  '>Explore</button>
            </div>
           
            
        </div>

    )
}
export default HeroSection;



