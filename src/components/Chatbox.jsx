import { useContext, useState } from "react";
import supabase from "../supabase/supabase-client";
import RealtimeChat from "./RealtimeChat";
import SessionContext from "../context/SessionContext";
import "./css/chat.css"; 

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);
    const [isOpen, setIsOpen] = useState(false); 
    const [messages, setMessages] = useState([]); 

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));

        if (!session) {
            
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
            
            <button
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "Chiudi Chat" : "Apri Chat"}
            </button>

           
            {isOpen && (
                <div className="chat-container">
                   <h4 className="mt-3  live-chat-title">
                        <span className="live-icon"></span> LIVE CHAT
                    </h4>
                    <div className="chat-messages">
                       
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