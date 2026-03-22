import React, { use, useEffect } from "react";
import { useState } from "react"; 
import { FetchData } from "../../Redux/Slices/GetCompanies";
import { FetchSearchQuery } from "../../Redux/Slices/SearchQuery";
import { useDispatch,useSelector } from "react-redux";
import {FaSearch} from 'react-icons/fa'

export function Companies(){

    const [Input,SetInput]= useState('');
    const [ShowResults,SetShowResults]=useState(false);
    const [Show,SetShow]=useState(false);
    const [I,SetI]=useState('')
    const [Item,SetItem]=useState('')

    const HandleChange=(value)=>{
        SetInput(value);

    }
    const ViewProfileFun=(index,item)=>{
       SetShow(true);
       SetItem(item);
       SetI(index);

       

    }

    const Dispatch =useDispatch();


    const SelectData=useSelector((state)=>state.AllCompanies.GetData);
    const SelectQuery=useSelector((state)=>state.SearchQuery.SearchData);

   


    useEffect(()=>{
        Dispatch(FetchData({}));
    },[Dispatch]);

    const HandleCick=()=>{
        Dispatch(FetchSearchQuery({CompanyName:Input}));
        SetShowResults(true);
    }

return (
    <div className="flex justify-center items-center flex-col  relative">
        <div className="  flex flex-row justify-center  items-center  ">
             <input className=" shadow-s  w-140  h-13 rounded-3xl pl-3 shadow-xl  " type="text"  placeholder="Enter Company Name..."
        value={Input}
        onChange={(e)=>HandleChange(e.target.value)}
    
        />
        <button onClick={HandleCick} className=" absolute left-127 top-1  w-11 h-11 rounded-3xl bg-gray-400 text-white  flex justify-center items-center cursor-pointer "><FaSearch name="search"/></button>
         </div>
       
            {
             !ShowResults && SelectData.filter(item=>{

        const SearchTerm=Input.toLowerCase();
        const CompanyName=item.companyName.toLowerCase();
        return SearchTerm && CompanyName.startsWith(SearchTerm)

       }).map((item,index)=> (
        <div className="mt-2">
             <div key={index} onClick={()=>HandleChange(item.companyName)} className=" w-130 h-7 pl-4 cursor-pointer hover:bg-gray-200 absolute left-0 right-0 top-13 ">{item.companyName}</div>
        </div>
         
        ))
       }
       
    
<div className="grid grid-cols-3 absolute top-20 right-240" >


        {
            ShowResults&&(
        SelectQuery.map((item,index)=>(
                   
          <div className="card  w-96 bg-gray-50 shadow-sm" key={index}>
  <div className="card-body">
    <div className="flex flex-row gap-3 ">
        <div className="bg-amber-400 flex justify-center items-center w-9 h-9 border-1 rounded-sm">D</div>
     <h2 className="card-title ">{item.companyName}</h2>
    </div>
     
    
    <p className="mt-4 stat-title ml-1 text-[13px] font-bold text-gray-500">{item.solutionType}</p>
    <div className="card-actions justify-end">
      <button className="btn bg-[] shadow-sm" onClick={()=>ViewProfileFun(index,item)}>View Profile</button>
       </div>
    </div>

</div>

                          
               

          
                   
                ))
            )
        }
        </div>
    {
        Show&&Item&&I!==''&&(

     <div className="w-full max-w-lg mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">

                 
                    <div className="h-16 bg-amber-100"></div>

                    <div className="px-4 pb-4">
                      
                        <div className="-mt-5 mb-3">
                            <div className="w-11 h-11 rounded-full bg-amber-300 flex items-center justify-center font-medium text-amber-800 border-2 border-white">
                                {Item.companyName?.charAt(0)}                             </div>
                        </div>

                        <h2 className="font-medium text-gray-900">{Item.companyName}</h2>
                        <p className="text-[11px] text-gray-500 mt-1">{Item.solutionType} · {Item.address}</p>

                        <hr className="my-3 border-gray-100" />

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-gray-50 rounded-lg p-2">
                                <div className="text-lg font-medium">{Item.companySize ?? '—'}</div>
                                <div className="text-xs text-gray-400">employees</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                                <div className="text-lg font-medium">{new Date(Item.startedAt).getFullYear()}</div>
                                <div className="text-xs text-gray-400">Founded</div>
                            </div>
                            
                        </div>

                        <hr className="my-3 border-gray-100" />

                        {/* Contact */}
                        <p className="text-xs font-medium text-gray-700 mb-2">Contact</p>
                        <div className="text-xs text-gray-500 flex flex-col gap-1">
                            <span>{Item.email}</span>
                            <span>{Item.contactNumber}</span>
                        </div>

                        
                        <hr className="my-3 border-gray-100" />

                      
                        <div className="text-xs text-gray-500 flex flex-col gap-1">
                             <p className="text-xs font-medium text-gray-700 mb-2">Achievement</p>

                            <ul className="timeline timeline-vertical lg:timeline-horizontal ">
  <li>
    <div className="timeline-start">1984</div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">1998</div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">iMac</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2001</div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">iPod</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2007</div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">iPhone</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2015</div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">Apple Watch</div>
  </li>
</ul>
                           
                        </div>

                        <button
                            className="mt-4 w-full btn btn-sm"
                            onClick={() => SetShow(false)}
                        >
                            Back
                        </button>
                    </div>
                    </div>

 

            
        
    )
    }
       </div>
       


)

}
export default Companies;
  
