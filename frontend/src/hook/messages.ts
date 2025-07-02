import api from "../provider";

export const fetchMessages = async () => {
  const res = await api.get("/messages");
  console.log(res.data);
  return res.data;
};