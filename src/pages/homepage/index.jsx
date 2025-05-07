import { useEffect, useState } from 'react';
import CardGame from '../../components/CardGame';
import "../../components/css/sidebar.css";

export default function HomePage() {
    const [games, setGames] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(
        'https://api.rawg.io/api/games?key=320e03e838db4408a2299c556af99cd1&page_size=40&ordering=-added'
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGames = async () => {
        if (!nextPageUrl || loading) return;

        setLoading(true);
        try {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
            setGames(prev => [...prev, ...data.results]);
            setNextPageUrl(data.next); // salva l'URL della prossima pagina
        } catch (err) {
            console.error('Errore nel caricamento giochi:', err);
            setError('Errore durante il caricamento dei giochi.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames(); // carica i primi giochi
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if (nearBottom && !loading) {
                fetchGames();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, nextPageUrl]);

    return (
        <div className="container bg-transparent mx-auto">
            <h1 className="text-center mb-5 fs-1 text-white">HOME</h1>

            {error && <div className="text-danger">{error}</div>}

            <div className="row">
                {games.map((game) => (
                    <div key={game.id} className="col-md-4 mb-4">
                        <CardGame game={game} />
                    </div>
                ))}
            </div>
            {loading && (
  <div className="d-flex justify-content-center">
    <div className="spinner-game"></div>
  </div>
)}
{!nextPageUrl && !loading && (
  <p className="text-center text-white mt-4">Hai raggiunto la fine ✨</p>
)}
        </div>
    );
}
