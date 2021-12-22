import styled from "styled-components";

interface LinkProps {
  onClick: () => void;
}

const LinkStyle = styled.button<LinkProps>`
  cursor: pointer;
  background: none;
  color: ${({ theme  }) => theme.button.linkColor};
  font-size: 16px;
  border: none;
  position: relative;
  top: 2px;

  &:hover {
    border-bottom: ${({ theme }) => `1px solid ${theme.button.linkColor}`};
  }
`;

const LinkButton: React.FunctionComponent<LinkProps> = ({
  children,
  onClick,
}) => {
  return (
    <LinkStyle onClick={onClick}>
      {children}
    </LinkStyle>
  );
};

export default LinkButton;
