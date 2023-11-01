import EditBtn from "./EditBtn"
import { useState } from "react"
import UploadWidget from "../Assets/UploadWidget"
import { useNavigate } from "react-router-dom"

function ProfilePage({user,setUser}){

    const navigate = useNavigate()

    const [pic,setPic] = useState(user.pic)
    const [bio,setBio] = useState('')
    const [editMode,setEditMode] = useState(true)

    console.log(bio)

    function deleteUser(){
        fetch(`/api/users/${user.id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
          .then(r => r.json())
          .then(data => data)
          setUser(null)
          navigate('/')
          navigate(0)
    }
    
    function patchBio(){
        fetch(`/api/users/${user.id}`,{
          
          Accept: "application/json",
          headers: {
            "Content-Type": "application/json",
          },
          method: 'PATCH',
    
          body: JSON.stringify({
            pic: pic,
            description: bio

          })
          })
          .then(r => r.json())
          .then(data => setUser(data))
          setEditMode(false)
        }

    return(
    <>
    <div className="bg-gray-800">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-32 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div className="grid m-16 p-4">
            <UploadWidget setPic={setPic} pic={pic}></UploadWidget>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Your Profile</h2>
  
          <dl className="mt-16 m-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-white flex">USERNAME</dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.username}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 ">
                <dt className="font-medium text-white flex">BIO{editMode?null:<EditBtn set={setEditMode}/>}</dt>
                <dd className="mt-2 font-semibold text-gray-200">{editMode?<textarea class="textarea-xs w-full" onChange={(e)=>{setBio(e.target.value)}} placeholder={bio}></textarea>: `${user.description}`}</dd>
                {editMode?<dd className="mt-2 font-semibold text-gray-200 hover:text-white flex"><p onClick={()=>{setEditMode(false)}}>Cancel</p><p className="ml-auto" onClick={()=>patchBio()}>Edit</p></dd>:null}
              </div>
              <div className="border-t border-gray-200 pt-4 ">
                <dt className="font-medium text-white flex">EMAIL</dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.email}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-white">FOLLOWERS</dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.follows.length} Followers</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-white">FOLLOWING</dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.followed_by.length} Following</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-white">DISABLE ACCOUNT</dt>
                <dd className="mt-2 font-semibold text-gray-500 hover:text-white">Delete Permanently</dd>
              </div>
          </dl>
        </div>
      </div>
    </div>
    </>
    )
}

export default ProfilePage