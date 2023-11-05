import ProjectForm from "./ProjectForm"
import ProjectCard from "./ProjectCard"
import { toast } from "react-toastify";
import { useState } from "react";

function DashContainer({setProjects,projects,user}){

    const [search,setSearch] = useState('')

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


    console.log(user)
    return(
        <div className="h-full bg-purple-800 p-1">
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

            <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-8 w-8 hover:stroke-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div> 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-0 md:p-6 h">
            {projectDisplay.map((project)=>(
              <ProjectCard key={project.id} project={project} leftFunc={deleteProject} user={user} set={null}/>
            ))}
            </div>
            </div>
            {/* Your content */}
            <ProjectForm projects={projects} setProjects={setProjects}/>
        </div>
        
       </main>
       
       </div>
    )
}

export default DashContainer