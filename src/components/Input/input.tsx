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
  /* 前置图标 */
  prependIcon?: IconProp;
  /* 后置图标 */
  appendIcon?: IconProp;
  /* 是否禁用 */
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
  const { size, appendIcon, prependIcon, disabled, prepend, append, style, ...restProps } = props || {};
  /* 样式集合 */
  const classes = classNames('doga-input', {
    [`input-size-${size}`]: size,
    'is-prepend-icon': !!prependIcon && !prepend,
    'is-append-icon': !!appendIcon && !append,
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
      {/* 前缀 */}
      {prepend && <div className='doga-input-group-prepend'>{prepend}</div>}
      {/* 前置Icon */}
      {prependIcon && !prepend && (
        <div className='prepend-icon-wrapper'>
          <Icon icon={prependIcon} title={`title-${prependIcon}`} />
        </div>
      )}
      {/* 文本框 */}
      <input {...restProps} className='doga-input-inner' disabled={disabled} />
      {/* 后缀 */}
      {append && <div className='doga-input-group-append'>{append}</div>}
      {/* 后置Icon */}
      {appendIcon && !append && (
        <div className='append-icon-wrapper'>
          <Icon icon={appendIcon} title={`title-${appendIcon}`} />
        </div>
      )}
    </div>
  );
};

export default Input;
