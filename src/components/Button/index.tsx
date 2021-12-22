import styled from "styled-components";

interface ButtonProps {
  type?: string;
  variant?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const ButtonStyle = styled.button<ButtonProps>`
  cursor: ${({ isDisabled }) => isDisabled ? "not-allowed" : "pointer"};
  background-color: ${({ variant, theme, isDisabled }) =>
    isDisabled
      ? theme.button.disabledBg
      : variant === "primary"
      ? theme.button.primaryBg
      : theme.button.secondaryBg};
  color: ${({ variant, theme, isDisabled }) =>
    isDisabled
      ? theme.button.disabledColor
      : variant === "primary"
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
  isDisabled,
  onClick,
}) => (
  <ButtonStyle isDisabled={isDisabled} variant={variant} onClick={onClick}>
    {children}
  </ButtonStyle>
);

export default Button;