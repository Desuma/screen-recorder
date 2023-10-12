import React from 'react';
import { FloatButton, FloatButtonProps } from 'antd';
import { PauseCircleOutlined } from '@ant-design/icons';

import { BaseRecordBtnProps } from '~/types';

export interface PauseRecordBtnProps
  extends Omit<FloatButtonProps, 'icon'>,
  BaseRecordBtnProps {

}

export const PauseRecordBtn: React.FC<PauseRecordBtnProps> = ({
  display,
  ...props
}) => {
  return display ? (
    <FloatButton
      icon={<PauseCircleOutlined />}
      {...props}
    />
  ) : null;
}

export default PauseRecordBtn;
