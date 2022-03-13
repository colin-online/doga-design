/*
 * @Author: 东林
 * @Date: 2022-03-13 23:25:29
 * @description: Transition函数组件
 */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

/* 动画名称类型定义 */
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

/* 动画属性类型定义 */
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};

/* Transition函数组件 */
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

/* Transition默认属性设置 */
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
