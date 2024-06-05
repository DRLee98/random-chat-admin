export const setToken = (token: string) => {
  return localStorage.setItem("random-chat-token", token);
};

export const getToken = () => {
  return localStorage.getItem("random-chat-token");
};

export const removeToken = () => {
  return localStorage.removeItem("random-chat-token");
};
