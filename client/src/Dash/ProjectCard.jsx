function ProjectCard(){
    return(
    
        <div className="p-6">
        <div className="h-40 w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-500">
            <img src='' />
            <span className="badge bg-gray-600">Project</span>
        </div>
        <div className="flex">
            <p>Launch</p> <p className="ml-auto">Delete</p>
        </div>
        </div>
    )
}

export default ProjectCard