import ProjectMockup from "./ProjectMockup"
import { useLocation } from "react-router-dom"

function ProjectCard({project, deleteProject}){

    const location = useLocation()

    return(
        <>

        
        
        <dialog id={project.id} className="modal">
        <div className="modal-box p-0 rounded-none m-0 w-9/12 max-w-3xl bg-base shadow-xl">
            <ProjectMockup project={project}/>
            <div className="flex m-2">
            {location.pathname === '/dash' ? <p className="hover:text-white hover:cursor-pointer p-2" onClick={()=>{deleteProject(project.id)}}>DELETE</p> : <p className="hover:text-white hover:cursor-pointer p-2">COPY</p> }
            {location.pathname === '/dash' ? <p className="ml-auto hover:text-white hover:cursor-pointer p-2">LAUNCH ROOM</p> : <p className="ml-auto hover:text-white hover:cursor-pointer p-2">VIEW</p>}
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>

        {/* Displaying */}
        <div className="p-6 avatar justify-center">
        <div className="h-40 w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-300" onClick={()=>document.getElementById(`${project.id}`).showModal()} >
            <img src={project.pic} />
            
        </div>
        </div>

        </>
    )
}

export default ProjectCard