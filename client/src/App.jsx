import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { useEffect, useState } from "react";

import RootLayout from "./Layout/RootLayout";
import './App.css'
import Landing from "./Pages/Landing";
import Login from "./LoginSignup/Login";
import Signup from "./LoginSignup/Signup";
import Drawer from "./Editor/DrawerContainer";
import About from "./Pages/About";
import PageNotFound from "./Pages/404";
import HomePage from "./Homepage/HomepageContainer";
import ProfilePage from "./Pages/Profile";
import DashContainer from "./Dash/DashContainer";

function App() {

  const [user,setUser] = useState(null)
  const [projects,setProjects] = useState([])

  useEffect(()=>{
    fetch('/api/check_session')
    .then(response => response.json())
    .then(data => {
      if (data.username){
        setUser(data)
        setProjects(data.code)
      }}
      )
  },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout setUser={setUser} user={user} />}>
        <Route index element = {<Landing />}/>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/Signup' element={<Signup setUser={setUser}/>} />
        <Route path='/editor' element={<Drawer />} />
        <Route path='/dash' element={<DashContainer user={user} projects={projects} setProjects={setProjects}/>} />
        <Route path='/about' element={<About />} />
        <Route path="/home" element={<HomePage setP={setProjects} p={projects}/>} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser}/>} />
        <Route path="*" element={<PageNotFound />} />
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
