/*
 * @Author: 东林
 * @Date: 2022-03-13 13:14:12
 * @description: Button测试用例
 */
import { fireEvent, render, screen } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'colin',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

/* 测试按钮组件 */
describe('test Button component', () => {
  /* 应该呈现正确的默认按钮 */
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Default Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Default Button' }) as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('doga-btn btn-default');
    expect(buttonElement.disabled).toBeFalsy();
    fireEvent.click(buttonElement);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  /* 应该根据不同的属性呈现正确的组件 */
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Primary Button' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('doga-btn btn-primary btn-lg colin');
  });

  /* 当btnType等于link并且提供了href时，应该呈现一个链接 */
  it('should render a link when btnType equals link and href is provided', () => {
    render(
      <Button btnType='link' href='http://www.baidu.com/' {...defaultProps}>
        Link Button
      </Button>,
    );
    const buttonElement = screen.getByRole('link', { name: 'Link Button' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('doga-btn btn-link');
    fireEvent.click(buttonElement);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  /* 禁用时应将“渲染禁用”按钮设置为true */
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Primary Button' }) as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.disabled).toBeTruthy();
    fireEvent.click(buttonElement);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});
