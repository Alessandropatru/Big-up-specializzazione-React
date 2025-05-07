import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import "../../index.css";

export default function GenrePage() {
    const { genre } = useParams();
    const initialUrl = `https://api.rawg.io/api/games?key=320e03e838db4408a2299c556af99cd1&genres=${genre}&page=1`;

    const { data, loading, error } = useFetchSolution(initialUrl);

    console.log("Genre:", genre); 
    console.log("API Response:", data); 

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    const filteredGames = data?.results?.filter((game) =>
        game.genres.some((g) => g.slug === genre)
    );

    return (
        <>
         <h1 className="text-center text-white">Games in {genre} genre ...</h1>
        <div className="container mb-5 bg-transparent ">
                <div className="d-flex  flex-wrap justify-content-center align-items-center gap-3">
                 {filteredGames && filteredGames.map((game) => (
                     <CardGame   key={game.id} game={game} />
                 ))}
                </div>
            </div>
        </>
    );
}