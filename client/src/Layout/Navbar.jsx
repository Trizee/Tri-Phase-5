import { useNavigate } from "react-router-dom"
import LogoutPage from "../LoginSignup/Logout"

function Navbar({setUser,user}){

    const navigate = useNavigate()

    function handleLogout(){
        fetch("/api/logout",{
          method: 'DELETE'
        })
        setUser(null)
      }

    function logoutScreen(){
        document.getElementById('my_modal_3').showModal()
        handleLogout()
    }

    return(
    <div className="navbar bg-base-100 relative">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Homepage</a></li>
                {user?<li><a>Portfolio</a></li>:null}
                <li><a onClick={()=>{navigate('/about')}}>About</a></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center" onClick={()=>navigate('/')}>
            <a className="btn btn-ghost normal-case text-xl">CODEHESIVE
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7,22.45a3.88,3.88,0,1,1,3.87-3.87A3.88,3.88,0,0,1,7,22.45ZM7,16.2a2.38,2.38,0,1,0,2.37,2.38A2.39,2.39,0,0,0,7,16.2Z"/>
            <path d="M7,9.3a3.88,3.88,0,1,1,3.87-3.88A3.88,3.88,0,0,1,7,9.3ZM7,3.05A2.38,2.38,0,1,0,9.38,5.42,2.38,2.38,0,0,0,7,3.05Z"/>
            <path d="M17,16.45a3.88,3.88,0,1,1,3.88-3.87A3.87,3.87,0,0,1,17,16.45Zm0-6.25a2.38,2.38,0,1,0,2.38,2.38A2.38,2.38,0,0,0,17,10.2Z"/>
            <path d="M7,16.2a.74.74,0,0,1-.75-.75V8.55a.75.75,0,0,1,1.48-.19c0,.14,1,3.47,6.13,3.47a.75.75,0,0,1,0,1.5,8.21,8.21,0,0,1-6.11-2.19v4.31A.75.75,0,0,1,7,16.2Z"/></svg>
            </a>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src={user ? user.pic : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png'} />
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                {user ?
                <>
                <li>
                <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
                </li>
                <li><a>My Projects</a></li>
                <li><a onClick={logoutScreen}>Logout</a></li>
                </>:
                <>
                <li><a onClick={()=>navigate('/signup')}>Create Account</a></li>
                <li><a onClick={()=>navigate('/login')}>Login</a></li>
                </>
                }
                <LogoutPage />
            </ul>
            </div>
        </div>
        
    </div>
    )
}

export default Navbar