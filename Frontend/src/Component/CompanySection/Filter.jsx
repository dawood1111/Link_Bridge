import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FetchData } from "../../Redux/Slices/GetCompanies";

export function FilterSys({ViewProfileCompany,handleReset}){
    const Dispatch = useDispatch();
    const [Show,SetShow]=useState(false);
    const [Item,SetItem]=useState('');

const SelectData=useSelector((state)=>state.AllCompanies.GetData ?? []);


const HandleClick=(item)=>{
    SetShow(true)
    SetItem(item);
    

}


return(
    <div className="flex flex-row   mt-4 relative right-180 gap-4">
    

    
        <div className="flex flex-col gap-3 items-center  h-auto   border-r-2 border-gray-100 pr-4  absolute  top-0   bg-white rounded-lg shadow p-4 z-[49]">
            <p className="text-[11px] font-medium text-gray-700 uppercase tracking-wider mb-2">Filter By Type</p>
            {
                SelectData.map((item,index)=>(

                    <button key={index} className="btn stat-title text-black w-50 active:text-white active:bg-red-500"  onClick={()=>{HandleClick(item)}}>{item.solutionType}</button>

                ))
            }
            <input className="btn btn-square rounded-4xl" type="reset" onClick={()=>{SetShow(false),SetItem(''), handleReset}} value="×"/>
        </div>
        
        
{
   
    Show&&Item&&(
      
          <div className=" grid grid-cols-3 h-40 absolute  w-260  left-65" >
            {
        SelectData.filter(value=>value.solutionType==Item.solutionType).map((value,ind)=>
        ( 
         
        
            <div className="  w-100 bg-gray-50 shadow-sm  " key={ind}>
  <div className="card-body">
    <div className="flex flex-row gap-3 ">
        <div className="bg-amber-400 flex justify-center items-center w-9 h-9 border-1 rounded-sm">D</div>
     <h2 className="card-title ">{value.companyName}</h2>
    </div>
     
    
    <p className="mt-4 stat-title ml-1 text-[13px] font-bold text-gray-500">{value.solutionType}</p>
    <div className="card-actions justify-end">
      <button className="btn bg-[] shadow-sm" onClick={()=>ViewProfileCompany(value,ind)}>View Profile</button>
       </div>
    </div>

</div>




)

        )}
        </div>
    
     )

}
</div>
 
)
}
export default FilterSys;