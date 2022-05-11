/*
 * @Author: 东林
 * @Date: 2022-03-14 22:01:35
 * @description: 拖拽函数组件
 */
import classNames from 'classnames';
import React, { FC, ReactNode, DragEvent, useState } from 'react';

/* 拖拽属性接口定义 */
interface DraggerProps {
  children?: ReactNode;
  onFile: (files: FileList) => void;
}

/* Dragger函数组件 */
export const Dragger: FC<DraggerProps> = props => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames('doga-uploader-dragger', {
    'is-dragover': dragOver,
  });

  /* 执行放置操作 */
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  /* 执行拖拽操作 */
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  return (
    <div className={classes} onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default Dragger;
