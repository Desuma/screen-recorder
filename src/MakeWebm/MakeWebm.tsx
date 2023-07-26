import React from 'react';
import { FloatButton } from 'antd';
import {
  MinusCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { isEmpty } from 'lodash';

import { useRecorder } from '~/hooks';

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
      {
        isEmpty(state) || state === 'inactive' ? (
          <FloatButton
            icon={<VideoCameraOutlined />}
            onClick={onStartRecord}
          />
        ) : (
          <FloatButton
            icon={<MinusCircleOutlined />}
            onClick={onStopRecord}
          />
        )
      }
      {
        state === 'recording' && (
          <FloatButton
            icon={<PauseCircleOutlined />}
            onClick={onPauseRecord}
          />
        )
      }
      {
        state === 'paused' && (
          <FloatButton
            icon={<PlayCircleOutlined />}
            onClick={onResumeRecord}
          />
        )
      }
    </FloatButton.Group>

  );
}

export default MakeWebm;
