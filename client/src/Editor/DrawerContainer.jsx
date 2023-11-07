import EditorComponent from "./Editor"
import { useState,useEffect } from "react"
import { useLoaderData,useNavigate } from "react-router-dom"
import { toast } from "react-toastify";


function Drawer({user}){

    let roomVar = useLoaderData()

    const navigate = useNavigate()  

    const [room ,setRoom] = useState(roomVar)
    const [version,setVersion] = useState(room.version[room.version.length - 1])

    const [html,setHtml] = useState('')
    const [css,setCss] = useState('')
    const [js,setJs] = useState('')
    const [verName,setVerName] = useState('')

    console.log(verName)

    useEffect(()=>{
        setTimeout(()=>{
            if(html === '' && css === '' && js ===''){
                setHtml(version.html)
                setCss(version.css)
                setJs(version.js)
            }
        },750)
    },[])

    function updateRoom(){
    fetch(`/api/code/${room.id}`)
      .then(response => response.json())
      .then(data => setRoom(data))
    }

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
    
    function loadCode(){
        setHtml(version.html)
        setCss(version.css)
        setJs(version.js)
  }


    function newVersion(){
      if(verName === ''){
        notifyE('Please Enter A Version Name')
      }
      else{
        fetch("/api/version",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: verName,
                html: html,
                css: css,
                js: js,
                code_id: room.id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error");
            }
            return response.json();
        })
        .then(data => {
            notifyS('Post Successful')
            updateRoom()
            setVerName('')
        })
        .catch(error => {
            console.log("error", error.message);
            notifyE('Opps Something Went Wrong')
        });
      }
    }

    const [dis,setDis] = useState(false)

    useEffect(()=>{
        if(user.id !== roomVar.user_id){
            setDis(true)
        }
    },[])

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

            <div className="mt-2 p-2">
                <li className="font-bold pt-4 text-base text-gray-300">Project Name</li>
                <p>{room.title}</p>
                <li className="font-bold pt-4 text-base text-gray-300">Description</li>
                <p>{room.description}</p>
            </div>

            <div className="mt-auto p-1">
                
                <li className="font-bold text-base text-gray-300">
                <select className="select primary w-auto" onChange={(e)=>setVersion(JSON.parse(e.target.value))} disabled={dis}>
                <option disabled >Version</option>
                {room.version.map((ver)=>(
                    <option key={ver.id} value={JSON.stringify(ver)} >{ver.name}</option>
                ))}
                </select>
                </li>
                <button className="btn bg-gray-800 hover:bg-gray-700 w-full mt-2" onClick={()=>loadCode()} disabled={dis}>Load Code</button>
                
            </div>
                <input type="text" placeholder="Enter Version Name" className="input w-full max-w-xs m-1" disabled={dis} onChange={(e)=>setVerName(e.target.value)}/>
                <button className="btn bg-gray-800 hover:bg-gray-700 m-1" onClick={()=>newVersion()} disabled={dis}>commit</button>
            </ul>
        </div>
        </div>
    )
}

export default Drawer