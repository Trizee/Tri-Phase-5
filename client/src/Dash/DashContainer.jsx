import ProjectForm from "./ProjectForm"
import ProjectCard from "./ProjectCard"
import { useState,useEffect } from "react"

function DashContainer({user}){

    const [projects,setProjects] = useState([])

    useEffect(()=>{
      setProjects(user.code)
    },[])

    function deleteProject(id){
      fetch(`/api/code/${id}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(data => data)
        const filtered = projects.filter(project => project.id !== id)
        setProjects(filtered)
    }

    return(
        <div className="h-full bg-purple-800 p-1">
          <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Dashboard</h1>
          </div>
        <main>
        <div className="m-auto max-w-7xl mt-2 mb-2 shadow-xl">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-300 pb-4">Your Projects</h1>
            <div className="flex justify-left mx-0 md:mx-12 h-42 overflow-auto">
            {projects.map((project)=>(
              <ProjectCard key={project.id} project={project} deleteProject={deleteProject}/>
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