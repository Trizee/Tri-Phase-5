import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function RootLayout({setUser,user}){

    let location = useLocation()
    
    return(
        <>
            <Navbar setUser={setUser} user={user}/>
            <Outlet/>
            <Footer />
        </>
    )
}

export default RootLayout