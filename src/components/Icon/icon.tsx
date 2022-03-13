/*
 * @Author: 东林
 * @Date: 2022-03-13 23:01:16
 * @description: Icon函数组件
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
library.add(fas);

/* 主题属性类型定义 */
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

/* 主题属性接口定义 */
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

/* Icon函数组件 */
const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props;
  const classes = classNames('doga-icon', className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
