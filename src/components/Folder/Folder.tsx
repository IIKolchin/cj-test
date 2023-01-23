import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import MovieIcon from '@mui/icons-material/Movie';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

interface IFolderProps {
  title: string;
  onClickHandler: any;
  addHandler: () => void;
  active: any;
  id: number;
}

function Folder(props: IFolderProps) {
  const {
    title, onClickHandler, active, id, addHandler,
  } = props;

  console.log(id);
  console.log(active);

  const Container = styled.li`
    display: flex;
    position: relative;
    background-color: ${active.includes(id) ? '#2E2E2E' : '#252525'};
    border-right: ${active.includes(id) ? '1px solid #FFB800' : '#252525'};
  `;

  const AddButton = styled.button`
    margin: 0;
    all: unset;
    cursor: pointer;
  `;
  const Title = styled.h3`
    margin: 0 0 0 8px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #cecece;
  `;

  const Buttons = styled.div`
    position: absolute;
    right: 0;
    z-index: 2;
  `;

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
  `;

  return (
    <Container id={String(id)}>
      <Wrapper onClick={onClickHandler}>
        <NavigateNextOutlinedIcon
          sx={{ color: '#B7B7B7', width: '14px', height: '16px' }}
        />
        <FolderIcon sx={{ color: '#FFEBB7', width: '16px', height: '16px' }} />
        <Title>{title}</Title>
      </Wrapper>
      {active.includes(id) && (
        <Buttons>
          <AddButton onClick={addHandler}>
            <AddBoxIcon
              sx={{ color: '#B7B7B7;', width: '16px', height: '16px' }}
            />
          </AddButton>
          <DeleteIcon
            sx={{ color: '#B7B7B7;', width: '16px', height: '16px' }}
          />
        </Buttons>
      )}
    </Container>
  );
}

export default Folder;
