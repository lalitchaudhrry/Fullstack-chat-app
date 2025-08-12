import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ✅ Use your local IP
const socket = io("http://192.168.1.116:5000");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    socket.on("online_users", (users) => setOnlineUsers(users));
    return () => socket.off("online_users");
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, { ...data, fromMe: false }]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msgObj = { message, type: "text", fromMe: true };
    socket.emit("send_message", msgObj);
    setChat((prev) => [...prev, msgObj]);
    setMessage("");
  };

  const sendImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = { type: "image", data: reader.result, fromMe: true };
      socket.emit("send_message", imageData);
      setChat((prev) => [...prev, imageData]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Fullscreen Image Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Size"
            className="max-w-full max-h-[90vh] rounded-xl shadow-lg"
          />
        </div>
      )}

      <div className="flex h-screen bg-light font-sans">
        {/* Sidebar */}
        <div className="w-64 p-6 flex-shrink-0">
          <h1 className="text-xl font-extrabold mb-6 text-primary">💬 ChatApp</h1>

          <h2 className="text-sm font-semibold mb-2 text-secondary">
            Online Users ({onlineUsers.length})
          </h2>
          <ul className="mb-6 space-y-1 text-sm">
            {onlineUsers.map((id) => (
              <li key={id} className="text-primary">
                • User {id.slice(0, 6)}
              </li>
            ))}
          </ul>

          <h2 className="text-sm font-semibold mb-2 text-secondary">Chat Rooms</h2>
          <ul className="space-y-2">
            <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">
              🌐 General
            </li>
            <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">
              👥 Friends
            </li>
          </ul>

          <div className="mt-6">
            <Link
              to="/social"
              className="block py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer text-primary"
            >
              👥 Social Hub
            </Link>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between shadow-sm bg-light border-b border-gray-200/40">
            <h1 className="text-lg font-bold text-primary">Chat Room</h1>
            <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-accent transition">
              Logout
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm ${
                  c.fromMe
                    ? "ml-auto bg-secondary text-white"
                    : "mr-auto bg-white text-primary"
                }`}
              >
                {c.type === "image" ? (
                  <img
                    src={c.data}
                    alt="shared"
                    className="rounded-lg max-w-[200px] max-h-[200px] object-cover cursor-pointer"
                    onClick={() => setSelectedImage(c.data)}
                  />
                ) : (
                  <div className="text-sm">{c.message}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-3 flex items-center gap-3 bg-light border-t border-gray-200/40">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Type a message..."
            />
            <label className="cursor-pointer bg-gray-100 px-3 py-2 rounded-full hover:bg-secondary hover:text-white transition">
              📎
              <input
                type="file"
                accept="image/*"
                onChange={sendImage}
                className="hidden"
              />
            </label>
            <button
              onClick={sendMessage}
              className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-accent transition"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
