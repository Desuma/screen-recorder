import React, { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// import { MakeWebm } from './MakeWebm';
const MakeWebm = lazy(() => import('./MakeWebm'));

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackRender={() => (<span>error.</span>)}>
      <MakeWebm />
    </ErrorBoundary>
  );
}

export default App;
