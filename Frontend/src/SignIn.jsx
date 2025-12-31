import { useState } from 'react'

import './SignIn.css'
import { useNavigate } from 'react-router-dom';


 function SignIn() {
  
    const [UserData,SetUserData]=useState({
     
      Email:'',
      Password:'',
      
    })
    const Navigate=useNavigate();

     async function SignInBtn(){
        try{
       await fetch('http://localhost:5194/api/User/Login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',

        },
        body:JSON.stringify(UserData)
      }).then(Response=>{
        if(Response.ok){
          console.log('Loged Successfully')
         Navigate('/mainPage')
        }
      })


    } catch(error){
        console.error('Error During Sign IN : ',error)
    }}


  return (

    < div className="flex flex-row bg-gray-200 justify-center h-[600px] mt-[5%] p-[10px]" >

      <div className='bg-yellow-900 mt-7 mb-7 mr-7  w-[500px] overflow-hidden rounded-[6px] '>
        <img src='src/Images/Wallpaper.jfif' className='object-cover w-full  h-full'/>
      </div>

  

<div className='flex flex-col gap-5 bg-amber-400 mt-7 mb-7 mr-7 pr-[130px] pl-[130px] content-center justify-center rounded-[6px]' >

  <button className="google-btn">
  <i class="fa-brands fa-google"></i>
  Sign in with Google
</button>
<div className='flex flex-row text-center justify-center text-1xl'>
<div className='flex-1 h-[1px] bg-gray-950' 
></div>
<span className='p-[10px] [0px] '>OR</span>
<div className='flex-1 h-[1px] bg-gray-950' 
></div>
</div>
<div className="flex flex-col gap-3" >
 <label className='ml-20 text-[13px]'>Email</label>
<input type="text" placeholder='Email' onChange={(e)=>SetUserData({...UserData,Email:e.target.value})}  className='placeholder:text-gray-500 bg-white mr-18 ml-18 p-[4px] [7px] rounded-[2px]'/>
<label className='ml-20 text-[13px]'>Password</label>
<input type="Password" placeholder='Password' onChange={(e)=>SetUserData({...UserData,Password:e.target.value})} className='placeholder:text-gray-500 bg-white mr-18 ml-18 p-[4px] [7px] rounded-[2px]'/>

</div>



<button  onClick={SignInBtn} className='bg-blue-600 text-white mr-40 ml-40 p-[6px] border-solid border-amber-800 border-1 rounded-[6px]' >Sign In</button>

</div>
</div>

    
     

  )
}

export default SignIn
