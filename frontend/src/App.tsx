import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const [user, setUser] = useState<{ username: string; id: string } | null>(null);

  return (
    <div>
      {user ? (
        <ChatPage user = {user}/>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </div>
  );
}

export default App;

