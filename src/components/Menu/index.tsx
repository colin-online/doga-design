/*
 * @Author: 东林
 * @Date: 2022-03-13 01:58:29
 * @description: 菜单组件入口文件
 */
import { FC } from 'react';
import Menu, { MenuProps } from './menu';
import MenuItem, { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from './subMenu';

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};
const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
