import { useState } from "react"
import UploadWidget from "../Assets/UploadWidget"

function ProjectForm({projects,setProjects}){

    const [pic,setPic] = useState('https://www.atlassian.com/blog/wp-content/uploads/2022/01/d02ed553-f52c-43ec-b86e-c7dfec487ef9.png')
    const [title,setTitle] = useState('')
    const [des,setDes] = useState('')

    function handleSubmit(e){
      e.preventDefault()
      fetch("/api/code",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: title,
              description: des,
              pic: pic
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response error");
          }
          return response.json();
      })
      .then(data => {
      setProjects([...projects,data])
      setTitle('')
      setDes('')
      setPic('https://www.atlassian.com/blog/wp-content/uploads/2022/01/d02ed553-f52c-43ec-b86e-c7dfec487ef9.png')
      })
      .catch(error => {
          console.log("error", error.message);
      });
      
      }  

    return(
    <div className=" bg-base-100 rounded-md shadow-lg p-4 w-full md:p-16 mt-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">Create A New Project</h2>
          <p className="mt-2 text-lg leading-8 text-gray-200">
            Start today and host your own rooms to code collaberative code.
          </p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <UploadWidget pic={pic} setPic={setPic}/>
          </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-200">
                Project Name
              </label>
              <div className="">
                <input
                  onChange={(e)=>{setTitle(e.target.value)}}
                  type="text"
                  name="company"
                  id="company"
                  value={title}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-200">
                Description
              </label>
              <div className="mt-2.5">
                <textarea
                  onChange={(e)=>setDes(e.target.value)}
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  value={des}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-purple-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              POST
            </button>
          </div>
        </form>
      </div>    

    )
}

export default ProjectForm