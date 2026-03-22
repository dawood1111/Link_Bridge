import React, { useState } from "react";
export function TestPage(){
    const [event,SetEvent]=useState(false);
    const HandleClick=()=>{
        SetEvent(true);
        console.log(event)
    
    }
   return(
    
     <div className="bg-amber-200 w-100 h-100">
        
        <div className="post bg-amber-500 w-100 h-70">
            dawood
        </div>

<button className="bg-amber-950 w-100 text-white flex justify-center" onClick={HandleClick}> dropdown</button>


    </div>
   )

}