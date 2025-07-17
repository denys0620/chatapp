import React, {useState} from "react";
import { useAuth } from "../hook/useAuth";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login, signup, setUser} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = isLogin
        ? await login(username, password)
        : await signup(username, password);
      if (result.user)    setUser(result.user);
       else  setError(result.message);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-sm text-center text-blue-600 cursor-pointer mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "No account? Sign up here." : "Already have an account? Log in."}
        </p>
        <div className="mt-4">
          <a href="http://localhost:5000/auth/google" className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center">
            Sign in with Google
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;