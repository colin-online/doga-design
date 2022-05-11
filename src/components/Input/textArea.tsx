/*
 * @Author: 东林
 * @Date: 2022-03-15 22:24:58
 * @description: 文本域组件
 */
import classNames from 'classnames';
import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

/* 文本域属性接口定义 */
export interface TextAreaProps extends InputHTMLAttributes<HTMLElement> {
  /* 是否禁用 */
  disabled?: boolean;
  /* 自适应高度 */
  autosize?: boolean;
  /* 内容最大长度 */
  maxLength?: number;
  /* 是否显示字数 */
  showCount: boolean;
  /* 简短提示 */
  placeholder: string;
  /* 可见宽度 */
  cols: number;
  /* 可见行数 */
  rows: number;
  /* 更新事件 */
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextArea: FC<TextAreaProps> = props => {
  const { disabled, autosize, showCount, maxLength, placeholder, cols, rows, className, style, ...restProps } = props;
  const classes = classNames('doga-textarea', className, {});

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
    <div className={classes} style={style}>
      {/* 文本域 */}
      <textarea
        className="doga-textarea-inner"
        style={{ ...style, resize: autosize ? 'none' : 'vertical' }}
        {...restProps}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
      />
      {/* 字数 */}
      {!!restProps?.value && showCount && (
        <div className="doga-textarea-count">
          {restProps?.value?.toString()?.length}
          {maxLength ? `/${maxLength}` : null}
        </div>
      )}
    </div>
  );
};

export default TextArea;
