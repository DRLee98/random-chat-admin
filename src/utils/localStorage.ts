export const setStorageToken = (token: string) => {
  return localStorage.setItem("random-chat-token", token);
};

export const getStorageToken = () => {
  return localStorage.getItem("random-chat-token");
};

export const removeStorageToken = () => {
  return localStorage.removeItem("random-chat-token");
};
