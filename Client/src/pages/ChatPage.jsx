import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";

const socket = io({
  path: "/api/socketio",   // connect to backend via Vercel
});

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const bottomRef = useRef();

  // Scroll to bottom when a new message is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Receive messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, { ...data, fromMe: false }]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msgObj = { message, fromMe: true, timestamp: Date.now() };
    socket.emit("send_message", msgObj);
    setChat((prev) => [...prev, msgObj]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 flex-shrink-0 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Chat Rooms</h2>
        <ul>
          <li className="py-3 px-4 rounded hover:bg-gray-200 cursor-pointer">General</li>
          <li className="py-3 px-4 rounded hover:bg-gray-200 cursor-pointer">Friends</li>
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">ChatApp</h1>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
            Logout
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-6 space-y-4 bg-gray-100">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                c.fromMe ? "bg-blue-500 text-white self-end" : "bg-white text-gray-800 self-start"
              } shadow-md`}
            >
              <div className="text-sm">{c.message}</div>
              <div className="text-xs text-gray-400 mt-2 text-right">
                {new Date(c.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t px-6 py-4 flex items-center gap-4 shadow-md">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
