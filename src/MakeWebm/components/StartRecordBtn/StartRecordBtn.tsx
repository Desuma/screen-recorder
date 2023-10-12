import React, { memo } from 'react';
import { FloatButton, FloatButtonProps } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { BaseRecordBtnProps } from '~/types';

export interface StartRecordBtnProps
  extends Omit<FloatButtonProps, 'icon'>,
  BaseRecordBtnProps {

}

export const StartRecordBtn: React.FC<StartRecordBtnProps> = memo(({
  display,
  ...props
}) => {
  return display
    ? (
      <FloatButton
        icon={<VideoCameraOutlined />}
        {...props}
      />
    )
    : null;
})

export default StartRecordBtn;
