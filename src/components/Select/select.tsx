/*
 * @Author: 东林
 * @Date: 2022-04-18 20:39:24
 * @description: 下拉选择器函数组件
 */
import React, { FC, ReactElement, useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

/* 下拉选项属性类型定义 */
export type optionProps = {
  /* 选项名称 */
  label?: string;
  /* 选项内容 */
  value?: string;
  /* 选项索引 */
  index?: number;
  /* 选项图标 */
  icon?: string | ReactElement;
};

/* 下拉选择器属性接口定义 */
export interface SelectProps {
  /* 当前选中数据 */
  checked: string | number;
  /* 选项数据源 */
  options: Array<optionProps> | any;
  /* 前置图标 */
  prependIcon?: any;
  /* 后置图标 */
  appendIcon?: any;
  /* 更新事件 */
  onChange?: (value: any) => void;
}

export const Select: FC<SelectProps> = props => {
  const { checked, options, prependIcon, appendIcon, onChange } = props || {};
  /* 组件元素 */
  const componentRef = useRef<HTMLDivElement>(null);
  /* 是否显示选择器 */
  const [isActive, setIsActive] = useState(false);
  /* 当前选中索引 */
  const [currentIndex, setCurrentIndex] = useState<any>(0);

  /* 组件样式 */
  const classes = classNames('doga-select', {});

  /* 执行设置选中选项操作 */
  const handleSelectOptionClick = useCallback(
    (index: any) => {
      setCurrentIndex(index);
      setIsActive(false);
      if (onChange) onChange(options[index].value || index);
    },
    [onChange, options]
  );

  /* 执行显示选择器操作 */
  const handleIsActiveChange = useCallback(() => setIsActive(!isActive), [isActive]);

  /* 初始化选中选项索引 */
  useEffect(() => {
    const index = options.findIndex((option: { value: string | number }, index: string | number) => option.value === checked || index === checked);
    setCurrentIndex(index);
  }, [checked, options]);

  /* 处理点击外部操作 */
  useClickOutside(componentRef, () => {
    setIsActive(false);
  });

  return (
    <div className={classes} ref={componentRef}>
      <div className="doga-select-input" onClick={() => handleIsActiveChange()}>
        {options[currentIndex]?.label} {isActive ? prependIcon : appendIcon}
      </div>
      {isActive && (
        <div className="doga-select-list">
          {options.map((option: any, key: React.Key | null | undefined) => {
            const { index, label, icon, value } = option || {};
            return (
              <div
                key={key}
                className={classNames('doga-select-list-item', (value && value === options[currentIndex]?.value) || index === currentIndex ? 'doga-select-list-checked' : '')}
                style={{ fontFamily: value }}
                onClick={() => handleSelectOptionClick(index)}
              >
                {icon} {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
