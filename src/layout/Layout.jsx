import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Serchbar from '../components/Searchbar';
import Navbar from '../components/Navbar';
import '../index.css';
export default function Layout() {
    return (
        <div className="style-layout-system bg-custom-total">
            

           <Navbar/>
            

            <div className="style-main-content ">
                <div className="style-sidebar">
                    <Sidebar/>
                 </div>
                <Outlet />
            </div>
            
            <Footer />
        </div>
    );
}
