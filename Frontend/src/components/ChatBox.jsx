import React, { useState } from "react";
import { FaPlus, FaMicrophone, FaSmile, FaComments } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, look at this! 😊",
      sender: "Loky",
      time: "Today at 2:12 PM",
      avatar: "https://i.pravatar.cc/40",
    },
  ]);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Chatbox toggle

  const aiResponses = [
    "That's interesting! Tell me more. 🤖",
    "I'm here to help. What else do you need?",
    "That sounds great!",
    "I didn't understand that. Can you clarify?",
    "Wow, that's cool! 😊",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "You",
      time: "Just now",
      avatar: "https://i.pravatar.cc/41",
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setShowEmoji(false);

    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "Bot",
        time: "Just now",
        avatar: "https://i.pravatar.cc/42",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmoji(false);
  };

  return (
    <div className={`chat-wrapper ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <div className="chat-toggle" onClick={() => setIsOpen(true)}>
          <FaComments className="chat-icon" />
        </div>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <span># main-chat</span>
            <button className="close-button" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === "Bot" ? "bot" : "user"}`}>
                <img src={msg.avatar} alt="avatar" className="avatar" />
                <div>
                  <div className="message-info">
                    <span className="sender">{msg.sender}</span>
                    <span className="timestamp">{msg.time}</span>
                  </div>
                  <p className="message-text">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <FaPlus className="icon" />
            <input
              type="text"
              placeholder="Message #main-chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <FaSmile className="icon" onClick={() => setShowEmoji(!showEmoji)} />
            {showEmoji && (
              <div className="emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <FaMicrophone className="icon" />
            <button onClick={sendMessage} className="send-button">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
