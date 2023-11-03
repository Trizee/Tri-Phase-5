import EditBtn from "./EditBtn"
import { useState } from "react"
import UploadWidget from "../Assets/UploadWidget"
import { useNavigate } from "react-router-dom"

function ProfilePage({user,setUser}){

    const navigate = useNavigate()

    const [pic,setPic] = useState(user.pic)
    const [bio,setBio] = useState(user.description)
    const [editMode,setEditMode] = useState(false)

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
    
    function patch(){
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

    function cancelEdit(){
        setBio(user.description)
        setEditMode(false)
    }

    return(
    <>

    <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg text-gray-200 text-center">Confirm</h3>
        <p className="py-4 text-gray-300">Please confirm account deletion, changes will be permanent all repositories will be deleted</p>
        <div className="modal-action">
        <button className="btn mr-auto" onClick={()=>deleteUser()}>Comfirm</button>
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
        </form>
        </div>
    </div>
    </dialog>

    <div className="bg-gray-800 h-fit p-0 md:p-16">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-32 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div className="grid m-0 md:m-8">
            <UploadWidget setPic={setPic} pic={pic}></UploadWidget>
            
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-center text-white sm:text-4xl">PROFILE</h2>
  
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-white flex">USERNAME</dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.username}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 ">
                <dt className="font-medium text-white flex">BIO{editMode?null:<EditBtn set={setEditMode}/>}</dt>
                <dd className="mt-2 font-semibold text-gray-200">{editMode?<textarea class="textarea-xs w-full" onChange={(e)=>{setBio(e.target.value)}} placeholder={bio}></textarea>: `${user.description}`}</dd>
                {editMode?<dd className="mt-2 font-semibold text-gray-200 hover:text-white flex"><p onClick={()=>{cancelEdit(false)}}>Cancel</p></dd>:null}
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
                <dt className="font-medium text-white">OPTIONS</dt>
                <dd className="mt-2 font-semibold flex"><p className=" text-gray-400 hover:text-white flex" onClick={()=>document.getElementById('my_modal_1').showModal()}>DELELTE</p><p className="ml-auto text-gray-400 hover:text-white flex" onClick={()=>{patch()}} >SAVE</p></dd>
              </div>
          </dl>
        </div>
      </div>
    </div>
    </>
    )
}

export default ProfilePage