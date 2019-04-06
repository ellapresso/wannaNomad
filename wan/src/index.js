//console.log('Set up is continuing...');

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../crawlingProject/client/App';
 
const title = 'Test';

ReactDOM.render(
  <App/>
  ,document.getElementById('root')
);

module.hot.accept();