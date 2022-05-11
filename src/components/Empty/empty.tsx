/*
 * @Author: 东林
 * @Date: 2022-05-01 23:06:48
 * @description: 空状态组件
 */
import React, { FC, ReactElement } from 'react';
import classNames from 'classnames';

export interface EmptyProps {
  /* 是否可见 */
  visible: boolean;
  /* 图标 */
  icon?: ReactElement;
  /* 描述 */
  description?: string;
}

export const Empty: FC<EmptyProps> = props => {
  const { icon, visible, description } = props || {};
  /* 组件样式 */
  const classes = classNames('doga-empty', {
    visible,
  });

  return (
    <div className={classes}>
      <div className="doga-empty-icon">{icon}</div>
      <div className="doga-empty-desc">{description}</div>
    </div>
  );
};

/* Empty默认属性设置 */
Empty.defaultProps = {
  visible: false,
  description: '暂无数据',
};

export default Empty;
