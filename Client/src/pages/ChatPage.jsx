import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";


// ✅ Use your local IP
const socket = io("http://192.168.1.116:5000");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });
    return () => socket.off("online_users");
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // if (data.fromMe) return;
      setChat((prev) => [...prev, { ...data, fromMe: false }]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msgObj = { message, type: "text", fromMe: true, timestamp: Date.now() };
    socket.emit("send_message", msgObj);
    setChat((prev) => [...prev, msgObj]);
    setMessage("");
  };

  const sendImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = {
        type: "image",
        data: reader.result,
        fromMe: true,
        timestamp: Date.now(),
      };
      socket.emit("send_message", imageData);
      setChat((prev) => [...prev, imageData]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={() => setSelectedImage(null)}
      >
        <div className="relative">
          <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[90vh] rounded shadow-lg" />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 text-sm hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      </div>
    )}
    
    <div className="flex h-screen bg-[#f5f5f7] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 flex-shrink-0 shadow-lg">
      <h2 className="text-md font-semibold mb-2">Online Users: {onlineUsers.length}</h2>
        <ul className="mb-6 space-y-1">
          {onlineUsers.map((id) => (
            <li key={id} className="text-sm text-green-500">• User {id.slice(0, 6)}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Chat Rooms</h2>
        <ul className="space-y-2">
          <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">🌐 General</li>
          <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">👥 Friends</li>
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow">
          <h1 className="text-2xl font-bold text-gray-800">💬 ChatApp</h1>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            Logout
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-4 bg-[#f0f0f3]">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-4 py-3 rounded-xl shadow-sm ${
                c.fromMe
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-white text-gray-800"
              }`}
            >
            {c.type === "image" ? (
                  <img
                    src={c.data}
                    alt="shared"
                    className="rounded-lg max-w-[250px] max-h-[250px] object-cover cursor-pointer"
                    onClick={() => setSelectedImage(c.data)}
                  />
                ) : (
                  <div className="text-sm">{c.message}</div>
                )}

              <div className="text-[11px] text-gray-400 mt-1 text-right">
                {new Date(c.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t px-6 py-4 flex items-center gap-3 shadow">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Type your message..."
          />
          <label className="cursor-pointer bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition">
            Send Images
            <input
              type="file"
              accept="image/*"
              onChange={sendImage}
              className="hidden"
            />
          </label>
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
