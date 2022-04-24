/*
 * @Author: 东林
 * @Date: 2022-04-18 15:54:45
 * @description: 切换选择器函数组件
 */
import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';

/* 切换选择器属性接口定义 */
export interface SwitchProps {
  /* 是否选中 */
  checked: boolean;
  /* 更新事件 */
  onChange?: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = props => {
  const { checked = false, onChange } = props || {};
  /* 当前选中索引 */
  const [active, setActive] = useState(checked);
  /* 组件样式 */
  const classes = classNames('doga-switch', {
    selected: active,
  });

  /* 执行切换选中选项操作 */
  const handleSwitchCheckedChange = useCallback(() => {
    setActive(!active);
    if (onChange) onChange(!active);
  }, [onChange, active]);

  return (
    <div className={classes} onClick={() => handleSwitchCheckedChange()}>
      <div className={classNames('doga-switch-circle', active ? 'selected' : null)}></div>
    </div>
  );
};

export default Switch;
