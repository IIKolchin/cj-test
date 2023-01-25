import {
  createRef, FormEvent, useEffect, useState,
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
import AddFolder from '../Modal/AddFolder';
import Modal from '../Modal/Modal';
import DeleteFolder from '../Modal/DeleteFolder';
import { findTitleById, findIndexById, findFirstIndex } from '../../utils';
import { TChildProps, TFoldersProps, TItemProps } from '../../services/types';

const Container = styled.ul`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Child = styled.ul<TChildProps>`
  padding: 0 0 0 14px;
  margin: 0;
  display: ${({ depth, active }) => (depth && active ? 'block' : 'none')};
`;

const Item = styled.li<TItemProps>`
  position: relative;
  z-index: 2;
  height: 26px;
  display: flex;
  align-items: center;
  background-color: ${({ active }) => (active ? '#2E2E2E' : '#252525')};
  border-right: ${({ active }) => (active ? '1px solid #FFB800' : '#252525')};
`;

const List = styled.div<TItemProps>`
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
  children, depth = 1, title, id,
}: TFoldersProps) {
  const [active, setActive] = useState(false);
  // const [active1, setActive1] = useState();
  const [activeFolder, setActiveFolder] = useState<any>();
  const [firstIndex, setFirstIndex] = useState<number>();
  const [secondIndex, setSecondIndex] = useState<number>();
  const [thirdIndex, setThirdIndex] = useState<number>();
  const [fourthIndex, setFourthIndex] = useState<number>();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [value, setValue] = useState('');

  const myRef = createRef<any>();
  const dispatch = useAppDispatch();
  const foldersArray = useSelector((state) => state.folders.folders);

  const deep = cloneDeep(foldersArray);
  const iD: string | null | undefined = !active ? id : null;
  const iDDel: string | null | undefined = active ? id : null;

  useEffect(() => {
  }, []);

  console.log(activeFolder);
  // React.MouseEvent<HTMLDivElement, MouseEvent>

  const onClick = (e: any) => {
    const copyActiveFolder = [e.currentTarget.getAttribute('id')];
    setActiveFolder([...copyActiveFolder][0]);
    setActive(!active);
    if (depth === 1) {
      localStorage.removeItem('firstIdx');

      const idxFirst = findFirstIndex(deep, iD!);
      setFirstIndex(idxFirst);
      localStorage.setItem('firstIdx', String(idxFirst));
    }
    if (depth === 2) {
      localStorage.removeItem('secondIdx');

      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = +findIndexById(deep, iD!)!;
      setSecondIndex(idxSecond);
      localStorage.setItem('secondIdx', String(idxSecond));
    }
    if (depth === 3) {
      localStorage.removeItem('thirdIdx');

      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = localStorage.getItem('secondIdx');
      setSecondIndex(+idxSecond!);

      const idxThird = +findIndexById(deep, iD!)!;
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

      const idxFourth = +findIndexById(deep, iD!)!;
      setFourthIndex(idxFourth);
      localStorage.setItem('fourthIdx', String(idxFourth));
    }
  };

  const newObj = {
    id: uuidv4(),
    title: value,
    children: [],
  };
  // console.log(value);

  const newArrAdd = () => {
    switch (depth) {
      case 1:
        deep[firstIndex!].children!.push(newObj);
        break;
      case 2:
        deep[firstIndex!].children![secondIndex!].children!.push(newObj);
        break;
      case 3:
        deep[firstIndex!].children![secondIndex!].children![
          thirdIndex!
        ].children!.push(newObj);
        break;
      default:
        break;
    }
    return deep;
  };

  const newArrDel = () => {
    switch (depth) {
      case 1:
        deep.splice(firstIndex!, 1);
        break;
      case 2:
        deep[firstIndex!].children!.splice(secondIndex!, 1);
        break;
      case 3:
        deep[firstIndex!].children![secondIndex!].children!.splice(
          thirdIndex!,
          1,
        );
        break;
      case 4:
        deep[firstIndex!].children![secondIndex!].children![
          thirdIndex!
        ].children!.splice(fourthIndex!, 1);
        break;
      default:
        break;
    }
    return deep;
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
      <Container>
        <Item active={active} ref={myRef}>
          <List active={active} />
          <Buttons active={active}>
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
          {/* )} */}
          <Wrapper onClick={onClick} id={id}>
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
          <Child depth={depth} active={active}>
            {children.map((item, index) => (
              <Folder key={index} depth={depth + 1} {...item} />
            ))}
          </Child>
        ) : null}
      </Container>

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
          <AddFolder
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
          <DeleteFolder
            onClickCancel={handleHide}
            onClickDelete={deleteFolderHandler}
            folderName={findTitleById(deep, iDDel!)!}
          />
        </Modal>
      )}
    </>
  );
}

export default Folder;
