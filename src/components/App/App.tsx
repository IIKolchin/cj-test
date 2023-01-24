import styled from 'styled-components';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../Sidebar/Sidebar';
// import AddFolder from '../Modal/AddFolder';
// import Portal from '../hoc/portal';
// import Modal from '../Modal/Modal';
// import DeleteFolder from '../Modal/DeleteFolder';

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
