import EditBtn from "./EditBtn"

function ProfilePage({user}){
    
    return(
    <>
    <div className="bg-gray-800">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-32 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div className="grid m-16 p-4">
        <div className="avatar w-full justify-center" onClick={()=>{}}>
                <div className="w-f rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-300">
                    <img src={user.pic} />
                </div>
            </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Your Profile</h2>
  
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-white flex">USERNAME <EditBtn /></dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.username}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 ">
                <dt className="font-medium text-white flex">DESCRIPTION <EditBtn /></dt>
                <dd className="mt-2 font-semibold text-gray-200">{user.description}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 ">
                <dt className="font-medium text-white flex">EMAIL <EditBtn /></dt>
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
                <dd className="mt-2 font-semibold text-gray-200 hover:text-white"><button>Delete Permanently</button></dd>
              </div>
          </dl>
        </div>
      </div>
    </div>
    </>
    )
}

export default ProfilePage