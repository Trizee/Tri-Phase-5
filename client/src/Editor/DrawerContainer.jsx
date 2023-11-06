import EditorComponent from "./Editor"
import { useState } from "react"
import { useLoaderData,useNavigate } from "react-router-dom"


function Drawer(){

    let room = useLoaderData()
    const navigate = useNavigate()  
    const [version,setVersion] = useState(room.version[room.version.length - 1])

    const [html,setHtml] = useState('')
    const [css,setCss] = useState('')
    const [js,setJs] = useState('')

    console.log(version)
    

    function loadCode(){
        setHtml(version.html)
        setCss(version.css)
        setJs(version.js)
  }

    return(
        <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <EditorComponent room={room} version={version} html={html} setHtml={setHtml} css={css} setCss={setCss} js={js} setJs={setJs}/>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <h1 className="text-center text-2xl p-8 text-gray-200"><strong>CODEHESIVE</strong></h1>
            <div className="avatar w-full justify-center" onClick={()=>{}}>
                <div className="w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-500" onClick={()=>navigate(`/user/${room.user.id}`)}>
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

            <div className="mt-auto p-1">
    
                <li className="font-bold text-base text-gray-300">
                <select className="select primary w-auto">
                <option disabled >Version</option>
                <option>Create New Version</option>
                {room.version.map((option)=>(
                    <option key={option.id} value={option} onSelect={(e)=>setVersion(e.target.value)}>{option.id}</option>
                ))}
                </select>
                </li>
                
                
            </div>
                <button className="btn bg-gray-800 hover:bg-gray-700 m-1">commit</button>
                <button className="btn w-auto bg-gray-800 hover:bg-gray-700 m-1" onClick={()=>loadCode()}>Load Code</button>
            </ul>
        </div>
        </div>
    )
}

export default Drawer