import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignUp from './Pages/SignUp.jsx'
import SignIn from './Pages/SignIn.jsx'
import MainPage from './Pages/MainPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import {Link, Route, Router} from 'react-router-dom'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.jsx'
import LandingPage from './Pages/LandingPage.jsx'
import {Companies} from './Component/LandingPage/SearchBar.jsx'
import { Feed } from './Component/LandingPage/Feed.jsx'
import {TestPage} from './Pages/TestPage.jsx'


const router=createBrowserRouter([
{
  path:'/',
  element:<LandingPage/>,
  errorElement:<ErrorPage/>
},
{

  path:'/MainPage',  
  element:<MainPage/>,
  children:[
    
    {
      path:'Companies',
      element:<Companies/>
    }
    ,
{
     path:'Feed',
     element:<Feed/>
    },
  ]
},
{
  path:'/SignIn',
  element:<SignIn/>

},
{
  path:'/SignUp',
  element:<SignUp/>
},
{
  path:'/TestPage',
  element:<TestPage/>
}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)
