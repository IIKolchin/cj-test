/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import MovieIcon from '@mui/icons-material/Movie';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import cloneDeep from 'lodash/cloneDeep';
import { useAppDispatch, useSelector } from '../../store/store';
import { addFolder } from '../../features/folders/foldersSlice';
import { TFolder } from '../../services/types';

const Container = styled.li`
  position: relative;
  list-style: none;
`;

const AddButton = styled.button`
  margin: 0;
  all: unset;
  cursor: pointer;
`;

const DeleteButton = styled(AddButton)`
    
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

function RecursiveComponent({
  children, depth = 1, title, id,
}: any) {
  const [active, setActive] = useState(false);
  const [firstIndex, setFirstIndex] = useState<number>();
  const [secondIndex, setSecondIndex] = useState<number>();
  const [thirdIndex, setThirdIndex] = useState<number>();
  const style = { marginLeft: 1 };
  const childStyle = { display: depth && active ? 'block' : 'none' };
  const dispatch = useAppDispatch();
  const foldersArray = useSelector((state) => state.folders.folders);

  const deep = cloneDeep(foldersArray);
  const iD: string = !active ? id : null;
  //   const iDDel: string = active ? id : null;

  function findByIndexRecursive(array: TFolder[], idObj: string) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];

      if (element.id === idObj) {
        return index || '0';
      }
      if (element.children) {
        const found: any = findByIndexRecursive(element.children, idObj);
        if (found) {
          return found;
        }
      }
    }
  }

  function findByIndexRecursiveFirst(array: TFolder[], idObj: string) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.id === idObj) {
        return index;
      }
    }
  }

  const onClick = () => {
    setActive(!active);
    if (depth === 1) {
      localStorage.removeItem('firstIdx');

      const idxFirst = findByIndexRecursiveFirst(deep, iD);

      setFirstIndex(idxFirst);
      localStorage.setItem('firstIdx', String(idxFirst));
    }
    if (depth === 2) {
      localStorage.removeItem('secondIdx');
      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = +findByIndexRecursive(deep, iD)!;
      setSecondIndex(idxSecond);
      localStorage.setItem('secondIdx', String(idxSecond));
    }
    if (depth === 3) {
      localStorage.removeItem('thirdIdx');
      const idxFirst = localStorage.getItem('firstIdx');
      setFirstIndex(+idxFirst!);
      const idxSecond = localStorage.getItem('secondIdx');
      setSecondIndex(+idxSecond!);

      setThirdIndex(+findByIndexRecursive(deep, iD)!);
      localStorage.setItem('thirdIdx', String(idxSecond));
    }
  };

  const newObj = {
    id: uuidv4(),
    title: 'DOM',
    children: [],
  };

  console.log(firstIndex);
  console.log(secondIndex);
  console.log(thirdIndex);

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

  //   const newArrDel = () => {
  //     switch (depth) {
  //       case 1:
  //         deep.splice(firstIndex!, 1);
  //         break;
  //         //   case 2:
  //         //     deep[firstIndex!].children![secondIndex!].children!.filter((el) => el.id !== iD);
  //         //     break;
  //         //   case 3:
  //         //     deep[firstIndex!].children![secondIndex!].children![
  //         //       thirdIndex!
  //         //     ].children!.filter((el) => el.id !== iD);
  //         //     break;
  //       default:
  //         break;
  //     }
  //     return deep;
  //   };
  //   console.log(iD);
  //   console.log(newArrDel());

  const addFolderHandler = () => {
    dispatch(addFolder(newArrAdd()));
  };

  const deleteFolderHandler = () => {
    // dispatch(removeFolder(newArrDel()));
  };

  return (
    <Container style={style}>
      {active && (
        <Buttons>
          <AddButton onClick={addFolderHandler}>
            <AddBoxIcon
              sx={{ color: '#B7B7B7;', width: '16px', height: '16px' }}
            />
          </AddButton>
          <DeleteButton onClick={deleteFolderHandler}>
            <DeleteIcon
              sx={{ color: '#B7B7B7;', width: '16px', height: '16px' }}
            />
          </DeleteButton>
        </Buttons>
      )}
      <Wrapper onClick={onClick}>
        <NavigateNextOutlinedIcon
          sx={{ color: '#B7B7B7', width: '14px', height: '16px' }}
        />
        <FolderIcon sx={{ color: '#FFEBB7', width: '16px', height: '16px' }} />
        <Title>{title}</Title>
      </Wrapper>

      {Array.isArray(children) ? (
        <ul style={childStyle}>
          {children.map((item, index) => (
            <RecursiveComponent key={index} depth={depth + 1} {...item} />
          ))}
        </ul>
      ) : null}
    </Container>
  );
}

export default RecursiveComponent;
