import React from 'react';
import ReactDOM from 'react-dom';

import { LoggerProvider } from 'reprolog';
import { newOldDiffLogger } from 'reprolog/loggers';
import { consoleTableOutput } from 'reprolog/outputs';

import Counter from './Counter';


const Root = () => (
  <LoggerProvider
    propsLogger={newOldDiffLogger(consoleTableOutput())}
    propsLoggerConfig={{ whiteList: ['Counter'] }}
  >
    <Counter />
  </LoggerProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(Root),
    document.getElementById('mount'),
  );
});
