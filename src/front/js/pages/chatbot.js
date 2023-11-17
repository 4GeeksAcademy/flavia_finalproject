import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import "../../styles/chatbot.css";

const API_KEY = process.env.OPENAI_KEY;

export const ChatBot = () => {
    const { store, actions } = useContext(Context);
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([{
        message: "Hey there! I'm here to help with nutrition advice. Feel free to ask me anything :) Be Specific. Provide Context. Ask Step by Step.",
        sender: "ChatGPT"
    }]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = async () => {
        if (!inputMessage) return;
        const newMessage = {
            message: inputMessage,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage]
        setMessages(newMessages);
        setInputMessage('');
        setTyping(true);
        await processMessageToChatGPT(newMessages)
    }

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return {
                role: role,
                content: messageObject.message
            }
        })

        const systemMessage = {
            role: "system",
            content: "Explain concepts as a nutrition professional and only accept nutrition-related messages"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
            console.log(data.choices[0].message.content)
            setMessages([
                ...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }
            ]);
            setTyping(false)
        })

    }

    return (
        <>
            <div className="chat-container">
                <div className="messages">
                    {messages.map((message, index) => {
                        const messageClass = message.sender === "ChatGPT" ? "received" : "sent";
                        return (
                            <div key={index} className={`message ${messageClass}`}>
                                {message.sender === "ChatGPT" && (
                                    <img src="https://cdn-icons-png.flaticon.com/512/6660/6660254.png" alt="Avatar" className="avatar" />
                                )}
                                <p className="text">{message.message}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Message"
                    />
                    <button className="send-button" onClick={handleSend}>➤</button>
                </div>
            </div>
        </>
    );
}
