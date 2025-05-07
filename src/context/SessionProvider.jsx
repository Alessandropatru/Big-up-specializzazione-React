import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Recupera la sessione attuale al caricamento della pagina
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getInitialSession();

    // Ascolta i cambiamenti di stato di autenticazione
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
