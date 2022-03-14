/*
 * @Author: 东林
 * @Date: 2022-03-14 17:19:53
 * @description: AutoComplete组件测试用例
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { config } from 'react-transition-group';
import { AutoComplete, AutoCompleteProps } from './autoComplete';

config.disabled = true;

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

/* 测试AutoComplete组件 */
describe('test AutoComplete component', () => {
  /* 测试基本的自动完成行为 */
  it('test basic AutoComplete behavior', async () => {
    render(<AutoComplete {...testProps} />);
    const inputElement = screen.getByPlaceholderText('auto-complete') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    expect(inputElement.value).toBe('ab');
  });

  /* 单击“外部”将隐藏下拉列表 */
  it('click outside should hide the dropdown', async () => {
    render(<AutoComplete {...testProps} />);
    const inputElement = screen.getByPlaceholderText('auto-complete') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
  });
});
