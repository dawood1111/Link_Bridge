import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignUp from './SignUp.jsx'
import SignIn from './SignIn.jsx'
import MainPage from './MainPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import {Link} from 'react-router-dom'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ImagesSwiperTest from './ImagesSwipe.jsx'
const router=createBrowserRouter([
{
  path:'/',
  element:<SignUp/>,
  errorElement:<ErrorPage/>
},
{
  path:'/MainPage',  
  element:<MainPage/>
},
{
  path:'/SignIn',
  element:<SignIn/>

},
{
path:'ImagesSwiperTest',
element:<ImagesSwiperTest/>
}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>

  </StrictMode>,
)
