import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import Searchbar from "./Searchbar";
import supabase from "../supabase/supabase-client";
import "../components/css/header.css"; 
import SessionContext from "../context/SessionContext";
import Toast from "./Toast"; 

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [toast, setToast] = useState({ message: "", type: "" });

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setToast({ message: 'Error signing out! 😞', type: 'error' });
    } else {
      setToast({ message: 'Signed out successfully! 👋', type: 'success' });
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex justify-content-between align-items-center">
       
        <Link to="/" className="navbar-brand mt-2 me-5 text-white fs-3">
          bigUp
        </Link>

       
        <div className="d-flex align-items-center ms-auto">
          <button
            className="navbar-toggler me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

       
        <div className="collapse navbar-collapse mt-1 mb-4 mx-auto" id="navbarSupportedContent">
          <div className="ms-5">
            <Searchbar />
          </div>

         
          <div className="dropdown-my-menu bg-transparent">
            <button
              className="btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </button>

            <ul className="dropdown-menu bg-transparent dropdown-menu-end b-0 mt-0" aria-labelledby="dropdownMenuButton">
              {session ? (
                <>
                  <li className="dropdown-header text-white">
                    Hey {session?.user.user_metadata.username}
                  </li>
                  <li>
                    <Link to="/account" className=" ms-3 text-decoration-none  text-white">Account</Link>
                  </li>
                  <li>
                    <Link to="/profile" className=" ms-3 text-decoration-none text-white">Profile</Link>
                  </li>
                  <li>
                    <button onClick={signOut} className="dropdown-item">
                      LogOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="li-dropdown">
                    <Link to="/login" className="link-dropdown">
                      <button className="text-white btn-only-write" >
                        <span className="label">Login</span>
                      </button>
                    </Link>
                  </li>
                  <li className="li-dropdown">
                    <Link to="/register" className="link-dropdown">
                      <button className="btn-only-write text-white">
                        <span className="label">Register</span>
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

     
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </nav>
  );
}
