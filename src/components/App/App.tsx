import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';

const Body = styled.section`
  background-color: #202020;
`;

function App() {
  return (
    <Body>
      <Sidebar />
    </Body>
  );
}

export default App;
