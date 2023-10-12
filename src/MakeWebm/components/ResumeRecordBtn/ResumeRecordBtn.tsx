import React from 'react';
import { FloatButton, FloatButtonProps } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { BaseRecordBtnProps } from '~/types';

export interface ResumeRecordBtnProps extends Omit<FloatButtonProps, 'icon'>,
  BaseRecordBtnProps {

}

export const ResumeRecordBtn: React.FC<ResumeRecordBtnProps> = ({
  display,
  ...props
}) => {
  return display ? (
    <FloatButton
      icon={<PlayCircleOutlined />}
      {...props}
    />
  ) : null;
}

export default ResumeRecordBtn;
