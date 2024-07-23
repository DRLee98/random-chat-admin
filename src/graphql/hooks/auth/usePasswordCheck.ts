import { useLazyQuery } from "@apollo/client";
import { graphql } from "@/graphql/__generated__";

export const PASSWORD_CHECK = graphql(`
  query passwordCheck($input: PasswordCheckInput!) {
    passwordCheck(input: $input) {
      ok
      error
    }
  }
`);

const usePasswordCheck = () => {
  return useLazyQuery(PASSWORD_CHECK);
};

export default usePasswordCheck;
