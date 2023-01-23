import { v4 as uuidv4 } from 'uuid';

const folders = [
  {
    id: uuidv4(),
    title: 'ASSETS',
    children: [
      {
        id: uuidv4(),
        title: 'ASSET',
        children: [
          { id: uuidv4(), title: 'ASSE', children: [] },
          { id: uuidv4(), title: 'THE2ID', children: [] },
        ],
      },
      {
        id: uuidv4(),
        title: 'ADSTS',
        children: [
          { id: uuidv4(), title: 'SETS', children: [] },
          { id: uuidv4(), title: 'THCID', children: [] },
        ],
      },
      {
        id: uuidv4(),
        title: 'ASSE',
        children: [
          { id: uuidv4(), title: 'SSES', children: [] },
          { id: uuidv4(), title: 'THFID', children: [] },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'RND',
    children: [
      {
        id: uuidv4(),
        title: 'SETS',
        children: [
          { id: uuidv4(), title: 'SSETS', children: [] },
          { id: uuidv4(), title: 'THID', children: [] },
        ],
      },
      {
        id: uuidv4(),
        title: 'ASTS',
        children: [
          { id: uuidv4(), title: 'AWWTS', children: [] },
          { id: uuidv4(), title: 'THID', children: [] },
        ],
      },
      {
        id: uuidv4(),
        title: 'ASSFVE',
        children: [
          { id: uuidv4(), title: 'ASWSETS', children: [] },
          { id: uuidv4(), title: 'THID', children: [] },
        ],
      },
    ],
  },
  { id: uuidv4(), title: 'ONSET', children: [] },
  { id: uuidv4(), title: 'CAPS', children: [] },
  { id: uuidv4(), title: 'CAVE', children: [] },
  { id: uuidv4(), title: 'XMRF', children: [] },
  { id: uuidv4(), title: 'ENGN', children: [] },
];

export default folders;
