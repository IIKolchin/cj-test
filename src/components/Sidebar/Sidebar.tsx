import { useEffect } from 'react';
import styled from 'styled-components';
import folders from '../../constants/constants';
import { setFolders } from '../../features/folders/foldersSlice';
import { useAppDispatch, useSelector } from '../../store/store';
import Folders from '../Folder/Folders';

const Section = styled.div`
  padding: 22px 0 0 0;
  margin: 0;
  width: 249px;
  min-height: 800px;
  background-color: #252525;
`;

function Sidebar() {
  const foldersArray = useSelector((state) => state.folders.folders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFolders(folders));
  }, [dispatch]);
  return (
    <Section>
      {foldersArray.map((item, index) => (
        <Folders key={index} {...item} />
      ))}
    </Section>
  );
}

export default Sidebar;
