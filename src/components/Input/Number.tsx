/*
 * @Author: 东林
 * @Date: 2022-03-15 23:41:34
 * @description: 数字框组件
 */

import classNames from 'classnames';
import React, { ChangeEvent, FC, InputHTMLAttributes, useCallback, useRef } from 'react';

/* 数字框属性接口定义 */
export interface NumberProps extends InputHTMLAttributes<HTMLElement> {
  /* 是否禁用 */
  disabled?: boolean;
  /* 更新事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement> | any) => void;
}

/* Number函数组件 */
export const Number: FC<NumberProps> = (props) => {
  const { disabled, onChange, style, ...restProps } = props;
  const inputValueRef = useRef<HTMLInputElement | any>();
  const classes = classNames('doga-number', {
    'is-disabled': disabled,
  });

  /* 执行增减操作 */
  const handleClick = useCallback(
    (status: boolean) => {
      if (onChange) {
        if (inputValueRef) {
          if (status) {
            inputValueRef.current.value++;
          } else {
            inputValueRef.current.value--;
          }
        }
        onChange(inputValueRef.current.value);
      }
    },
    [onChange],
  );

  /* 处理默认值问题 */
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null || isNaN(value)) {
      return '';
    }
    return value;
  };
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} style={style}>
      {/* 数字框 */}
      <input ref={inputValueRef} {...restProps} onChange={onChange} className='doga-number-inner' step='1' min={1} max='Infinity' type='number' disabled={disabled} />
      <div className={classNames('doga-number-step', disabled ? 'is-disabled' : '')}>
        <span className='doga-number-step-increase' onClick={() => handleClick(true)}>
          +
        </span>
        <span className='doga-number-step-decrease' onClick={() => handleClick(false)}>
          -
        </span>
      </div>
    </div>
  );
};

export default Number;
