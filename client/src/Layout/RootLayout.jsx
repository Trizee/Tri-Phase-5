import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function RootLayout({setUser}){

    let location = useLocation()
    return(
        <>
            <Navbar setUser={setUser}/>
            <Outlet/>
            <Footer />
        </>
    )
}

export default RootLayout