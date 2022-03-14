/*
 * @Author: 东林
 * @Date: 2022-03-13 17:28:24
 * @description: Menu组件测试用例
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'colin',
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop</MenuItem>
      </SubMenu>
      <SubMenu title='opened'>
        <MenuItem>open</MenuItem>
      </SubMenu>
      <MenuItem>change</MenuItem>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .doga-submenu {
      display: none;
    }
    .doga-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style;
};

/* 测试Menu组件 */
describe('test Menu and MenuItem component', () => {
  /* 应该根据默认道具呈现正确的菜单和菜单项 */
  it('should render correct Menu and MenuItem base on default props', () => {
    render(generateMenu(testProps));
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('doga-menu colin');
    expect(menuElement.childElementCount).toEqual(5);
    const activeElement = screen.getByText('active');
    expect(activeElement).toHaveClass('menu-item is-active');
    const disabledElement = screen.getByText('disabled');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  /* 点击菜单栏子项应该变化并且调用正确的回调 */
  it('click items should change active and call the right callback', () => {
    render(generateMenu(testProps));
    const changeElement = screen.getByText('change');
    const activeElement = screen.getByText('active');
    const disabledElement = screen.getByText('disabled');
    fireEvent.click(changeElement);
    expect(changeElement).toHaveClass('menu-item is-active');
    expect(activeElement).not.toHaveClass('menu-item is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('4');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('menu-item is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  /* 当“模式”设置为“垂直”时，应该渲染垂直模式 */
  it('should render vertical mode when mode is set to vertical', () => {
    render(generateMenu(testVerticalProps));
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  /* 当鼠标悬停在子项上时，应该显示下拉菜单子项 */
  it('should show dropdown items when hover on subMenu', async () => {
    render(generateMenu(testProps)).container.append(createStyleFile());
    const dropDownItem = screen.queryByText('drop');
    expect(dropDownItem).not.toBeInTheDocument();
    const dropdownElement = screen.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(screen.queryByText('drop')).toBeVisible();
    });
    fireEvent.click(screen.getByText('drop'));
    expect(testProps.onSelect).toHaveBeenCalledWith('2-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(screen.queryByText('drop')).not.toBeVisible();
    });
  });
});

/* 垂直模式下的测试菜单和菜单项组件 */
describe('test Menu and MenuItem component in vertical mode', () => {
  /* 当“模式”设置为“垂直”时，应该渲染垂直模式 */
  it('should render vertical mode when mode is set to vertical', () => {
    render(generateMenu(testVerticalProps)).container.append(createStyleFile());
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  /* 当点击垂直模式的子菜单时，应该显示下拉项 */
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    render(generateMenu(testVerticalProps)).container.append(createStyleFile());
    const dropDownItem = screen.queryByText('drop');
    expect(dropDownItem).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('dropdown'));
    expect(dropDownItem).not.toBeInTheDocument();
  });

  /* 当defaultOpenSubMenus包含子菜单索引时，应该显示子菜单下拉列表 */
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    render(generateMenu(testVerticalProps)).container.append(createStyleFile());
    expect(screen.getByText('opened')).toBeVisible();
  });
});
