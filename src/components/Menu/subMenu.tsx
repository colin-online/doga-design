/*
 * @Author: 东林
 * @Date: 2022-03-13 18:54:05
 * @description: Menu子菜单函数组件
 */
import classNames from 'classnames';
import React, { FunctionComponentElement, useCallback, useContext, useState } from 'react';
import Icon from '../Icon';
import Transition from '../Transition/transition';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

/* Menu子菜单接口定义 */
export interface subMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

/* Menu子菜单函数组件 */
const SubMenu: React.FC<subMenuProps> = (props) => {
  const { index, title, className, children } = props || {};
  /* 获取上下文 */
  const context = useContext(MenuContext);
  /* 展开子菜单 */
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false;
  /* 设置显示隐藏 */
  const [isOpen, setIsOpen] = useState(isOpend);

  /* 样式集合 */
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': isOpen,
    'is-vertical': context.mode === 'vertical',
  });

  /* 点击事件 */
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    },
    [isOpen],
  );

  /* 滑过事件 */
  let timer: any;
  const handleMouse = useCallback((e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(() => setIsOpen(toggle), 300);
  }, []);

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  /* 处理Children */
  const renderChildren = () => {
    const subMenuClass = classNames('doga-submenu', {
      'menu-opened': isOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childrenElement = child as FunctionComponentElement<MenuItemProps>;
      if (childrenElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childrenElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error('Warning：SubMenu has a child which is not a MenuItem component.');
      }
    });
    return (
      <Transition in={isOpen} timeout={300} animation='zoom-in-top'>
        <ul className={subMenuClass}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
