import React from "react";
 export function AutoComplete({data,SearchInput,onSelect}){

    return(
        <>
           {
             data.filter(item=>{

        const SearchTerm=SearchInput.toLowerCase();
        const CompanyName=item.companyName.toLowerCase();
        return SearchTerm && CompanyName.startsWith(SearchTerm)

       }).map((item,index)=> (
        <div className="mt-2">
             <div key={index} onClick={()=>onSelect(item.companyName)} className=" w-130 h-7 pl-4 cursor-pointer hover:bg-gray-200 absolute left-0 right-0 top-13 text-black ">{item.companyName}</div>
        </div>
         
        ))
       }
       
        
        </>
    )


}
export default AutoComplete;