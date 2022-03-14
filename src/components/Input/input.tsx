/*
 * @Author: 东林
 * @Date: 2022-03-14 02:26:56
 * @description: 输入框函数组件
 */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react';
import Icon from '../Icon/icon';

/* Input组件类型定义 */
type InputSize = 'sm' | 'lg';
/* Input属性接口定义 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /* 设置Input大小 */
  size?: InputSize;
  /* 添加图标 */
  icon?: IconProp;
  /* 是否禁用Input */
  disabled?: boolean;
  /* 添加前缀 */
  prepend?: string | ReactElement;
  /* 添加后缀 */
  append?: string | ReactElement;
  /* 更新事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/* Input函数组件 */
export const Input: FC<InputProps> = (props) => {
  const { size, icon, disabled, prepend, append, style, ...restProps } = props || {};
  /* 样式集合 */
  const classes = classNames('doga-input', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });

  /* 处理默认值问题 */
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} style={style} data-testid='test-input'>
      {prepend && <div className='doga-input-group-prepend'>{prepend}</div>}
      {icon && !append && (
        <div className='icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className='doga-input-inner' disabled={disabled} {...restProps} />
      {append && <div className='doga-input-group-append'>{append}</div>}
    </div>
  );
};

export default Input;
