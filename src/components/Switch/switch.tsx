/*
 * @Author: 东林
 * @Date: 2022-04-18 15:54:45
 * @description: 切换选择器函数组件
 */
import React, { FC, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';

/* 选中主题类型定义 */
export type themeProps = 'default' | 'primary' | 'success' | 'info' | 'tips' | 'warning' | 'danger';

/* 切换选择器属性接口定义 */
export interface SwitchProps {
  /* 主题风格 */
  theme?: themeProps;
  /* 是否选中 */
  checked: boolean;
  /* 更新事件 */
  onChange?: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = props => {
  const { theme, checked, onChange } = props || {};
  /* 当前选中索引 */
  const [active, setActive] = useState(checked);

  /* 执行切换选中选项操作 */
  const handleSwitchCheckedChange = useCallback(() => {
    setActive(!active);
    if (onChange) onChange(!active);
  }, [onChange, active]);

  /* 组件样式 */
  const classes = classNames('doga-switch', {
    [`doga-switch-${theme}`]: theme,
    selected: active,
  });

  /* 初始化状态 */
  useEffect(() => setActive(checked), [checked]);

  return (
    <div className={classes} onClick={() => handleSwitchCheckedChange()}>
      <div className={classNames('doga-switch-circle', active ? 'selected' : null)}></div>
    </div>
  );
};

/* Switch默认属性设置 */
Switch.defaultProps = {
  theme: 'default',
  checked: false,
};

export default Switch;
