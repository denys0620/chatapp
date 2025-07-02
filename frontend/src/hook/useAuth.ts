import api from "../provider";

const signup = async (username: string, password: string) => {
  const res = await api.post("/register", { username, password });
  return res.data;
};

const login = async (username: string, password: string) => {
  
  const res = await api.post("/login", { username, password });
  return res.data;
};
export const useAuth = () => {
  return { signup, login };
};
