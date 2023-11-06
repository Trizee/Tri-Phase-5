import EditorComponent from "./Editor"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"


function Drawer(){

    let room = useLoaderData()

    console.log(room)

    return(
        <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <EditorComponent />
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <h1 className="text-center text-2xl p-8 text-gray-200"><strong>CODEHESIVE</strong></h1>
            <div className="avatar w-full justify-center" onClick={()=>{}}>
                <div className="w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-500">
                    <img src={room.user.pic} />
                </div>
            </div>
            <li className="text-center font-bold pt-4 text-lg text-gray-200">{room.user.username}</li>

            <div className="mt-16 p-4">
                <li className="font-bold pt-4 text-base text-gray-300">Project Name</li>
                <p>{room.title}</p>
                <li className="font-bold pt-4 text-base text-gray-300">Description</li>
                <p>{room.description}</p>
            </div>

            <div className="mt-auto p-4 pb-12 flex">
                <div>
                <li className="font-bold pt-4 text-base text-gray-300">Version</li>
                <p>V.1.1.1.1.23</p>
                </div>
                <div className="mt-4 ml-auto">
                <button className="btn bg-gray-800 hover:bg-gray-700">Make a commit</button>
                </div>
            </div>

            </ul>
        </div>
        </div>
    )
}

export default Drawer