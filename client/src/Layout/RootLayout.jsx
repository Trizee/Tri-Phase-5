import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function RootLayout(){

    let location = useLocation()
    return(
        <>
            <Navbar />
            <Outlet/>
            <Footer />
        </>
    )
}

export default RootLayout