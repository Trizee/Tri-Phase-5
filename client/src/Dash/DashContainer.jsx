import ProjectForm from "./ProjectForm"
import ProjectCard from "./ProjectCard"
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Collapse from "../Homepage/ProjectCollapse";
import UserCard from "../UserProfiles/UserCards";

function DashContainer({user}){

    const [search,setSearch] = useState('')
    const [projects,setProjects] = useState([])
    // let followers = user.followed_by
    // let following = user.follows
    const [followers,setFollowers] = useState([])
    const [following,setFollowing] = useState([])

    console.log(followers)

    useEffect(()=>{
      fetch('/api/check_session')
      .then(response => response.json())
      .then(data => {
        if (data.username){
          setProjects(data.code)
          setFollowers(data.followed_by)
          setFollowing(data.follows)
          console.log(data)
        }}
        )
    },[])

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

    const projectDisplay = projects.filter(project => {
      return project.title.toLowerCase().includes(search.toLowerCase())
    })

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

    function deleteProject(id){
      fetch(`/api/code/${id}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(data => data)
        const filtered = projects.filter(project => project.id !== id)
        setProjects(filtered)
        notifyS('Successfully Deleted')
        .catch((error => {
          console.log("error", error.message);
          notifyE('Opps Something Went Wrong')
      }))
    }

    const [col,setCol] = useState(false)
    const [formCol,setFormCol] = useState(false)
    const [followCol,setFollowCol] = useState(false)
    const [followerCol,setFollowerCol] = useState(false)

    return(
        <div className="min-h-screen bg-purple-800 p-1">
          <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300 text-center">Dashboard</h1>
          </div>
        <main>
        <div className="m-auto max-w-7xl mt-2 mb-2 shadow-xl">
        <div className="mx-auto mt-2 rounded-lg bg-base-100 shadow-xl">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Your Projects</h1>
            
            <div className="form-control ml-auto mr-0 md:mr-6">
              <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} className="input input-bordered w-24 md:w-auto focus:bg-gray-900" />
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-2 h-8 w-8 hover:stroke-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <Collapse setCol={setCol} col={col}/>
        </div> 
            <div className={col ? "hidden" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6"}>
            {projectDisplay.map((project)=>(
              <ProjectCard key={project.id} project={project} leftFunc={deleteProject} user={user} set={null}/>
            ))}
            </div>
            </div>
            {/* Your content */}
            <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl bg-base-100">
            <div className="flex ">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Create A New Project</h1>
              <div className="ml-auto">
                <Collapse setCol={setFormCol} col={formCol}/>
              </div>
            </div>
            <div className={formCol ? "hidden" : "block"}>
            <ProjectForm projects={projects} setProjects={setProjects}/>
            </div>
        </div> 

            {/* Following list */}
  
            <div className="mx-auto mt-2 rounded-lg bg-base-100 shadow-xl">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex bg-base-100">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Following</h1>
            
            <div className="ml-auto">
            <Collapse setCol={setFollowCol} col={followCol}/>
            </div>
        </div> 
              
              {/* map folling here */}
              <div className={followCol ?"hidden" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6"}>

                {following.map((follower) => (<UserCard key={follower.id} users={follower.following}/>))}
              
              </div>

        </div>

        <div className="mx-auto mt-2 rounded-lg bg-base-100 shadow-xl">

              {/* Followers list */}

              <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex bg-base-100">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Followers</h1>
            
            <div className="ml-auto">
            <Collapse setCol={setFollowerCol} col={followerCol}/>
            </div>
        </div> 
              
              {/* map followers here here */}
              <div className={followerCol?"hidden":  "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6"}>

              {followers.map((follower) => (<UserCard key={follower.id} users={follower.follower}/>))}
              
              </div>

        </div>

        </div>
        
       </main>
       
       </div>
    )
}

export default DashContainer