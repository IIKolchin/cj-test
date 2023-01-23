import { useEffect } from 'react';
import styled from 'styled-components';
import folders from '../../constants/constants';
import { setFolders } from '../../features/folders/foldersSlice';
import { useAppDispatch, useSelector } from '../../store/store';
// import FolderIcon from '@mui/icons-material/Folder';
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
// import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import MovieIcon from '@mui/icons-material/Movie';
// import Folder from '../Folder/Folder';
import RecursiveComponent from '../Folder/recursiv';

const Section = styled.ul`
  padding: 0;
  width: 249px;
  min-height: 800px;
  background-color: #252525;
`;

function Sidebar() {
  const foldersArray = useSelector((state) => state.folders.folders);
  const dispatch = useAppDispatch();

  //   console.log(foldersArray);

  useEffect(() => {
    dispatch(setFolders(folders));
  }, [dispatch]);
  //   const [active, setActive] = useState<any[]>([]);
  //   console.log(active);

  //   const onClick = (el: any) => {
  //     setActive((prevState) => [...prevState, el]);

  //     const toggleEl = active.filter((element) => element !== el);
  //     if (active.includes(el)) {
  //       setActive(toggleEl);
  //     }
  //   };

  //   const addHandler = () => {
  //     // folders.subfolders = { id: 1, title: 'ASSETS' },
  //   };

  return (
    <Section>
      {/* {folders.map((folder) => (
        <Folder
          title={folder.title}
          key={folder.id}
          onClickHandler={() => onClick(folder.id)}
          active={active}
          id={folder.id}
          addHandler={addHandler}
        />
      ))} */}
      {foldersArray.map((item, index) => (
        <RecursiveComponent key={index} {...item} />
      ))}

      {/* <ExpandMoreOutlinedIcon
        sx={{ color: '#B7B7B7', width: '14px', height: '16px' }}
      /> */}
      {/* <MovieIcon /> */}
    </Section>
  );
}

export default Sidebar;
