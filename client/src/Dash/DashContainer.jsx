import ProjectForm from "./ProjectForm"
import ProjectCard from "./ProjectCard"

function DashContainer(){
    return(
        <>
          <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-300">Dashboard</h1>
          </div>
        <main>
        <div className="m-auto max-w-7xl mt-2 h-screen">
        <div className="mx-auto mt-2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 rounded-lg bg-base-100 shadow-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-300 pb-4">Current ProJects</h1>
            <div className="flex justify-evenly w-full h-42 overflow-clip">
            <ProjectCard />
            <ProjectCard />
            </div>
        </div>
            {/* Your content */}
            <ProjectForm />
        </div>
        
       </main>
       
       </>
    )
}

export default DashContainer