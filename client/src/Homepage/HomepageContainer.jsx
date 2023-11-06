import { useState,useEffect } from "react"
import ProjectCard from "../Dash/ProjectCard"
import { toast } from "react-toastify";
import Collapse from "./ProjectCollapse";

function HomePage({user,set}){

    const [projects,setProjects] = useState([])
    const [search,setSearch] = useState('')
    const [showcase,setShowcase] = useState(false)
    const [following,setFollowing] = useState(false)

    // clothes useState setClothes([..clothes,data])
    // make a fetch for the code and display them in nice ui homescreen
    useEffect(()=>{
        fetch('/api/code')
        .then(response => response.json())
        .then(data => setProjects(data))
      },[])

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

    function copyProject(pro){
      fetch("/api/code",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: `${pro.title}-Copy`,
            description: `${pro.description} - Creator: ${pro.user.username}`,
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
          <div className="mx-auto mt-1 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300 text-center">Community</h1>
          </div>
        
        <div className="m-auto max-w-7xl mt-2 mb-2 shadow-xl rounded-lg bg-base-100">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Project Showcase</h1>
            

            <div className="form-control ml-auto mr-0 md:mr-6">
              <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} className="input input-bordered w-24 md:w-auto focus:bg-gray-900" />
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-2 h-8 w-8 hover:stroke-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <Collapse setCol={setShowcase} col={showcase}/>
        </div>
        <div className={showcase ? "hidden":"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6"}>
            {projectDisplay.map((project)=>(
              <ProjectCard key={project.id} project={project} leftFunc={copyProject} user={user} set={set} />
            ))}
        </div>
        </div>

              {/* Make this section for following */}

        <div className="m-auto max-w-7xl mt-2 mb-2 shadow-xl rounded-lg bg-base-100">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg shadow-xl flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Following</h1>
            
            <div className="form-control ml-auto mr-0 md:mr-6">
              <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} className="input input-bordered w-24 md:w-auto focus:bg-gray-900" />
            </div>
            {/* <Collapse set={null}/> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-8 w-8 hover:stroke-gray-200 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6">
            {/* {projectDisplay.map((project)=>(
              <ProjectCard key={project.id} project={project} leftFunc={copyProject} user={user} set={set} />
            ))} */}
        </div>
        </div>
        </div>
        </>
    )
}

export default HomePage