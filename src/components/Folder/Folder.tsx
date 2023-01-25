import {
  FormEvent, useMemo, useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import cloneDeep from 'lodash/cloneDeep';
import { useAppDispatch, useSelector } from '../../store/store';
import { setFolders } from '../../features/folders/foldersSlice';
import AddModal from '../modal/add-modal';
import DeleteModal from '../modal/delete-modal';
import { findTitleById, findIndexById, findFirstIndex } from '../../utils';
import { TFolder } from '../../services/types';
import Modal from '../modal/modal';

type TFoldersProps = {
  children?: TFolder[];
  title?: string;
  id: string;
  depth?: number;
  currentFolderIndex: string;
  setCurrentFolderIndex: (newValue: string) => void;
};

interface TItemProps {
  active: boolean;
}

const List = styled.ul`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Child = styled.ul<TItemProps>`
  padding: 0 0 0 14px;
  margin: 0;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const Item = styled.li<TItemProps>`
  position: relative;
  height: 26px;
  display: flex;
  align-items: center;
  background-color: ${({ active }) => (active ? '#2E2E2E' : '#252525')};
  border-right: ${({ active }) => (active ? '1px solid #FFB800' : '#252525')};
`;

const WrapperItem = styled.div<TItemProps>`
  position: absolute;
  top: 0;
  left: -40px;
  background-color: #2e2e2e;
  width: 230px;
  height: 26px;
  z-index: -1;
  overflow: hidden;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const AddButton = styled.button`
  margin: 0;
  all: unset;
  cursor: pointer;
`;

const DeleteButton = styled(AddButton)``;

const Title = styled.h3`
  margin: 0 0 0 8px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #cecece;
`;

const Buttons = styled.div<TItemProps>`
  position: absolute;
  right: 0;
  z-index: 2;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

function Folder({
  children, depth = 1, title, id, currentFolderIndex, setCurrentFolderIndex,
}: TFoldersProps) {
  const [active, setActive] = useState(false);
  const [firstIndex, setFirstIndex] = useState<number>();
  const [secondIndex, setSecondIndex] = useState<number>();
  const [thirdIndex, setThirdIndex] = useState<number>();
  const [fourthIndex, setFourthIndex] = useState<number>();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();
  const foldersArray = useSelector((state) => state.folders.folders);
  const deepCopyArr = cloneDeep(foldersArray);

  const isSelected = useMemo(() => id === currentFolderIndex, [id, currentFolderIndex]);

  const onClick = () => {
    setActive(!active);
    if (depth === 1) {
      localStorage.removeItem('firstIdx');

      const idxFirst = findFirstIndex(deepCopyArr, id!);
      setFirstIndex(idxFirst);
      localStorage.setItem('firstIdx', String(idxFirst));
    }
    if (depth === 2) {
      localStorage.removeItem('secondIdx');

      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = +findIndexById(deepCopyArr, id!)!;
      setSecondIndex(idxSecond);
      localStorage.setItem('secondIdx', String(idxSecond));
    }
    if (depth === 3) {
      localStorage.removeItem('thirdIdx');

      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = localStorage.getItem('secondIdx');
      setSecondIndex(+idxSecond!);

      const idxThird = +findIndexById(deepCopyArr, id!)!;
      setThirdIndex(idxThird);
      localStorage.setItem('thirdIdx', String(idxThird));
    }
    if (depth === 4) {
      localStorage.removeItem('fourthIdx');

      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = localStorage.getItem('secondIdx');
      setSecondIndex(+idxSecond!);
      const idxThird = localStorage.getItem('thirdIdx');
      setThirdIndex(+idxThird!);

      const idxFourth = +findIndexById(deepCopyArr, id!)!;
      setFourthIndex(idxFourth);
      localStorage.setItem('fourthIdx', String(idxFourth));
    }
  };

  const newObj = {
    id: uuidv4(),
    title: value,
    children: [],
  };

  const newArrAdd = () => {
    switch (depth) {
      case 1:
        deepCopyArr[firstIndex!].children!.push(newObj);
        break;
      case 2:
        deepCopyArr[firstIndex!].children![secondIndex!].children!.push(newObj);
        break;
      case 3:
        deepCopyArr[firstIndex!].children![secondIndex!].children![
          thirdIndex!
        ].children!.push(newObj);
        break;
      default:
        break;
    }
    return deepCopyArr;
  };

  const newArrDel = () => {
    switch (depth) {
      case 1:
        deepCopyArr.splice(firstIndex!, 1);
        break;
      case 2:
        deepCopyArr[firstIndex!].children!.splice(secondIndex!, 1);
        break;
      case 3:
        deepCopyArr[firstIndex!].children![secondIndex!].children!.splice(
          thirdIndex!,
          1,
        );
        break;
      case 4:
        deepCopyArr[firstIndex!].children![secondIndex!].children![
          thirdIndex!
        ].children!.splice(fourthIndex!, 1);
        break;
      default:
        break;
    }
    return deepCopyArr;
  };

  const addFolderHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setFolders(newArrAdd()));
    setOpenModalAdd(false);
    setValue('');
  };

  const deleteFolderHandler = () => {
    dispatch(setFolders(newArrDel()));
    setOpenModalDel(false);
  };

  const handleHide = () => {
    setOpenModalAdd(false);
    setOpenModalDel(false);
  };

  const openModalAddFolder = () => {
    setOpenModalAdd(true);
  };

  const openModalDelete = () => {
    setOpenModalDel(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  };

  return (
    <>
      <List>
        <Item active={isSelected} onClick={() => setCurrentFolderIndex(id!)}>
          <WrapperItem active={active} />
          <Buttons active={isSelected}>
            {depth < 4 && (
            <AddButton onClick={openModalAddFolder}>
              <AddBoxIcon
                sx={{
                  color: '#B7B7B7',
                  width: '12px',
                  height: '12px',
                  mr: 1,
                }}
              />
            </AddButton>
            )}
            <DeleteButton onClick={openModalDelete}>
              <DeleteIcon
                sx={{
                  color: '#B7B7B7;',
                  width: '12px',
                  height: '12px',
                  mr: 2,
                }}
              />
            </DeleteButton>
          </Buttons>
          <Wrapper onClick={onClick}>
            {active ? (
              <ExpandMoreOutlinedIcon
                sx={{
                  color: '#B7B7B7',
                  width: '14px',
                  height: '16px',
                  marginLeft: '14px',
                }}
              />
            ) : (
              <NavigateNextOutlinedIcon
                sx={{
                  color: '#B7B7B7',
                  width: '14px',
                  height: '16px',
                  marginLeft: '14px',
                }}
              />
            )}
            <FolderIcon
              sx={{ color: '#FFEBB7', width: '16px', height: '16px' }}
            />
            <Title>{title}</Title>
          </Wrapper>
        </Item>

        {Array.isArray(children) ? (
          <Child active={active}>
            {children.map((item) => (
              <Folder
                key={item.id}
                depth={depth + 1}
                {...item}
                currentFolderIndex={currentFolderIndex!}
                setCurrentFolderIndex={setCurrentFolderIndex}
              />
            ))}
          </Child>
        ) : null}
      </List>

      {openModalAdd && (
        <Modal
          heading="Add shot"
          img={(
            <AddBoxIcon
              sx={{
                color: '#B7B7B7;',
                width: '12px',
                height: '12px',
              }}
            />
          )}
          handleHide={handleHide}
        >
          <AddModal
            onChange={onChange}
            onSubmit={addFolderHandler}
            value={value}
          />
        </Modal>
      )}
      {openModalDel && (
        <Modal
          heading="Delete sequence"
          img={(
            <DeleteIcon
              sx={{
                color: '#B7B7B7;',
                width: '13px',
                height: '13px',
              }}
            />
          )}
          handleHide={handleHide}
        >
          <DeleteModal
            onClickCancel={handleHide}
            onClickDelete={deleteFolderHandler}
            folderName={findTitleById(deepCopyArr, id!)!}
          />
        </Modal>
      )}
    </>
  );
}

export default Folder;
