import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';

// const rootDom = document.createElement('div');
// window.document.body.appendChild(rootDom);

const rootDom = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDom!);

root.render(
  <React.StrictMode>
    <ConfigProvider prefixCls={'screen-recorder'}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
