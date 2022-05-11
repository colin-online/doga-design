/*
 * @Author: 东林
 * @Date: 2022-05-01 19:44:16
 * @description: 单选框组件
 */
import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';

/* Button类别类型定义 */
export type RadioType = 'solid' | 'text';

/* 选项属性类型定义 */
export type OptionProps = {
  /* 选项标签 */
  label: string;
  /* 选项数值 */
  value: any;
};

/* 单选框组件属性接口定义 */
export interface RadioProps {
  /* 是否选中 */
  checked: any;
  /* 选项集合 */
  options: Array<OptionProps>;
  /* 样式类型 */
  radioType?: RadioType;
  /* 样式 */
  className?: string;
  /* 更新事件 */
  onChange?: (value: any) => void;
}

export const Radio: FC<RadioProps> = props => {
  const { checked, options, radioType, onChange, className } = props || {};
  /* 当前选中选项 */
  const [selected, setSelected] = useState(checked);

  /* 执行切换选中选项操作 */
  const handleSelectedChange = useCallback(
    (value: any) => {
      setSelected(value);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  /* 组件样式 */
  const classes = classNames('doga-radio', className, {
    [`doga-radio-${radioType}`]: radioType,
  });

  return (
    <div className={classes}>
      {(options || []).map((option, index) => {
        const { label, value } = option || {};
        return (
          <div key={index} className={classNames('children', selected === value ? 'selected' : '')} onClick={() => handleSelectedChange(value)}>
            <small>{label}</small>
          </div>
        );
      })}
    </div>
  );
};

/* Radio默认属性设置 */
Radio.defaultProps = {
  radioType: 'solid',
};

export default Radio;
