import { useContext, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";
import "./css/togglefavorite.css";

export default function ToggleFavorite({ data }) {
    const { favorites, addFavorites, removeFavorites } = useContext(FavoritesContext);
    const wrapperRef = useRef(null);

    const isFavorite = () => favorites?.find((el) => +el.game_id === data?.id);

    const handleClick = (e) => {
        const isFav = isFavorite();
        const wrapper = wrapperRef.current;
        const button = wrapper?.querySelector("button");
    
        if (button) {
            // Bounce
            button.classList.add("bounce");
            setTimeout(() => button.classList.remove("bounce"), 300);
    
            // Ripple
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            const rect = button.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    
        if (isFav) {
            removeFavorites(data.id);
        } else {
            addFavorites(data);
            createParticles();
        }
    };

    const createParticles = () => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
    
        const colors = ["#ffb6c1", "#ff8fa3", "#ffc3d1", "#ffe0e9"];
        const shapes = ["circle", "square"];
    
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement("div");
            particle.className = "particles";
    
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
            particle.style.background = color;
            particle.style.borderRadius = shape === "circle" ? "50%" : "0%";
    
            particle.style.setProperty("--x", `${Math.random() * 120 - 60}px`);
            particle.style.setProperty("--y", `${Math.random() * 120 - 60}px`);
            wrapper.appendChild(particle);
    
            setTimeout(() => particle.remove(), 700);
        }
    };

    return (
        <div
            className={`toggle-favorite ${isFavorite() ? "active" : ""}`}
            ref={wrapperRef}
        >
            <button onClick={handleClick}>
    {isFavorite() ? <FaHeart className="fa-heart" /> : <FaRegHeart className="fa-heart-o" />}
</button>
        </div>
    );
}
