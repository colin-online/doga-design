/*
 * @Author: 东林
 * @Date: 2022-03-16 21:47:31
 * @description: 弹出框函数组件
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';

/* Portal组件接口定义 */
export type nodeProps = PropsWithChildren<{
  node?: HTMLElement;
}>;

export type Position = 'top' | 'right' | 'bottom' | 'left' | 'center';

type PortalPropsWithoutChildren = {
  /* 样式名称 */
  className?: string;
  /* 样式 */
  style?: any;
  /* 宽度 */
  width?: number;
  /* 标题 */
  title?: string;
  /* 节点 */
  node?: HTMLElement;
  /* 显示隐藏 */
  visible?: boolean;
  /* 位置 */
  position?: Position;
  /* 点击蒙层是否关闭 */
  maskClosable?: boolean;
  /* 元素挂载节点 */
  destroyOnClose?: boolean;
  /* 关闭操作 */
  onClose?: () => void;
};

/* Portal组件接口定义 */
export type PortalProps = PropsWithChildren<PortalPropsWithoutChildren>;

/* 判断是否为浏览器环境 */
const isUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const Portal = (props: PortalProps) => {
  const { node, children } = props || {};
  /* 组件样式 */
  const classes = classNames('doga-popup', {});
  // 使用ref记录内部创建的节点 初始值为null
  const defaultNodeRef = React.useRef<HTMLElement | null>(null);

  /* 执行卸载节点 */
  useEffect(
    () => () => {
      if (defaultNodeRef.current) {
        document.body.removeChild(defaultNodeRef.current);
      }
    },
    [],
  );
  /* 判断是否浏览器环境 */
  if (!isUseDOM) return null;

  /* 若用户未传入节点，Portal也未创建节点，则创建节点并添加至body */
  if (!node && !defaultNodeRef.current) {
    // /* 创建节点 */
    const defaultNode = document.createElement('div');
    // /* 节点样式 */
    defaultNode.className = classes;
    // /* 插入节点 */
    defaultNodeRef.current = defaultNode;
    document.body.appendChild(defaultNode);
  }

  return ReactDOM.createPortal(children, (node || defaultNodeRef.current)!);
};

Portal.propTypes = {
  node: isUseDOM ? PropTypes.instanceOf(HTMLElement) : PropTypes.any,
  children: PropTypes.node,
};

export default Portal;
