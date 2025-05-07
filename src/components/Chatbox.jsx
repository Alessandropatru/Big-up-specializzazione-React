import { useContext, useState } from "react";
import supabase from "../supabase/supabase-client";
import RealtimeChat from "./RealtimeChat";
import SessionContext from "../context/SessionContext";
import "./css/chat.css"; // Importa il file CSS

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);
    const [isOpen, setIsOpen] = useState(false); // Stato per apertura/chiusura della chat
    const [messages, setMessages] = useState([]); // Stato per i messaggi locali

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));

        if (!session) {
            // Mostra un messaggio nella chat se l'utente non è loggato
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), content: "Loggati prima di chattare!", system: true },
            ]);
            return;
        }

        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert([
                    {
                        profile_id: session?.user.id,
                        profile_username: session?.user.user_metadata.username,
                        game_id: data.id,
                        content: message,
                    },
                ])
                .select();
            if (error) {
                console.log(error);
            } else {
                inputMessage.reset();
            }
        }
    };

    return (
        <div>
            {/* Pulsante per aprire/chiudere la chat */}
            <button
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "Chiudi Chat" : "Apri Chat"}
            </button>

            {/* Contenitore della chat */}
            {isOpen && (
                <div className="chat-container">
                   <h4 className="mt-3  live-chat-title">
                        <span className="live-icon"></span> LIVE CHAT
                    </h4>
                    <div className="chat-messages">
                        {/* Mostra i messaggi locali */}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={msg.system ? "system-message" : "user-message"}
                            >
                                {msg.content}
                            </div>
                        ))}
                        <RealtimeChat data={data && data} />
                    </div>
                    <form className="chat-form" onSubmit={handleMessageSubmit}>
                        <input
                            className="input-chat"
                            type="text"
                            name="message"
                            placeholder="Digita qui.."
                        />
                        <button type="submit">Invia</button>
                    </form>
                </div>
            )}
        </div>
    );
}