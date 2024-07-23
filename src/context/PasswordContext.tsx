import usePasswordCheck from "@/graphql/hooks/auth/usePasswordCheck";
import { createContext, useContext, useState } from "react";
import { useGetToken } from "./TokenContext";

import styled from "styled-components";
import Input from "@/components/common/Input";

const PasswordContenxt = createContext<string | undefined>(undefined);

const PasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useGetToken();

  const [passwordCheck, { data, loading }] = usePasswordCheck();
  const [password, setPassword] = useState<string>();

  const onCheck = () => {
    if (!password || loading) return;

    passwordCheck({
      variables: {
        input: {
          password,
        },
      },
    });
  };

  return (
    <PasswordContenxt.Provider
      value={data?.passwordCheck.ok ? password : undefined}
    >
      {children}
      {token && !Boolean(data?.passwordCheck.ok) && (
        <Overlay>
          <Row>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ConfirmButton
              disabled={!Boolean(password) || loading}
              onClick={onCheck}
            >
              확인
            </ConfirmButton>
          </Row>
          {data?.passwordCheck.error && (
            <ErrorText>{data.passwordCheck.error}</ErrorText>
          )}
        </Overlay>
      )}
    </PasswordContenxt.Provider>
  );
};

export const useGetPassword = () => {
  return useContext(PasswordContenxt);
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  width: 50%;
  max-width: 300px;
`;

const ConfirmButton = styled.button`
  width: max-content;
  min-width: max-content;
  height: 100%;

  padding: 10px;

  border-radius: 10px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.gray300.default : theme.primary.default};
  color: ${({ theme }) => theme.bgColor};
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.red.default};
`;

export default PasswordProvider;
