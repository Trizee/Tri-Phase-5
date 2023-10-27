import { Outlet, useLocation } from 'react-router-dom';

function RootLayout(){

    let location = useLocation()
    return(
        <>

            <Outlet/>

        </>
    )
}

export default RootLayout