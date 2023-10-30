import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { useEffect, useState } from "react";

import RootLayout from "./Layout/RootLayout";
import './App.css'
import Landing from "./LoginSignup/Landing";
import Login from "./LoginSignup/Login";
import Signup from "./LoginSignup/Signup";
import Drawer from "./Editor/DrawerContainer";

function App() {

  const [user,setUser] = useState(null)

  useEffect(()=>{
    fetch('/api/check_session')
    .then(response => response.json())
    .then(data => {
      if (data.username){
        setUser(data)
      }}
      )
  },[])

  function handleLogout(){
    fetch("/api/logout",{
      method: 'DELETE'
    })
    setUser(null)
  }

  console.log(user)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout setUser={setUser}/>}>
        <Route index element = {<Landing />}/>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/editor' element={<Drawer />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
