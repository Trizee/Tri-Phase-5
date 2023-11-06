import { useParams,useLoaderData } from "react-router-dom"


function RouteTest(){

    let user = useLoaderData()

    return(
        <h1>{user.username}</h1>
    )
}

export default RouteTest