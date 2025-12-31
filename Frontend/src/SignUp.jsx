import { useState } from 'react'

import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


 function SignUp() {
  
  
  
    const [UserData,SetUserData]=useState({
      FirstName:'',
      LastName:'',
      Email:'',
      Password:'',
      PhoneNumber:'',
      Role:''
    })
    const Navigate=useNavigate();

     async function SignUpBtn(){
       await fetch('http://localhost:5194/api/User/CreteUser',{
        method:'POST',
        headers:{
          'content-Type':'application/json',

        },
        body:JSON.stringify(UserData)
      }).then(Response=>{
        if(Response.ok){
          console.log('Created Successfully')
         Navigate('/mainPage')
        }
      })


    }


  return (

    < div className='SignUpContainer'>

      <div className='LeftSideContainer'>
        <h1>Hey Dawood</h1>
      </div>

  

<div className='Container'>

  <button class="google-btn">
  <i class="fa-brands fa-google"></i>
  Sign in with Google
</button>
<div style={{
  display:'flex',
  alignItems:'center',
  fontSize:'14px'
}}>
<div style={{
  flex:1,
  height:'1px',
  background:'#4a4e52'
}}></div>
<span style={{
  padding:'0 10px'
}}>Or</span>
<div
style={{
  flex:1,
  height:'1px',
  background:'#4a4e52'
}}
></div>
</div>


<div className='userNameContainer'>

  <div className="FirstNameCon">
   <label >FirstName</label>
<input placeholder='FirstName' onChange={(e)=> SetUserData({...UserData,FirstName:e.target.value}) } type="text" />
  </div>

<div className='LastNameCon'>
  <label>LastName</label>
<input placeholder='LastName' type="text" onChange={(e)=> SetUserData({...UserData,LastName:e.target.value})} />
</div>

</div>

<label>Email</label>
<input type="text" placeholder='Email' onChange={(e)=>SetUserData({...UserData,Email:e.target.value})}/>
<label>Password</label>
<input type="Password" placeholder='Password' onChange={(e)=>SetUserData({...UserData,Password:e.target.value})}/>
<label>PhoneNumber</label>
<input placeholder='PhoneNumber' type="text" onChange={(e)=>SetUserData({...UserData,PhoneNumber:e.target.value})} />
<label>Role</label>
<select name="" id="" onChange={(e)=>SetUserData({...UserData,Role:e.target.value})}>
  <option value="ITCompany">IT Company</option>
  <option value="EngineerCompany">Engineer Company</option>
</select>

   <button className='SigingBtn' onClick={SignUpBtn}>Sign Up</button>
   <div ><span>Already have an account?</span> <Link to="/SignIn">Sign In</Link></div>

</div>
</div>

    
     

  )
}

export default SignUp
