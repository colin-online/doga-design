/*
 * @Author: 东林
 * @Date: 2022-03-16 14:56:31
 * @description: 滑动条函数组件
 */
import React, { ChangeEvent, FC, InputHTMLAttributes, useCallback } from 'react';

export interface SliderProps extends InputHTMLAttributes<HTMLElement> {
  /* 是否禁用 */
  disabled?: boolean;
  /* 数值 */
  value: number;
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
export const Slider: FC<SliderProps> = props => {
  const { value, min, max, step, append, onChange, ...restProps }: any = props;

  /* 执行根据步长进度计算 */
  const countProgress = (value: any) => {
    return ((value - min) / (max - min)) * 100;
  };

  /* 执行移动滑块返回值操作 */
  const handleMoveSliderChange = useCallback(
    (val: any) => {
      if (onChange) {
        onChange(val);
      }
    },
    [onChange]
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
    <div className="doga-slider">
      <input
        {...restProps}
        className="doga-slider-inner"
        type="range"
        min={min}
        max={max}
        step={step}
        style={{
          backgroundImage: `linear-gradient(to right, #555 0%, #555 ${countProgress(value)}%, #f0f3f4 ${countProgress(value)}%, #f0f3f4 100%)`,
        }}
        onChange={e => handleMoveSliderChange(e?.target?.value)}
      />
      {
        <div className="doga-slider-count">
          {value}
          {append && <small>{append}</small>}
        </div>
      }
    </div>
  );
};

/* Slider默认属性设置 */
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

export default Slider;
