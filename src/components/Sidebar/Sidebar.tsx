import { useEffect, useState } from 'react';
import styled from 'styled-components';
import folders from '../../constants/constants';
import { setFolders } from '../../features/folders/foldersSlice';
import { useAppDispatch, useSelector } from '../../store/store';
import Folder from '../folder/folder';

const Section = styled.div`
  padding: 22px 0 0 0;
  margin: 0;
  width: 249px;
  height: 100vh;
  background-color: #252525;
`;

function Sidebar() {
  const foldersArray = useSelector((state) => state.folders.folders);
  const dispatch = useAppDispatch();
  const [currentFolderIndex, setCurrentFolderIndex] = useState<string>();

  useEffect(() => {
    dispatch(setFolders(folders));
  }, [dispatch]);
  return (
    <Section>
      {foldersArray.map((item) => (
        <Folder
          key={item.id}
          currentFolderIndex={currentFolderIndex!}
          setCurrentFolderIndex={setCurrentFolderIndex}
          {...item}
        />
      ))}
    </Section>
  );
}

export default Sidebar;
