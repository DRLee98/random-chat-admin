import { useSetToken } from "@/context/TokenContext";

const useLogout = () => {
  const setToken = useSetToken();

  const logoutFn = () => {
    setToken(null);
  };

  return logoutFn;
};

export default useLogout;
