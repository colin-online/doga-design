/*
 * @Author: 东林
 * @Date: 2022-03-13 16:05:02
 * @description: 菜单函数组件
 */
import classNames from 'classnames';
import React, { FC, ReactNode, Children, cloneElement, createContext, CSSProperties, FunctionComponentElement, useCallback, useState } from 'react';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical'; /* Menu模式类型定义 */
type SelectCallback = (selectIndex: string) => void; /* 选中回调类型定义 */

/* Menu接口定义 */
export interface MenuProps {
  defaultIndex?: string;
  mode?: MenuMode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

/* Menu上下文接口定义 */
export interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

/* Menu上下文 */
export const MenuContext = createContext<IMenuContext>({
  index: '0',
});

/* Menu函数组件 */
export const Menu: FC<MenuProps> = props => {
  const { defaultIndex, mode, className, style, onSelect, defaultOpenSubMenus, children } = props || {};
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  /* 样式集合 */
  const classes = classNames('doga-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  /* 选择事件 */
  const handleClick = useCallback(
    (index: string) => {
      setCurrentActive(index);
      if (onSelect) {
        onSelect(index);
      }
    },
    [onSelect]
  );

  /* 传递上下文 */
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  /* 处理Children */
  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type || {};
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Warning：Menu has a child which is not a MenuItem component.');
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

/* Menu默认属性设置 */
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
