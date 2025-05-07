import { Link } from 'react-router'; 
import { useState } from 'react';
import useFetchSolution from '../hook/useFetchSolution';
import "./css/genresdropdown.css"; 

export default function GenresDropdown() {
    const initialUrl = "https://api.rawg.io/api/genres?key=320e03e838db4408a2299c556af99cd1";
    const { data, loading, error } = useFetchSolution(initialUrl);
    const [isOpen, setIsOpen] = useState(false);  // Stato per gestire l'apertura/chiusura del dropdown


    const toggleDropdown = () => setIsOpen(!isOpen);  // Funzione per alternare lo stato di apertura

    if (loading) {
        return <div>Loading genres...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dropdown-generi">
  <button className="dropdown-toggle-generi" onClick={toggleDropdown}>
    Genres
  </button>
  {isOpen && (
    <ul className="dropdown-list-generi">
      {data && data.results.map((genre) => (
        <li key={genre.id}>
          <Link to={`/games/${genre.slug}`} className="dropdown-item-generi">
            {genre.name}
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
    );
}
