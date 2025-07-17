import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";
import { useAuth } from "./hook/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/chat" /> : <AuthPage />} />
      <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/" />} />
      <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
    </Routes>
  );
}

export default App;

