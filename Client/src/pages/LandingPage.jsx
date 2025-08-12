import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import girlwithmessage from "../assets/girlwithmessage.jpg";
import chatting from "../assets/chatting.jpg";
import friends from "../assets/friends.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light text-primary font-sans">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="w-full max-w-3xl bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-12 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">ChatApp</h1>
          <p className="text-base md:text-lg text-white/90 mb-8">
            Jump in. Share memories. Stay in touch—no account required.
          </p>

          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-secondary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-secondary font-semibold px-6 py-2 rounded-lg hover:bg-light transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Guest & Social outside card */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => navigate("/chat")}
            className="bg-light text-primary font-medium px-6 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Continue as Guest
          </button>
          <button
            onClick={() => navigate("/social")}
            className="bg-light text-primary font-medium px-6 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Social Hub
          </button>
        </div>
      </motion.header>

      {/* Features Section */}
      <section className="px-6 py-16 bg-light">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-center mb-6 text-primary"
        >
          Features
        </motion.h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore the powerful features that make ChatApp the ultimate communication tool.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-2 text-secondary">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section with Swiper */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-6 py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              What makes it different?
            </h2>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              It offers a unique blend of speed, simplicity, and privacy,
              making it the ideal choice for all your communication needs.
              With its user-friendly interface, robust security features,
              and real-time messaging, it ensures a seamless chatting
              experience whether you're connecting with friends, family,
              or colleagues.
            </p>
          </div>

          {/* Auto-sliding Images */}
          <div>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="rounded-xl shadow-lg"
            >
              <SwiperSlide>
                <img
                  src={girlwithmessage}
                  alt="ChatApp feature"
                  className="w-full max-w-sm mx-auto rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={chatting}
                  alt="Chat conversations"
                  className="w-full max-w-sm mx-auto rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={friends}
                  alt="Friends on ChatApp"
                  className="w-full max-w-sm mx-auto rounded-xl"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-light p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ChatApp · Built using MERN 
      </footer>
    </div>
  );
}

const features = [
  { title: "Instant Chats", desc: "Enjoy instant messaging with real-time updates and notifications." },
  { title: "Secure Login", desc: "Your data is protected with our robust security measures." },
  { title: "No Signup Needed", desc: "Try ChatApp without creating an account with guest access." },
  { title: "Share Photos", desc: "Share photos, videos, and documents effortlessly with your contacts." },
  { title: "Who’s Online", desc: "See who’s online and available to chat in real-time." },
  { title: "Modern UI", desc: "Clean, responsive design with smooth transitions." },
];
