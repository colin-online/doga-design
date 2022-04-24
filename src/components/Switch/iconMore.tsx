/*
 * @Author: 东林
 * @Date: 2022-04-18 15:54:45
 * @description: 图标切换选择器-多选项函数组件
 */
import React, { FC, ReactElement, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';

/* 选项集合属性类型定义 */
export type OptionsProps = {
  /* 图标 */
  icon?: string | ReactElement;
  /* 数值 */
  value: string;
};

/* 图标切换选择器属性接口定义 */
export interface IconMoreProps {
  /* 当前选中选项 */
  checked: string;
  /* 选项集合 */
  options: Array<OptionsProps>;
  /* 更新事件 */
  onChange?: (value: any) => void;
}

export const IconMore: FC<IconMoreProps> = props => {
  const { checked, options, onChange } = props || {};
  /* 当前选中索引 */
  const [currentIndex, setCurrentIndex] = useState(0);
  /* 组件样式 */
  const classes = classNames('doga-switch-icon', 'selected', {});

  /* 执行图标切换选中选项操作 */
  const handleSwitchIndexChange = useCallback(() => {
    let index = currentIndex;
    /* 切换选中索引 */
    if (currentIndex < options.length - 1) {
      index += 1;
    } else {
      index = 0;
    }
    setCurrentIndex(index);
    if (onChange) onChange(options[index]?.value);
  }, [onChange, currentIndex, options]);

  /* 初始化选中选项索引 */
  useEffect(() => {
    const index = options.findIndex(option => option.value === checked);
    setCurrentIndex(index);
  }, [checked, options]);

  return (
    <div className={classes} onClick={() => handleSwitchIndexChange()}>
      {options[currentIndex]?.icon}
    </div>
  );
};

export default IconMore;
