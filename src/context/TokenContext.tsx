import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStorageToken, setStorageToken } from "@/utils/localStorage";

const TokenContenxt = createContext<
  [string | null, Dispatch<SetStateAction<string | null>>]
>([null, () => {}]);

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const tokenState = useState(getStorageToken());

  const findToken = () => {
    const token = getStorageToken();
    tokenState[1](token);
  };

  useEffect(() => {
    window.addEventListener("storage", findToken);
    return () => {
      window.removeEventListener("storage", findToken);
    };
  }, []);

  return (
    <TokenContenxt.Provider value={tokenState}>
      {children}
    </TokenContenxt.Provider>
  );
};

export const useGetToken = () => {
  const [token] = useContext(TokenContenxt);
  return token;
};

export const useSetToken = () => {
  const [_, setToken] = useContext(TokenContenxt);

  const setFn = (token: string) => {
    setStorageToken(token);
    setToken(token);
  };
  return setFn;
};

export default TokenProvider;
