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
  /* 最小值 */
  min?: number;
  /* 最大值 */
  max?: number;
  /* 更新事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement> | any) => void;
}

/* Number函数组件 */
export const Number: FC<NumberProps> = props => {
  const { disabled, min, max, onChange, style, ...restProps } = props;
  const inputValueRef = useRef<HTMLInputElement | any>();
  const classes = classNames('doga-number', {
    'is-disabled': disabled,
  });

  /* 执行增减数值操作 */
  const handleClick = useCallback(
    (status: boolean) => {
      if (onChange && inputValueRef) {
        if (status) {
          if (max !== undefined && parseInt(inputValueRef.current.value, 10) < max) inputValueRef.current.value++;
        } else {
          if (min !== undefined && parseInt(inputValueRef.current.value, 10) > min) inputValueRef.current.value--;
        }
        onChange(parseInt(inputValueRef.current.value, 10));
      }
    },
    [min, max, onChange]
  );

  /* 执行输入操作 */
  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      if ((min && parseInt(e.target.value, 10) < min) || (max && parseInt(e.target.value, 10) > max)) return;
      if (onChange) onChange(parseInt(e.target.value, 10));
    },
    [min, max, onChange]
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
      <input ref={inputValueRef} {...restProps} onChange={e => handleChange(e)} className="doga-number-inner" step="1" min={min} max={max || Infinity} type="number" disabled={disabled} />
      <div className={classNames('doga-number-step', disabled ? 'is-disabled' : '')}>
        {/* 增加 */}
        <span className="doga-number-step-increase" onClick={() => handleClick(true)}>
          +
        </span>
        {/* 减少 */}
        <span className="doga-number-step-decrease" onClick={() => handleClick(false)}>
          -
        </span>
      </div>
    </div>
  );
};

export default Number;
