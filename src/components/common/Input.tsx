import { InputHTMLAttributes } from "react";

import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray300.default};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary.default};
  }
`;

export default Input;
