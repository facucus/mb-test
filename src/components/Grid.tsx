import styled from "styled-components"

const GridStyles = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-rows: minmax(min-content, max-content);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  padding: 20px;
`;

const Grid:React.FunctionComponent = ({children}) => <GridStyles>{children}</GridStyles>

export default Grid