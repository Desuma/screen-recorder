import React from 'react';
import { FloatButton, FloatButtonProps } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { BaseRecordBtnProps } from '~/types';

export interface StopRecordBtnProps
  extends Omit<FloatButtonProps, 'icon'>,
  BaseRecordBtnProps {

}

export const StopRecordBtn: React.FC<StopRecordBtnProps> = ({
  display,
  ...props
}) => {
  return display
    ? (
      <FloatButton
        icon={<MinusCircleOutlined />}
        {...props}
      />
    )
    : null;
}

export default StopRecordBtn;
