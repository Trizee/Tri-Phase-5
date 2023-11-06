import { useNavigate } from "react-router-dom"

function UserCard({users}){

    
    const navigate = useNavigate()

    return(
        <div className="p-4 avatar justify-center tooltip" data-tip={users.username}>
        <div className="h-40 w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-300" onClick={()=>navigate(`/user/${users.id}`)}>
            <img src={users.pic} />
        </div>
        </div>
    )


}export default UserCard