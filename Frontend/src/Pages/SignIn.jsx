import { use, useState } from 'react'
import { useEffect } from 'react';
import images2 from '../Images/construction2.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { FetchData } from '../Redux/Slices/SignInSlice.jsx'; 
import  { useFormik } from 'formik';
import {SignInSchema} from '../Schema/Schema.js';   


 function SignIn() {

    const Navigate=useNavigate();
    const Dispatch=useDispatch();
    
 

     async function onSubmit() {
       const DispatchData= await Dispatch(FetchData(values))
     if (FetchData.fulfilled.match(DispatchData)) {

      Navigate('/MainPage');

    } else {
      console.log("Sign In failed :", DispatchData.payload);
    }
    }
    const {handleChange,values,errors,handleSubmit}=useFormik({
      initialValues:{
        Email:'',
        Password:''
      },

      validationSchema:SignInSchema,

      onSubmit,

    });


  return (
      
    < div className='flex justify-center items-center min-h-screen bg-[#dfe0df] font-[Poppins,sans-serif]' >

      <form onSubmit={handleSubmit} className='flex h-[700px] w-270 shadow-lg rounded-sm mt-[20px]'>

   <div className=' flex justify-center items-center overflow-hidden'>
             <img src={images2} alt=""  className='o'/>
           </div>
<div className='flex flex-col gap-16 bg-[#dfe0df]  pr-[90px] pl-[90px] content-center justify-center   shadow-2xl' >

  <button className="bg-[#F97316] text-[#3a3e42] pl-2 pr-2  pt-1.5 pb-1.5 border-none shadow-2xl rounded-[18px] font-[Poppins,sans-serif] font-semibold text-[14px]">
     Sign in with Google
</button>
<div className='flex items-center justify-center text-[14px]'>
<div className='flex-1 h-px bg-gray-950' 
></div>
<span className='pr-2.5 pl-2.5 font-[Poppins,sans-serif] font-semibold '>OR</span>
<div className='flex-1 h-px bg-gray-950' 
></div>
</div>
<div className="flex flex-col gap-3" >
 <label className='ml-1.5 text-[13px] font-[Poppins,sans-serif] font-medium'>Email</label>
<input 
  id='Email' 
  type="text"
  value={values.Email} 
  name='Email'
  onChange={handleChange}
 className='placeholder:text-gray-500 bg-[#f0ece7]  w-91 pl-2  pt-1 pb-1 rounded-[2px] shadow-sm'/>
<div>
  {errors.Email && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif] ml-1 mt-[-6px]'>{errors.Email}</p>}
</div>

<label className='ml-1 text-[13px] font-[Poppins,sans-serif]  font-medium '>Password</label>
<input
 id='Password'
 type="Password" 
 name='Password'
 value={values.Password} 
 onChange={handleChange} 
 className='placeholder:text-gray-500  bg-[#f0ece7]  w-91 pl-2 pt-1 pb-1 rounded-[2px]  shadow-sm'/>

<div>
  {errors.Password && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif] ml-1 mt-[-6px]'>{errors.Password}</p>}  
</div>

<button  type='submit'  className='mx-auto w-50  bg-[#F97316] text-[#3a3e42] pl-1 pr-1  pt-1.5 pb-1.5 border-none 
mt-6 rounded-[18px] shadow-sm text-center align-middle font-[Poppins,sans-serif] font-semibold text-[14px] '>
  Sign In</button>
</div>
</div>
</form>

</div>   
  );
}

 
 

export default SignIn;
