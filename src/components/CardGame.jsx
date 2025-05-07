
import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";
import "../components/css/card.css";

export default function CardGame({ game }) {
    const genres = game.genres.map((genre) => genre.name).join(', ');
    const { background_image: image } = game;

    return (
        <div className="card-game p-0">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <LazyLoadGameImage image={image} />
                
                <h2 className="fs-5">{game.name}</h2>
    
                <p className="release-date">{game.released || "Unknown release date"}</p>
    
                <div className="container-btn-morph">
                    <div className="container">
                        <div className="btn">
                            <Link to={`/games/${game.slug}/${game.id}`}>Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
}
