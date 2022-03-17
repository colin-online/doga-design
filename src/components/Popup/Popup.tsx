/*
 * @Author: 东林
 * @Date: 2022-03-16 22:31:58
 * @description: 弹出框函数组件
 */
import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import Icon from '../Icon';
import Transition from '../Transition';
import Portal, { PortalProps } from './Portal';

export const Popup: FC<PortalProps> = (props) => {
  const firstRenderRef = useRef(false);
  const { visible } = props;
  /* 在首次visible为true之前，都应该返回null */
  if (!firstRenderRef.current && !visible) return null;
  if (!firstRenderRef.current) {
    firstRenderRef.current = true;
  }

  /* 属性 */
  const { node, maskClosable, onClose, className, destroyOnClose, title, width, children } = props;

  /* 组件样式 */
  const classes = classNames('doga-popup', className, {});

  /* 执行蒙层点击关闭事件 */
  const onMaskClick = () => {
    if (maskClosable) {
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Transition in={visible} animation='zoom-in-center' timeout={300} unmountOnExit={destroyOnClose} appear onExited={() => {}}>
      <Portal node={node}>
        <div className={classes}>
          <div className='doga-popup-modal' onClick={onMaskClick}></div>
          <div className='doga-popup-wrapper' style={{ width: width ? `${width}px` : 'auto' }}>
            <div className='doga-popup-title'>
              {title}
              <div className='doga-popup-close' onClick={onClose}>
                <Icon icon='close' />
              </div>
            </div>
            <div className='doga-popup-content'>{children}</div>
          </div>
        </div>
      </Portal>
    </Transition>
  );
};

export default Popup;
