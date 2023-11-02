function ProjectCard({project}){
    return(
        <>
        
        <div className="p-6 w-full avatar justify-center">
        <div className="h-40 w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-300">
            <img src={project.pic} />
        </div>
        </div>
        </>
    )
}

export default ProjectCard