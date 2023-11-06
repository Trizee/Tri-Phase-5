

function UserStats({user}){

    return(
    <div className="stats lg:stats-horizontal ml-auto p-2">
  
        <div className="stat">
            <div className="stat-title">EMAIL</div>
            <div className="stat-value">{user.email}</div>
        </div>
        
        <div className="stat">
            <div className="stat-title"> PROJECTS</div>
            <div className="stat-value">{user.code.length}</div>
        </div>

        <div className="stat">
            <div className="stat-title">FOLLOWING</div>
            <div className="stat-value">{user.follows.length}</div>
        </div>

        <div className="stat">
            <div className="stat-title">FOLLOWERS</div>
            <div className="stat-value">{user.followed_by.length}</div>
        </div>
        
    </div>
    )
}

export default UserStats