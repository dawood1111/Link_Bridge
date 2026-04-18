import React from "react";
export function  CompanyCard({QuerySearch,ViewCompanyProfile}){
    return (
    <div className="flex flex-col justify-center   h-auto " >


        {
    (
        QuerySearch.map((item,index)=>(
                   
          <div className="card  w-96 bg-gray-50 shadow-sm" key={index}>
  <div className="card-body">
    <div className="flex flex-row gap-3 ">
        <div className="bg-amber-400 flex justify-center items-center w-9 h-9 border-1 rounded-sm">D</div>
     <h2 className="card-title ">{item.companyName}</h2>
    </div>
     
    
    <p className="mt-4 stat-title ml-1 text-[13px] font-bold text-gray-500">{item.solutionType}</p>
    <div className="card-actions justify-end">
      <button className="btn  shadow-sm" onClick={()=>{ViewCompanyProfile(item,index); console.log('done')}
         
    }>View Profile</button>
       </div>
    </div>

</div>

                          
               

          
                   
                ))
            )
        }
        </div>)
}
export default CompanyCard;