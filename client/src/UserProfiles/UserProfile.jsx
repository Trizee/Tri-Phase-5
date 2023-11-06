import { useLoaderData } from "react-router-dom"
import Collapse from "../Homepage/ProjectCollapse"
import ProjectCard from "../Dash/ProjectCard"
import { useState } from "react"
import UserStats from "./UserStats"
import { toast } from "react-toastify";

function UserProfile({set,session}){

    let user = useLoaderData()

    const [col,setCol] = useState(false)
    const [search,setSearch] = useState('')
    const projects = user.code

    const projectDisplay = projects.filter(project => {
        return project.title.toLowerCase().includes(search.toLowerCase())
    })

    function notifyE(string){
        toast.error(string, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    
      function notifyS(string){
        toast.success(string, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
  
    function test(pro){
        console.log(pro)
    }

      function copyProject(pro){
        fetch("/api/code",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: `${pro.title}-Copy`,
              description: `${pro.description} - Creator: ${user.username}`,
              pic: pro.pic
          })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error("Network response error");
              }
              return response.json();
          })
          .then(data => {
          notifyS('Copied To Your Dash')
          })
          .catch(error => {
              console.log("error", error.message);
              notifyE('Opps Something went wrong')
          });
      }

    return(
        <>
        <div className="min-h-screen bg-purple-800 p-1">
          <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">{user.username}</h1>
            <p className={user === session ? 'btn ml-auto btn-disabled': "btn ml-auto"}>Follow</p>
          </div>
        <main>
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex bg-base-100">
        <div className="avatar hidden md:block">
            <div className="w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1">
                <img src={user.pic} />
            </div>
        </div>
        <UserStats user={user}/>
        </div> 
        <div className="m-auto max-w-7xl mt-2 mb-2 shadow-xl">
        <div className="mx-auto mt-2 rounded-lg bg-base-100 shadow-xl">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">{user.username}'s Projects</h1>
            
            <div className="form-control ml-auto mr-0 md:mr-6">
              <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} className="input input-bordered w-24 md:w-auto focus:bg-gray-900" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-8 w-8 hover:stroke-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <Collapse setCol={setCol} col={col}/>
        </div> 
            <div className={col ? "hidden" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6"}>
            {projectDisplay.map((project)=>(
              <ProjectCard key={project.id} project={project} leftFunc={copyProject} user={session} set={set}/>
            ))}
            </div>
            </div>
            
        </div>
        
       </main>
       
       </div>
        </>
    )
}

export default UserProfile