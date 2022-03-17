/*
 * @Author: 东林
 * @Date: 2022-03-16 14:56:31
 * @description: 滑动条函数组件
 */
import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

export interface SliderProps extends InputHTMLAttributes<HTMLElement> {
  /* 是否禁用 */
  disabled?: boolean;
  /* 最小值 */
  min?: number;
  /* 最大值 */
  max?: number;
  /* 步长 */
  step?: number;
  /* 后缀 */
  append?: string;
  /* 更新事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement> | any) => void;
}

/* Slider函数组件 */
export const Slider: FC<SliderProps> = (props) => {
  const { value, min, max, step, append, ...restProps }: any = props;

  /* 执行根据步长进度计算 */
  const countProgress = (value: any) => value * (step < 1 ? step * 10 : step) || 0;

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
    <div className='doga-slider'>
      <input
        {...restProps}
        className='doga-slider-inner'
        type='range'
        min={min || 0}
        max={max || 100}
        step={step || 1}
        style={{
          backgroundImage: `linear-gradient(to right, #555 0%, #555 ${countProgress(value)}%, #f0f3f4 ${countProgress(value)}%, #f0f3f4 100%)`,
        }}
      />
      {append && (
        <div className='doga-slider-count'>
          {value}
          {<small>{append}</small>}
        </div>
      )}
    </div>
  );
};

export default Slider;
