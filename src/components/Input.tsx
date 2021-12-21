import { ChangeEvent } from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.inputBg};
  border: ${({ theme }) => theme.inputBorder};
  border-radius: 10px;
`;

interface InputProps {
  id: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  id,
  type = "text",
  placeholder = "Enter text",
  value,
  onChange,
}) => <InputStyle id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />;

export default Input;
