import React, { useState } from 'react';
import moment from 'moment';
import produce from 'immer';
import Recoils from './recoils';
const { ipcRenderer } = window.require('electron');

ipcRenderer.on('res', (event, arg) => {
  console.log('response event : ', arg);
  Recoils.setState('MESSAGE', (messages) => {
    const next = produce(messages, (d) => {
      d.push(`response event : ${arg}`);
    });

    return next;
  });
});

const ref = React.createRef();
const App = () => {
  const [count, setCount] = useState(0);
  const [messages, setMessage] = Recoils.useState('MESSAGE');
  //const [messages, setMessage] = useState([]);
  ref.current = setMessage;

  const onCountClick = () => {
    ipcRenderer.send('req');
    setCount((c) => c + 1);
    setMessage((messages) => {
      const next = produce(messages, (d) => {
        d.push(`request event : ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
      });

      return next;
    });
  };

  const onResetClick = () => setMessage([]);

  return (
    <div>
      <div> count : {count} </div>
      <button onClick={onCountClick}>Request Electron Event</button>
      <button onClick={onResetClick}>Message Reset</button>
      <hr />
      {messages.map((message, idx) => (
        <div key={idx}>{message}</div>
      ))}
    </div>
  );
};

export default App;
