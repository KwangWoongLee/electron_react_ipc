import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';

const rootNode = document.getElementById('root');

ReactDOM.render(
  <RecoilRoot>
    <RecoilNexus />
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);
