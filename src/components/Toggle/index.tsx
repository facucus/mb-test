import React from 'react'
import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.textSecondary};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }
`;

interface ToggleProps {
  themeToToggle: string;
  toggleTheme: any;
};

const Toggle: React.FunctionComponent<ToggleProps> = ({
  themeToToggle,
  toggleTheme,
}) => {
  return <Button onClick={toggleTheme}>Switch to {themeToToggle} Theme</Button>;
};
export default Toggle;