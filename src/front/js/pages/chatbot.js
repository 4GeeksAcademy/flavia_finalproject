import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY = process.env.OPENAI_KEY;

export const ChatBot = () => {
    const { store, actions } = useContext(Context);
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([{
        message: "Hello! I am ChatGPT",
        sender: "ChatGPT"
    }]);


    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage]
        setMessages(newMessages);
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
            content: "Explain all concepts like I am an adult"
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
            <div>
                <MainContainer>
                    <ChatContainer>
                        <MessageList scrollBehavior='smooth' typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {messages.map((message, index) => {
                                return <Message key={index} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder='Type message here' onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </>
    );
}
