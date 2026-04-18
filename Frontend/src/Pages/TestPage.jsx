import React, { useState } from "react";
import { useEffect } from "react";
export function TestPage(){
    const [Quotation,SetQuotation]=useState([]);
    const fetchData=async()=>{
        const response=await fetch('http://localhost:5194/api/quotations/getQuotations',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'   
            },
            credentials:'include'
        });
        const data=await response.json();
        SetQuotation(data);
        console.log(Quotation);
        console.log(data);

    }
    useEffect(()=>{
        fetchData();
    },[])
    const HandleURL=(url)=>{
       window.open(url);
       console.log(url);

    }
   
    
   return(
    <div>
        {
            Quotation.map((url,index)=>(
                <div key={index} className="flex justify-center items-center ">
                    <button onClick={() => HandleURL(url)}>
                        View Quotation {index + 1}
                    </button>
                </div>
            ))  
          
        }
    
       
    </div>
     
   )
   

}