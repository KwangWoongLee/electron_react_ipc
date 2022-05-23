import { atom } from 'recoil';

// recoil state atom
const states = [];

states.push(
  atom({
    key: 'MESSAGE',
    default: [],
  })
);

export default states;
