

function ProfileStats({user}){

    console.log(user)

    return(
      <div className="p-4 md:p-16 m-8 border rounded-lg">
        <dl className="grid grid-cols-3 gap-x-8 gap-y-8 text-center w-full">
            <div className="flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-gray-400">Following</dt>
              <dd className="order-first text-base font-semibold tracking-tight text-gray-300 sm:text-5xl">
              {user.follows.length}
              </dd>
            </div>
            <div className="flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-gray-400">Followers</dt>
              <dd className="order-first text-base font-semibold tracking-tight text-gray-300 sm:text-5xl">
                {user.followed_by.length}
              </dd>
            </div>
            <div className="flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-gray-400">Projects</dt>
              <dd className="order-first text-base font-semibold tracking-tight text-gray-300 sm:text-5xl">
                {user.code.length}
              </dd>
            </div>
        </dl>
      </div>
    )
}

export default ProfileStats