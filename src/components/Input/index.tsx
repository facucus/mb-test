import { ChangeEvent, useState } from 'react';
import styled from "styled-components";
interface InputProps {
  id: string;
  value: string;
  type: string;
  placeholder: string;
  dataTestid?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  margin-bottom: 15px;
`;

const InputStyle = styled.input`
  padding: 8px;
  background-color: ${({ theme }) => theme.inputBg};
  border: ${({ theme }) => theme.inputBorder};
  border-radius: 10px;
  width: 100%;
`;

const Error = styled.div`
  margin: 0px;
  font-size: 12px;
  margin-top: 5px;
  color: ${({theme}) => theme.error}
`

const Input: React.FunctionComponent<InputProps> = ({
  id,
  type = "text",
  placeholder = "Enter text",
  value,
  dataTestid = "input",
  error,
  onChange,
}) => {
  const [activeError, setActiveError] = useState(false)
  const showError = error && activeError;
  return (
    <Container>
      <InputStyle
        data-testid={dataTestid}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={() => setActiveError(true)}
        onChange={onChange}
      />
      {showError && <Error>* {error}</Error>}
    </Container>
  );
};

export default Input;
