import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-20 text-center"
      >
        <h1 className="text-6xl font-extrabold mb-4">ChatApp</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Real-time conversations, media sharing, and guest access—experience next-gen chatting with privacy and simplicity.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Continue as Guest
          </button>
        </div>
      </motion.header>

      {/* Features Section */}
      <section className="p-16 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Powerful Features for Seamless Communication
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-20 bg-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose ChatApp?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          With blazing-fast messaging powered by Socket.IO, easy-to-use interfaces, and secure user authentication, ChatApp is built to make online communication as smooth and engaging as possible.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} ChatApp. Built with ❤️ using MERN stack.
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Real-Time Messaging",
    desc: "Experience lightning-fast messaging with Socket.IO integration."
  },
  {
    title: "Secure Authentication",
    desc: "Sign up or login safely with encrypted credentials."
  },
  {
    title: "Guest Access",
    desc: "Try chatting instantly without creating an account."
  },
  {
    title: "Media Sharing",
    desc: "Send and receive images in your conversations easily."
  },
  {
    title: "User Online Status",
    desc: "See who is active and ready to chat in real-time."
  },
  {
    title: "Modern UI",
    desc: "Beautiful, responsive design inspired by Apple’s smooth transitions."
  }
];
