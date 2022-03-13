/*
 * @Author: 东林
 * @Date: 2022-03-13 16:10:11
 * @description: Menu子项函数组件
 */
import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import { MenuContext } from './menu';

/* Menu子项属性接口定义 */
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/* Menu子项函数组件 */
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props || {};
  /* 获取上下文 */
  const context = useContext(MenuContext);
  /* 样式集合 */
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });

  /* 选择事件 */
  const handleClick = useCallback(() => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  }, [context, index, disabled]);

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
