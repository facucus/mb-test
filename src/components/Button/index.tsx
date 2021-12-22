import styled from "styled-components";

interface ButtonProps {
  type?: string;
  variant?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const ButtonStyle = styled.button<ButtonProps>`
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  background-color: ${({ variant, theme, isDisabled }) =>
    isDisabled
      ? theme.button.disabledBg
      : variant === "primary"
      ? theme.button.primaryBg
      : variant === "link"
      ? "transparent"
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
  font-size: 16px;
  padding: ${({ variant }) => (variant === "link" ? "0" : "8px 16px")};

  &:hover {
    border-bottom: ${({ variant, theme }) =>
      variant === "link" && `1px solid ${theme.button.linkColor}`};
    border-radius: ${({ variant, theme }) =>
      variant === "link" ? "0px" : "10px"};
  }
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