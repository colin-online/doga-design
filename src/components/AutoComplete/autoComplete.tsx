/*
 * @Author: 东林
 * @Date: 2022-03-14 14:00:21
 * @description: AutoComplete函数组件
 */
import classNames from 'classnames';
import React, { ChangeEvent, FC, KeyboardEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import Icon from '../Icon';
import Input from '../Input';
import { InputProps } from '../Input/input';
import Transition from '../Transition';

/* 数据源对象接口定义 */
interface DataSourceObject {
  value: string;
}

/* 数据源类型接口定义 */
export type DataSourceType<T = {}> = T & DataSourceObject;
/* AutoComplete组件属性接口定义 */
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /* 获取选项 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /* 选择事件 */
  onSelect?: (item: DataSourceType) => void;
  /* 渲染选项 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/* AutoComplete函数组件 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props || {};
  /* 延迟加载 */
  const [loading, setLoading] = useState(false);
  /* 输入框数值 */
  const [inputValue, setInputValue] = useState(value as string);
  /* 防抖输入框数值 */
  const debounceInputValue = useDebounce(inputValue);
  /* 选项列表 */
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  /* 高亮索引 */
  const [highlightIndex, setHighlightIndex] = useState(-1);
  /* 显示隐藏选项 */
  const [showDropdown, setShowDropdown] = useState(false);
  /* 切换元素 */
  const triggerSearch = useRef(false);
  /* 组件元素 */
  const componentRef = useRef<HTMLDivElement>(null);

  /* 处理点击外部操作 */
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  /* 更新输入框数据副作用 */
  useEffect(() => {
    if (debounceInputValue && triggerSearch.current) {
      setSuggestions([]);
      const results = fetchSuggestions(debounceInputValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debounceInputValue, fetchSuggestions]);

  /* 更新输入框数据事件 */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }, []);

  /* 选择选项事件 */
  const handleSelect = useCallback(
    (item: DataSourceType) => {
      setInputValue(item.value);
      setShowDropdown(false);
      if (onSelect) {
        onSelect(item);
      }
      triggerSearch.current = false;
    },
    [onSelect],
  );

  /* 执行标记索引操作 */
  const highlight = useCallback(
    (index: number) => {
      if (index < 0) index = 0;
      if (index >= suggestions.length) {
        index = suggestions.length - 1;
      }
      setHighlightIndex(index);
    },
    [suggestions],
  );

  /* 键盘控制事件 */
  const handlekeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.code) {
        case 'Enter' /* 确定键 */:
          if (suggestions[highlightIndex]) {
            handleSelect(suggestions[highlightIndex]);
          }
          break;
        case 'ArrowUp' /* 向上键 */:
          highlight(highlightIndex - 1);
          break;
        case 'ArrowDown' /* 向下键 */:
          highlight(highlightIndex + 1);
          break;
        case 'Escape' /* 取消键 */:
          setShowDropdown(false);
          break;
        default:
          break;
      }
    },
    [highlightIndex, highlight, suggestions, handleSelect],
  );

  /* 渲染模版 */
  const renderTemplate = useCallback(
    (item: DataSourceType) => {
      return renderOption ? renderOption(item) : item.value;
    },
    [renderOption],
  );

  /* 生成下拉项 */
  const generateDropdown = useCallback(() => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className='doga-suggestion-list'>
          {loading && (
            <div className='suggstions-loading-icon'>
              <Icon icon='spinner' spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            });
            return (
              <li key={index} className={classes} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  }, [loading, showDropdown, suggestions, highlightIndex, handleSelect, renderTemplate]);

  return (
    <div className='doga-auto-complete' ref={componentRef}>
      <Input icon='caret-down' value={inputValue} onChange={handleChange} {...restProps} onKeyDown={handlekeyDown} />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
