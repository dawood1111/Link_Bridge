import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignUp from './Pages/SignUp.jsx'
import SignIn from './Pages/SignIn.jsx'
import MainPage from './Pages/MainPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import {Link} from 'react-router-dom'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ImagesSwiperTest from './ImagesSwipe.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.jsx'
import LandingPage from './Pages/LandingPage.jsx'
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
path:'/ImagesSwiperTest',
element:<ImagesSwiperTest/>
}
,{
  path:'/LandingPage',
  element:<LandingPage/>
}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)
