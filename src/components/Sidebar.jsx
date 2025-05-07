import { useState } from "react";
import { useLocation, matchPath } from "react-router";
import GenresDropdown from "./GenresDropdown";

import "../components/css/sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const hideGenresDropdown =
    location.pathname === "/account" ||
    location.pathname === "/login" ||
    location.pathname === "/register" || 
    location.pathname === "/profile" ||
    matchPath("/games/:slug/:id", location.pathname);

  

  return (
  <>

   
    {!hideGenresDropdown && ( <GenresDropdown />  )}
    
    
         
      
      
   </>
    
  );
}

