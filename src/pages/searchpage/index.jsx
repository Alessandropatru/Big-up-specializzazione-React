import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import BackToTopButton from "../../components/BackToTop";
import "../../index.css"; 

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const initialUrl = `https://api.rawg.io/api/games?key=320e03e838db4408a2299c556af99cd1&search=${game}`;
    const { loading, data, error, setUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        setUrl(initialUrl);
    }, [initialUrl, setUrl]); 

    return (
        <>
        

       
        
            
                <div className="container  bg-transparent mx-auto">
                <div className="container mb-5">
                <h1 className="text-white">Risultati per "{game}"</h1>
                {loading && <h4 className="text-white">Loading...</h4>}
                {error && <h4  className="text-white">Error: {error}</h4>}
            </div>
                    <div className="row">
                    {data &&
                        data.results &&
                        data.results.map((game, index) => (
                            <div
                                key={game.id} className="col-md-4 mb-4"
                            
                            >
                                <CardGame game={game} />
                            </div>
                        ))}
                    </div>
                    <BackToTopButton/>

                </div>
           
        </>
    );
}