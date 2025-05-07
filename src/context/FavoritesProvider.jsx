import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        if (!session?.user?.id) return; 
        let { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session.user.id);
        if (error) {
            console.error("Errore nel recupero dei preferiti:", error);
        } else {
            setFavorites(favourites);
        }
    }, [session]);

    const addFavorites = async (game) => {
        try {
            const { error } = await supabase
                .from("favorites")
                .insert([
                    {
                        user_id: session?.user.id,
                        game_id: game.id,
                        game_name: game.name,
                        game_image: game.background_image,
                    },
                ])
                .select();
            if (error) throw error;
            getFavorites(); // Aggiorna i preferiti dopo l'inserimento
        } catch (error) {
            console.error("Errore nell'aggiunta ai preferiti:", error);
        }
    };

    const removeFavorites = async (gameId) => {
        try {
            const { error } = await supabase
                .from("favorites")
                .delete()
                .eq("game_id", gameId)
                .eq("user_id", session?.user.id);
            if (error) throw error;
            getFavorites(); // Aggiorna i preferiti dopo la rimozione
        } catch (error) {
            console.error("Errore nella rimozione dai preferiti:", error);
        }
    };

    useEffect(() => {
        if (session) {
            getFavorites();
        }

        const favoritesChannel = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => getFavorites()
            )
            .subscribe();

        return () => {
            if (favoritesChannel) {
                supabase.removeChannel(favoritesChannel);
            }
        };
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                setFavorites,
                addFavorites,
                removeFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}