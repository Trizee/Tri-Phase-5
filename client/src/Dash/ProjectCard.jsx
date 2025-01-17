import ProjectMockup from "./ProjectMockup"
import { useLocation,useNavigate } from "react-router-dom"

function ProjectCard({project, leftFunc, user, set}){

    const location = useLocation()
    const navigate = useNavigate()

    
    function LeftButtonControl(){
        if (location.pathname === '/dash'){
            return <p className="hover:text-white hover:cursor-pointer p-2 btn bg-gray-800 text-gray-300 " onClick={()=>{leftFunc(project.id)}}>DELETE</p>
        } else if (user){
            return <p className="hover:text-white hover:cursor-pointer p-2 btn bg-gray-800 text-gray-300" onClick={()=>{leftFunc(project)}}>COPY</p>
        } else if (!user) {
            return null
        }
    }

    function preview(){
        set(project)
        navigate('/preview')
    }

    return(
        <>

        
        <dialog id={project.id} className="modal">
        <div className="modal-box p-0 rounded-none m-0 w-9/12 max-w-3xl bg-base shadow-xl">
            <ProjectMockup project={project}/>
            <div className="flex m-2 ">
            {LeftButtonControl()}
            {location.pathname === '/dash' ? <div className="join ml-auto">
            <button className="btn bg-gray-800 text-gray-300 hover:text-white" onClick={()=>navigate(`/room/${project.id}`)} >LAUNCH</button>
            </div> : <p onClick={()=>preview()} className="ml-auto hover:text-white hover:cursor-pointer p-2 btn bg-gray-800 text-gray-300">FULLSCREEN</p>}
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>

        {/* Displaying */}
        <div className="p-4 avatar justify-center tooltip" data-tip={project.title}>
        <div className="h-36 w-36 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-300" onClick={()=>document.getElementById(`${project.id}`).showModal()}>
            <img src={project.pic} />
            
        </div>
        </div>

        </>
    )
}

export default ProjectCard