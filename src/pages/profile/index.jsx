import { useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import "../../components/css/profile.css"; // Importa il CSS per la pagina del profilo

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorites } = useContext(FavoritesContext);
  const [toast, setToast] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFavorites(id);
      setToast('🎮 Gioco rimosso dai preferiti!');
      setRemovingId(null);
      setTimeout(() => setToast(null), 2000);
    }, 400); // Match duration of animation
  };

  return (
    <div className="favorites-container ">
      <h2 className="greeting">
        Hey {session?.user.user_metadata.first_name} <span className="emoji">👾</span>
      </h2>

      <details className="dropdown-fav">
        <summary className="dropdown-title-fav">⭐ Favoriti</summary>

        {favorites.length === 0 && (
          <p className="empty">Non ci sono favoriti al momento...</p>
        )}

        <ul className="favorites-list">
          {favorites.map((game) => (
            <li
              key={game.id}
              className={`favorite-item ${removingId === game.id ? "favorite-item-removing" : ""}`}
            >
              <div className="game-info">
                <img
                  className="game-thumb"
                  width={50}
                  height={50}
                  src={game.game_image}
                  alt={game.game_name}
                />
                <p className="game-name">{game.game_name}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemove(game.game_id)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </details>

      {toast && <div className="toast-fav">{toast}</div>}
    </div>
  );
}
