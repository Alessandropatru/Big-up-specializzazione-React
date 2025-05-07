import { useParams } from "react-router";
import {FaWindows, FaHeart, FaPlaystation, FaXbox, FaAndroid, FaApple, FaLinux, FaGamepad , FaStar, FaStarHalf } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import Chatbox from "../../components/Chatbox";
import useFetchSolution from "../../hook/useFetchSolution";
import "../../components/css/gamepage.css";
import ToggleFavorite from "../../components/ToggleFavorite";

export default function GamePage() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=320e03e838db4408a2299c556af99cd1`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <>
            <section className="vh-100 mb-5 ">
                <div className="container mt-5">
                    <div className="row text-white">
                        {/* Colonna Sinistra */}
                        <div className="col-12 col-md-6 text-center ">
                            <p className="release-date">{data?.released}</p>
                            <h2 className="game-name glitch-text" data-text={data?.name}>{data?.name}</h2>
                            <p className="game-description ">About: {data?.description_raw}</p>
                        </div>
    
                        {/* Colonna Destra */}
                        <div className="col-12 col-md-6 text-center margin-section-img mt-5">
                            <div className="style-game-image">
                                <img
                                    src={data?.background_image}
                                    alt={data?.name}
                                    className="img-fluid rounded"
                                />
                            </div>
                            
    
                            {/* Sezione Piattaforme */}
                            <div className="platforms d-flex flex-wrap justify-content-center align-items-center mt-3 gap-2">
                                {data?.platforms?.map((platform) => {
                                    let icon;
                                    switch (true) {
                                        case platform.platform.name.toLowerCase().includes("pc"):
                                            icon = <FaWindows className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("playstation"):
                                            icon = <FaPlaystation className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("xbox"):
                                            icon = <FaXbox className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("android"):
                                            icon = <FaAndroid className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("nintendo"):
                                            icon = <SiNintendo className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("ios"):
                                            icon = <FaApple className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("linux"):
                                            icon = <FaLinux className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("wii u"):
                                            icon = <FaGamepad className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("ps vita"):
                                            icon = <FaPlaystation className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("3ds"):
                                            icon = <FaGamepad className="icon" />;
                                            break;
                                        case platform.platform.name.toLowerCase().includes("gameboy"):
                                            icon = <FaGamepad className="icon" />;
                                            break;
                                        default:
                                            icon = null;
                                    }
    
                                    return (
                                        <p key={platform.platform.id} className="m-1 mb-3 d-flex align-items-center gap-2">
                                            {icon}
                                            {platform.platform.name}
                                        </p>
                                    );
                                })}
                            </div>
    
                            <div className="custom-genres mb-4 d-flex flex-wrap justify-content-center align-items-center gap-4 mt-3">
                                {data?.genres?.map((genre) => (
                                    <div key={genre.id} className="genre-item">
                                    <button className="mural-btn">
                                       
                                    
                                        {genre.name}
                                    </button>
                                    </div>
                                ))}
                                </div>
                                <div className="style-chatbox">
                                    <Chatbox data={data && data} />
                                </div>



                            <div className="stars stelle d-flex justify-content-center align-items-center mt-4">
                                {Array.from({ length: 5 }, (_, index) => {
                                    if (index < Math.floor(data?.rating)) {
                                        return <FaStar key={index} className="fs-3 star" color="#ffc107" />;
                                    } else if (index < data?.rating) {
                                        return <FaStarHalf key={index} className="fs-3 star empty-star" color="#ffc107" />;
                                    } else {
                                        return <FaStar key={index} className="fs-3 star text-dark" color="#e4e5e9" />;
                                    }
                                })}
                                {data?.rating}
                                
                            </div>
                            <div>
                            <ToggleFavorite data={data}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
    
}
