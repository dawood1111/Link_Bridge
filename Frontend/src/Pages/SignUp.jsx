import { useEffect, useState } from 'react'
import { useNavigate, Link, Form } from 'react-router-dom';
import {FetchData} from '../Redux/Slices/UserSlice.jsx';
import images3 from '../Images/construction2.jpg';
import { useDispatch  } from 'react-redux';
import { useFormik } from 'formik';
import {SignUpSchema} from '../Schema/Schema.js';

function SignUp() {
    const Navigate = useNavigate();
  const Dispatch= useDispatch();
  async function onSubmit() {

    const DispatchData= await Dispatch(FetchData(values));
    if(FetchData.fulfilled.match(DispatchData)){  
      Navigate('/MainPage');
    }
    else{
      console.log("Sign Up failed");  
    }
  }

  const {handleChange,values,errors,handleSubmit,handleBlur,touched}=useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      phoneNumber:'',
      role:''
    },
    validationSchema:SignUpSchema,
    
    onSubmit,

  });




  return (
    <div className='flex justify-center items-center min-h-screen bg-[#dfe0df] font-[Poppins,sans-serif]'>
      <form className='flex h-[700px] w-260 shadow-lg rounded-sm mt-[20px]' onSubmit={handleSubmit}>
        
        {/* Left Side Container */}
        <div className=' flex justify-center items-center overflow-hidden'>
          <img src={images3} alt=""  className='o'/>
        </div>

        {/* Right Side Container */}
        <div className='grid gap-3 justify-center items-center pl-[90px] pr-[90px] pt-[40px] pb-[40px] bg-[#dfe0df] text-xs  rounded-tr-[10px] rounded-br-[10px] w-[500px] shadow-2xl'>
          
          {/* Google Sign In Button */}
          <button className="bg-[#F97316] border-none py-1.5 px-1.5 rounded-lg text-[#3a3e42] font-semibold cursor-pointer">
            <i className="fa-brands fa-google mr-1.5"></i>
            Sign in with Google
          </button>

          {/* Divider */}
          <div className='flex items-center text-sm'>
            <div className='flex-1 h-px bg-[#4a4e52]'></div>
            <span className='px-2.5 text-black'>Or</span>
            <div className='flex-1 h-px bg-[#4a4e52]'></div>
          </div>

          {/* Name Fields */}
          <div className='flex gap-[68px]'>
            <div className="grid gap-2.5">
              <label className='text-[11px] text-black font-semibold '>FirstName</label>
              <input 
                id='firstName'
                name='firstName'
                onChange={handleChange}
                 onBlur={handleBlur}
                value={values.firstName}
                type="text" 
                className='w-[160px] shadow-md border-none pt-4 pb-4  h-5 rounded  bg-slate-200/60 border-1 border-amber-950'
              />
              <div>
                {touched.firstName && errors.firstName && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.firstName}</p>}
              </div>
            </div>

            <div className='grid gap-2.5'>
              <label className='text-[11px] text-black font-semibold'>LastName</label>
              <input 
              id='lastName'
              name='lastName'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
               type="text"  
              className='w-[160px]  shadow-md border-none pt-4 pb-4 h-5 rounde bg-slate-200/60 border-1 border-amber-950'
              />
              <div>
                {touched.lastName && errors.lastName && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Email */}
          <label className='text-[11px] font-semibold text-black '>Email</label>
          <input 
             id='email'
            type="text"
            name='email' 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className='w-[400px] bg-[#3a3e42] shadow-md border-none pl-2 pt-2 pb-2  rounded bg-slate-200/60 border-1 border-amber-950'
          />
          <div>
            {touched.email && errors.email && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.email}</p>}
          </div>

          {/* Password */}
          <label className='text-[11px] font-semibold text-black'>Password</label>
          <input 
            type="password" 
            id='password'
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            className='w-[400px] bg-[#3a3e42] shadow-md border-none pl-2 pt-2 pb-2  rounded  bg-slate-200/60 border-1 border-black'
          />
          <div>
            {touched.password && errors.password && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.password}</p>}
          </div>

          <label className='text-[11px] font-semibold text-black'>PhoneNumber</label>
          <input 
          
            type="tel" 
            id='phoneNumber'
            name='phoneNumber'
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className='w-[400px]  shadow-md border-nonepl-2 pt-2 pb-2  rounded  bg-slate-200/60 '
          />
          <div>
            {touched.phoneNumber && errors.phoneNumber && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.phoneNumber}</p>}
          </div>

    
          <label className='text-[11px] font-semibold text-black'>Role</label>
          <select 
            id='role'
            name='role'
            value={values.role}
            onChange={handleChange}
            className='mb-5 py-1.5 px-0 rounded-md text-center border-none shadow-md text-xs bg-slate-200/60 border-1 border-amber-950'
          >
            <option value="User"> User</option>
            <option value="Company">Company </option>
           
          </select>

     
          <button 
            className='bg-[#F97316] border-none py-1.5 px-1.5 rounded-lg text-[#3a3e42] font-semibold cursor-pointer ' 
            type='submit'
            onClick={onSubmit}
          >
            Sign Up
          </button>

        
          <div className='text-xs flex gap-1.5 justify-center items-center  '>
            <span>Already have an account?</span> 
            <Link to="/SignIn" className='text-[#F97316] hover:underline  '>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp