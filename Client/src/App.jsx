import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SocialHub from "./pages/SocialHub";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<LandingPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/social" element={<SocialHub />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
