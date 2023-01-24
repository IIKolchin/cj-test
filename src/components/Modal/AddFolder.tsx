import styled from 'styled-components';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { FormEvent } from 'react';

const Form = styled.form`
  background-color: #252525;
`;

const Label = styled.div`
  margin: 15px 0 10px 17px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #cecece;
`;

const Group = styled.div`
  display: flex;
`;

const Input = styled.input`
  margin: 0 0 11px 17px;
  box-sizing: border-box;
  background-color: #232323;
  border: 1px solid #333333;
  border-radius: 3px;
  width: 307px;
  height: 25px;
  color: #E2E2E2;
`;

const AddButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 93px;
  height: 25px;
  background: #00ffbe;
  border-radius: 3px;
  margin-left: 6px;
  display: flex;
  align-items: center;
`;

const ButtonText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #353535;
`;

type TAddProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  value: string;
  placeholder?: string;
  name?: string;
};

function AddFolder(props: TAddProps) {
  const {
    value, onChange, onSubmit, placeholder, name,
  } = props;

  return (
    <Form onSubmit={onSubmit}>
      <Label>Enter the name:</Label>
      <Group>
        <Input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        <AddButton>
          <AddBoxIcon
            sx={{
              color: '#353535',
              width: '13px',
              height: '13px',
              ml: 1,
              mr: 1,
            }}
          />
          <ButtonText>Add shot</ButtonText>
        </AddButton>
      </Group>
    </Form>
  );
}

export default AddFolder;
