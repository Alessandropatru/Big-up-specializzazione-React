import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "../components/css/card.css"

export default function LazyLoadGameImage({ image }) {
    return (
        <LazyLoadImage
        className="game-image"
            alt="game image"
            effect="blur"
            wrapperProps={{
                style: { transitionDelay: "0.5s" },
            }}
            src={image}
        />
    );
}
