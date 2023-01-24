/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import MovieIcon from '@mui/icons-material/Movie';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import cloneDeep from 'lodash/cloneDeep';
import { useAppDispatch, useSelector } from '../../store/store';
import { addFolder } from '../../features/folders/foldersSlice';
// import { TFolder } from '../../services/types';
// import Modal from '../Modal/Modal';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddFolder from '../Modal/AddFolder';
// import Portal from '../hoc/portal';
import Modal from '../Modal/Modal';
import DeleteFolder from '../Modal/DeleteFolder';
import { findTitleById, findIndexById, findFirstIndex } from '../utils';
import { TFolder } from '../../services/types';

type TFoldersProps = {
  children?: TFolder[];
  title?: string;
  id?: string;
  depth?: number;
};

const Container = styled.ul`
position: relative;
list-style: none;
margin: 0;
padding: 22px 0 0 14px;
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

const Buttons = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

function Folders({
  children, depth = 1, title, id,
}: TFoldersProps) {
  const [active, setActive] = useState(false);
  //   const [activeFolder, setActiveFolder] = useState({});
  const [firstIndex, setFirstIndex] = useState<number>();
  const [secondIndex, setSecondIndex] = useState<number>();
  const [thirdIndex, setThirdIndex] = useState<number>();
  const [fourthIndex, setFourthIndex] = useState<number>();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [value, setValue] = useState('');

  //   const style = { marginLeft: 1 };
  const childStyle = { display: depth && active ? 'block' : 'none' };
  const dispatch = useAppDispatch();
  const foldersArray = useSelector((state) => state.folders.folders);

  const deep = cloneDeep(foldersArray);
  const iD: string | null | undefined = !active ? id : null;
  const iDDel: string | null | undefined = active ? id : null;

  useEffect(() => {
    // setActiveFolder()
  });

  const onClick = (e: any) => {
    console.log(e.target.dataset.txt, e.target.dataset.space);
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

  // console.log(firstIndex);
  // console.log(secondIndex);
  // console.log(thirdIndex);
  // console.log(fourthIndex);
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
  console.log(id);

  console.log(iD);
  console.log(deep);

  const addFolderHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addFolder(newArrAdd()));
    setOpenModalAdd(false);
  };

  const deleteFolderHandler = () => {
    dispatch(addFolder(newArrDel()));
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
  // console.log(findTitleById(deep, iDDel));

  const Item = styled.li`
  height: 26px;
  background-color: ${active ? '#2E2E2E' : '#252525'};
    border-right: ${active ? '1px solid #FFB800' : '#252525'};
    display: flex;
    align-items: center;
  `;

  return (
    <>
      <Container>
        <Item>
          {active && (
          <Buttons>
            {depth < 4 && (
            <AddButton onClick={openModalAddFolder}>
              <AddBoxIcon
                sx={{
                  color: '#B7B7B7;', width: '16px', height: '16px', mr: 1,
                }}
              />
            </AddButton>
            )}
            <DeleteButton onClick={openModalDelete}>
              <DeleteIcon
                sx={{
                  color: '#B7B7B7;', width: '16px', height: '16px', mr: 2,
                }}
              />
            </DeleteButton>
          </Buttons>
          )}
          <Wrapper onClick={onClick}>
            {active ? (
              <ExpandMoreOutlinedIcon
                sx={{ color: '#B7B7B7', width: '14px', height: '16px' }}
              />
            ) : (
              <NavigateNextOutlinedIcon
                sx={{ color: '#B7B7B7', width: '14px', height: '16px' }}
              />
            )}
            <FolderIcon
              sx={{ color: '#FFEBB7', width: '16px', height: '16px' }}
            />
            <Title>{title}</Title>
          </Wrapper>
        </Item>
        {Array.isArray(children) ? (
          <ul style={childStyle}>
            {children.map((item, index) => (
              <Folders key={index} depth={depth + 1} {...item} />
            ))}
          </ul>
        ) : null}

      </Container>

      {openModalAdd && (
        <Modal
          heading="Add shot"
          img={(
            <AddBoxIcon
              sx={{
                color: '#B7B7B7;',
                width: '13px',
                height: '13px',
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

export default Folders;
