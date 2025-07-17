import api from "../provider";
import { useAuthContext } from "../provider/AuthContext";

const signup = async (username: string, password: string) => {
  const res = await api.post("/register", { username, password });
  return res.data;
};

const login = async (username: string, password: string) => {
  
  const res = await api.post("/login", { username, password });
  return res.data;
};

export const useAuth = () => {
  const { user, setUser } = useAuthContext();
  return { signup, login, user, setUser };
};
