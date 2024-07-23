import { InputHTMLAttributes, forwardRef } from "react";

import styled from "styled-components";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <StyledTextarea rows={5} {...props} ref={ref} />;
  },
);

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray300.default};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary.default};
  }
`;

export default Textarea;
