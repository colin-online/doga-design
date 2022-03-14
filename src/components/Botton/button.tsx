/*
 * @Author: 东林
 * @Date: 2022-03-13 01:52:24
 * @description: 按钮函数组件
 */
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from 'react';

export type ButtonSize = 'lg' | 'sm'; // Button尺寸类型定义
export type ButtonType = 'primary' | 'default' | 'success' | 'warning' | 'info' | 'danger' | 'text' | 'link'; // Button类别类型定义

/* Button属性接口定义 */
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: ReactNode;
}

/* 原生Button属性接口类型 */
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; /* Button属性类型定义 */

/* Button函数组件 */
export const Button: FC<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, href, children, ...restProps } = props || {};
  /* 样式集合 */
  const classes = classNames('doga-btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });
  /* Link按钮 */
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    /* 其他按钮 */
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

/* Button默认属性设置 */
Button.defaultProps = {
  btnType: 'default',
  disabled: false,
};

export default Button;
