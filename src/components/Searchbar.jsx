import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router'; 
import "../components/css/header.css";

export default function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Ottieni il percorso corrente
    const [searchTerm, setSearchTerm] = useState('');
    const [ariaInvalid, setAriaInvalid] = useState(false); 

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof searchTerm === 'string' && searchTerm.trim().length !== 0) {
            navigate(`/search?query=${searchTerm}`); 
            setSearchTerm('');
            setAriaInvalid(false); 
        } else {
            setAriaInvalid(true); 
        }
    };

    // Nascondi la SearchBar nelle pagine di login e registrazione
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-container">
                <button className="button-search" type="submit">
                    <FaSearch />
                </button>
                <input
                    className="search-input text-center"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-invalid={ariaInvalid}
                />
            </div>
        </form>
    );
}