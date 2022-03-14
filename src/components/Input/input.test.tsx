/*
 * @Author: 东林
 * @Date: 2022-03-14 13:12:19
 * @description: 输入框组件测试用例
 */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Input, InputProps } from './input';

/* 默认属性接口定义 */
const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

/* 测试Input组件 */
describe('test Input component', () => {
  /* 应该呈现正确的默认输入 */
  it('should render the correct default Input', () => {
    render(<Input {...defaultProps} />);
    const testNode = screen.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('doga-input-inner');
    fireEvent.change(testNode, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('23');
  });

  /* 应该在disabled属性上呈现禁用的输入 */
  it('should render the disabled Input on disabled property', () => {
    render(<Input disabled placeholder='disabled' />);
    const testNode = screen.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });

  /* 应该在size属性上呈现不同的输入大小 */
  it('should render different input sizes on size property', () => {
    render(<Input placeholder='sizes' size='lg' />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toHaveClass('input-size-lg');
  });

  /* 应该在prepand/append属性上呈现prepand和append元素 */
  it('should render prepand and append element on prepand/append property', () => {
    render(<Input placeholder='pend' prepend='https://' append='.com' />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toHaveClass('doga-input-inner');
    const prepandElement = screen.getByText('https://');
    expect(prepandElement).toBeInTheDocument();
    const appendElement = screen.getByText('.com');
    expect(appendElement).toBeInTheDocument();
  });
});
