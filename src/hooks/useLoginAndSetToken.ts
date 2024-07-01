import useLogin from "@/graphql/hooks/user/useLogin";

import { useSetToken } from "@/context/TokenContext";

import type {
  LoginInput,
  LoginQuery,
  QueryLoginArgs,
} from "@/graphql/__generated__/graphql";
import type { LazyQueryHookOptions } from "@apollo/client";

const useLoginAndSetToken = (
  options?: LazyQueryHookOptions<LoginQuery, QueryLoginArgs>,
) => {
  const [login] = useLogin(options);
  const setToken = useSetToken();

  const loginFn = async (input: LoginInput) => {
    const data = await login({
      input,
    });

    if (data?.login.token) {
      setToken(data.login.token);
      return true;
    }
    return false;
  };

  return loginFn;
};

export default useLoginAndSetToken;
