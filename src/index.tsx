import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';

const rootDom = document.createElement('div');
const root = ReactDOM.createRoot(rootDom);

window.document.body.appendChild(rootDom);

root.render(
  <React.StrictMode>
    <ConfigProvider prefixCls={'screen-recorder'}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
