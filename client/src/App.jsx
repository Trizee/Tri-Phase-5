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
import FullScreenPreview from "./Homepage/FullScreenPreview";
import UserProfile from "./UserProfiles/UserProfile";



function App() {

  const [user,setUser] = useState(null)
  
  const [preview, setPreview] = useState([])

  useEffect(()=>{
    fetch('/api/check_session')
    .then(response => response.json())
    .then(data => {
      if (data.username){
        setUser(data)
      }}
      )
  },[])

  console.log(user)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout setUser={setUser} user={user} />}>
        <Route index element = {<Landing />}/>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/Signup' element={<Signup setUser={setUser}/>} />
        <Route path='/editor' element={<Drawer />} />
        <Route path='/dash' element={<DashContainer user={user}/>} />
        <Route path='/about' element={<About />} />
        <Route path="/home" element={<HomePage user={user} set={setPreview}/>} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser}/>} />
        <Route path="/preview" element={<FullScreenPreview preview={preview}/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route
         path="/user/:userID" 
         element = {<UserProfile set={setPreview} session={user}/>}
         loader={async ({ request,params }) => {
          return fetch(
            `/api/users/${params.userID}`,
            { signal: request.signal }
          );
        }}
        action={async ({ request }) => {
          return (await request.formData());
        }} />
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
