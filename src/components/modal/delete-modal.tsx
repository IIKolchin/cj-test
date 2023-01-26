import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

type TDeleteProps = {
  onClickCancel: () => void;
  onClickDelete: () => void;
  folderName: string;
};

const Text = styled.p`
  font-family: 'Roboto';
  margin: 20px 0 18px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #cecece;

  &:nth-of-type(2) {
    margin-top: 18px;
  }
`;

const Group = styled.div`
  display: flex;
  margin: 26px 0 14px 18px;
`;

const ButtonEsc = styled.button`
  all: unset;
  cursor: pointer;
  width: 199px;
  height: 25px;
  background: #3d3d3d;
  border-radius: 3px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #bfbfbf;
`;

const ButtonDel = styled(ButtonEsc)`
  margin-left: 7px;
  background: #ff005c;
  color: #353535;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bold = styled.span`
  font-weight: 700;
`;

function DeleteModal(props: TDeleteProps) {
  const { onClickCancel, onClickDelete, folderName } = props;
  return (
    <>
      <Text>
        `The sequence
        {' '}
        <Bold>{folderName}</Bold>
        {' '}
        and related objects will be
        permanently deleted and cannot be restored.`
      </Text>
      <Text>Are you sure you want to continue?</Text>
      <Group>
        <ButtonEsc onClick={onClickCancel}>Cancel</ButtonEsc>
        <ButtonDel onClick={onClickDelete}>
          <DeleteIcon
            sx={{
              color: '#353535',
              width: '15px',
              height: '15px',
              mr: 1,
            }}
          />
          Delete
        </ButtonDel>
      </Group>
    </>
  );
}

export default DeleteModal;
