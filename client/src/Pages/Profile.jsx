import ProfileStats from "./ProfileStats"

function ProfilePage({user}){
    
    return(
    <>
    <div className="grid grid-cols-7 h-screen bg-gray-900 p-0 m-0">
        <div className="col-span-7 m-0 p-0 md:col-span-3 md:m-6 md:p-4 bg-gray-950 rounded-xl">
        <h1 className="text-center text-2xl p-8 text-gray-200"><strong>YOUR PROFILE</strong></h1>
            <div className="avatar w-full justify-center" onClick={()=>{}}>
                <div className="w-40 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 ">
                    <img src={user.pic} />
                </div>
            </div>
            <h1 className="text-center font-bold pt-4 text-lg text-gray-200">{user.username}</h1>  
            {/* put stats here */}
            <ProfileStats user={user}/>
            <div className="mt-auto p-4 pb-12 flex m-4">
                <div>
                <p className="font-bold pt-4 text-base text-gray-300">Email</p>
                <p className="text-sm md:text-base">{user.email}</p>
                </div>
                <div className="mt-4 ml-auto">
                <button className="btn bg-gray-800 hover:bg-gray-900">edit info</button>
                </div>
            </div>
            </div>
        <div className="hidden col-span-4 md:block m-6 md:m-8 p-4 ">
            <div className=" h-1/3">
             <h1 className="text-2xl p-8 text-gray-200"><strong>Following</strong></h1>
                <div className="flex overflow-hidden">

                </div>
            </div>
            <div className="h-1/3">
                <h1 className="text-2xl p-8 text-gray-200"><strong>Follows</strong></h1>
                <div className="flex overflow-hidden">
                    <div className="w-32 m-8 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 ">
                        <img src={user.pic} />
                    </div>
                </div>
            </div>
            <div className="h-1/3">
                <h1 className="text-2xl p-8 text-gray-200"><strong>Projects</strong></h1>
            </div>
        </div>
    </div>
    </>
    )
}

export default ProfilePage