import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MakeWebm } from './MakeWebm';

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackRender={() => (<span>error.</span>)}>
      <MakeWebm />
    </ErrorBoundary>
  );
}

export default App;
