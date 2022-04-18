/*
 * @Author: 东林
 * @Date: 2022-04-18 20:39:24
 * @description: 下拉选择器函数组件
 */
import React, { FC, useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

/* 下拉选项属性类型定义 */
export type optionProps = {
  /* 选项名称 */
  label: string;
  /* 选项内容 */
  value: string;
};

/* 下拉选择器属性接口定义 */
export interface SelectProps {
  /* 当前选中数据 */
  checked: string;
  /* 选项数据源 */
  options: Array<optionProps>;
  /* 后置图标 */
  appendIcon?: any;
  /* 更新事件 */
  onChange?: (value: any) => void;
}

export const Select: FC<SelectProps> = props => {
  const { checked, options, appendIcon, onChange } = props || {};
  /* 组件元素 */
  const componentRef = useRef<HTMLDivElement>(null);
  /* 是否显示选择器 */
  const [isActive, setIsActive] = useState(false);
  /* 当前选中索引 */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* 组件样式 */
  const classes = classNames('doga-select', {});

  /* 处理点击外部操作 */
  useClickOutside(componentRef, () => {
    setIsActive(false);
  });

  /* 初始化选中选项索引 */
  useEffect(() => {
    const index = options.findIndex(option => option.value === checked);
    setCurrentIndex(index);
  }, [checked, options]);

  /* 执行设置选中选项操作 */
  const handleSelectOptionClick = useCallback(
    index => {
      setCurrentIndex(index);
      setIsActive(false);
      if (onChange) onChange(options[index].value);
    },
    [onChange, options]
  );

  /* 执行显示选择器操作 */
  const handleIsActiveChange = useCallback(() => setIsActive(!isActive), [isActive]);

  return (
    <div className={classes} ref={componentRef}>
      <div className="doga-select-input" onClick={() => handleIsActiveChange()}>
        {options[currentIndex]?.label} {appendIcon}
      </div>
      <div className={classNames('doga-select-list', isActive ? 'active' : '')}>
        {options.map((option, index) => {
          const { label, value } = option || {};
          return (
            <div
              key={index}
              className={classNames('doga-select-list-item', value === options[currentIndex]?.value ? 'doga-select-list-checked' : '')}
              style={{ fontFamily: value }}
              onClick={() => handleSelectOptionClick(index)}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
