import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from "react-router-dom";

const UserChat = (props) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let socket;
    useEffect(() => {
        // Establish a WebSocket connection with the server
        socket = io('http://localhost:5000'); // Replace PORT with the actual port number

        // Event listener for receiving messages
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the WebSocket connection
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // Emit the message to the server
        socket.emit('chatMessage', { content: message });

        // Clear the input field after sending the message
        setMessage('');
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default UserChat;