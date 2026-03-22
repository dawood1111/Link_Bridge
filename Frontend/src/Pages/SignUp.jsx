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
      FirstName:'',
      LastName:'',
      Email:'',
      Password:'',
      PhoneNumber:'',
      Role:''
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
                id='FirstName'
                name='FirstName'
                onChange={handleChange}
                 onBlur={handleBlur}
                value={values.FirstName}
                type="text" 
                className='w-[160px] shadow-md border-none pt-4 pb-4  h-5 rounded  bg-slate-200/60 border-1 border-amber-950'
              />
              <div>
                {touched.FirstName && errors.FirstName && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.FirstName}</p>}
              </div>
            </div>

            <div className='grid gap-2.5'>
              <label className='text-[11px] text-black font-semibold'>LastName</label>
              <input 
              id='LastName'
              name='LastName'
              value={values.LastName}
              onChange={handleChange}
              onBlur={handleBlur}
               type="text"  
              className='w-[160px]  shadow-md border-none pt-4 pb-4 h-5 rounde bg-slate-200/60 border-1 border-amber-950'
              />
              <div>
                {touched.LastName && errors.LastName && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.LastName}</p>}
              </div>
            </div>
          </div>

          {/* Email */}
          <label className='text-[11px] font-semibold text-black '>Email</label>
          <input 
             id='Email'
            type="text"
            name='Email' 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Email}
            className='w-[400px] bg-[#3a3e42] shadow-md border-none pl-2 pt-2 pb-2  rounded bg-slate-200/60 border-1 border-amber-950'
          />
          <div>
            {touched.Email && errors.Email && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.Email}</p>}
          </div>

          {/* Password */}
          <label className='text-[11px] font-semibold text-black'>Password</label>
          <input 
            type="password" 
            id='Password'
            name='Password'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Password}
            className='w-[400px] bg-[#3a3e42] shadow-md border-none pl-2 pt-2 pb-2  rounded  bg-slate-200/60 border-1 border-black'
          />
          <div>
            {touched.Password && errors.Password && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.Password}</p>}
          </div>

          <label className='text-[11px] font-semibold text-black'>PhoneNumber</label>
          <input 
          
            type="tel" 
            id='PhoneNumber'
            name='PhoneNumber'
            value={values.PhoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className='w-[400px]  shadow-md border-nonepl-2 pt-2 pb-2  rounded  bg-slate-200/60 '
          />
          <div>
            {touched.PhoneNumber && errors.PhoneNumber && <p className='text-red-600 text-[12px] font-[Poppins,sans-serif]  ml-1 mt-[-6px]'>{errors.PhoneNumber}</p>}
          </div>

    
          <label className='text-[11px] font-semibold text-black'>Role</label>
          <select 
            id='Role'
            name='Role'
            value={values.Role}
            onChange={handleChange}
            className='mb-5 py-1.5 px-0 rounded-md text-center border-none shadow-md text-xs bg-slate-200/60 border-1 border-amber-950'
          >
            <option value="user"> user</option>
            <option value="Construction">Contruction </option>
            <option value="IT">IT</option>
          </select>

     
          <button 
            className='bg-[#F97316] border-none py-1.5 px-1.5 rounded-lg text-[#3a3e42] font-semibold cursor-pointer ' 
            type='submit'
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