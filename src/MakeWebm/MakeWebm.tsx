import React from 'react';
import { FloatButton } from 'antd';
import { isEmpty } from 'lodash';

import { useRecorder } from '~/hooks';

import { PauseRecordBtn, ResumeRecordBtn, StartRecordBtn, StopRecordBtn } from './components';

export const MakeWebm: React.FC = () => {
  const {
    state,
    onStartRecord,
    onPauseRecord,
    onResumeRecord,
    onStopRecord,
  } = useRecorder();

  return (
    <FloatButton.Group
      shape={'square'}
      type={'default'}
      style={{ right: 24, bottom: 500 }}
    >
      <StartRecordBtn
        display={isEmpty(state) || state === 'inactive'}
        onClick={onStartRecord}
      />
      <StopRecordBtn
        display={!isEmpty(state) && state !== 'inactive'}
        onClick={onStopRecord}
      />
      <PauseRecordBtn
        display={state === 'recording'}
        onClick={onPauseRecord}
      />
      <ResumeRecordBtn
        display={state === 'paused'}
        onClick={onResumeRecord}
      />
    </FloatButton.Group>

  );
};

export default MakeWebm;
