import styled from "styled-components";

interface ButtonProps {
  variant?: string;
  onClick: () => void;
}

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  background-color: ${({ variant, theme }) =>
    variant === "primary" ? theme.button.primaryBg : theme.button.secondaryBg};
  color: ${({ variant, theme }) =>
    variant === "primary"
      ? theme.button.primaryText
      : theme.button.secondaryText};
  border: ${({ variant, theme }) =>
    variant === "primary"
      ? theme.button.primaryBorder
      : theme.button.secondaryBorder};
  border-radius: 10px;
  padding: 8px 16px;
`;

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
}) => (
  <ButtonStyle variant={variant} onClick={onClick}>
    {children}
  </ButtonStyle>
);

export default Button;