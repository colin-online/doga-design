/*
 * @Author: 东林
 * @Date: 2022-03-16 23:15:01
 * @description: 裁剪函数组件
 */
import classNames from 'classnames';
import Crop from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import React, { FC, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { cloudUploadFile } from '../../utils';

/* OSS对象存储参数接口定义 */
export type CloudProps = {
  /* 存储桶 */
  Bucket: string;
  /* 存储桶所在地域 */
  Region: string;
  /* 密钥SecretId */
  SecretId: string;
  /* 密钥SecretKey */
  SecretKey: string;
  /* 存储文件夹名称 */
  folderName: string;
};

/* 裁剪图片接口定义 */
export interface CropperProps {
  /* 当前图片资源 */
  src: string;
  /* OSS对象存储入参 */
  cloud?: CloudProps;
  /* 子项 */
  childrenRef?: any;
}
/* 裁剪图片数据接口定义 */
export interface CropperDataProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
}
let cropper: Crop;

/* Cropper函数组件 */
export const Cropper: FC<CropperProps> = props => {
  const { src, cloud, childrenRef } = props || {};
  /* 裁剪图片 */
  const cropperPictureRef = useRef<null | HTMLImageElement>(null);
  /* 裁剪图片数据 */
  const [cropperData, setCropperData] = useState<CropperDataProps | null>(null);
  /* 组件样式 */
  const classes = classNames('doga-cropper', {});
  /* 图片旋转角度 */

  /* 执行裁剪成功操作 */
  useImperativeHandle(childrenRef, () => ({
    handleCropperSuccessClick: () => {
      // 再次上传的处理方法（❗️这里后续实现需要采用Node中间层处理）
      if (cloud) {
        const promise = new Promise(resolve => {
          cropper.getCroppedCanvas().toBlob(async (blob: any) => {
            const file = new window.File([blob], 'fileName.png', { type: 'png' });
            const result = await cloudUploadFile(file, cloud);
            resolve(result);
          });
        });
        return promise;
      } else {
        const { x, y, width, height } = cropperData || {};
        const cropperURL = `${src.split('?')[0]}?imageMogr2/cut/${width}x${height}x${y}x${x}`;
        return cropperURL;
      }
    },
  }));

  /* 实例化裁剪 */
  useEffect(() => {
    if (cropperPictureRef.current) {
      cropper = new Crop(cropperPictureRef.current, {
        crop(event: any) {
          const { x, y, width, height, rotate } = event.detail || {};
          setCropperData({
            x: Math.floor(x),
            y: Math.floor(y),
            width: Math.floor(width),
            height: Math.floor(height),
            rotate: Math.floor(rotate),
          });
        },
      });
    }
    return () => {
      if (cropper) {
        cropper.destroy();
      }
    };
  }, []);

  /* 执行图片还原操作 */
  const handleRestoreClick = useCallback(() => cropper.reset(), []);

  /* 执行开启/关闭图片操作 */
  const [lock, setLock] = useState<boolean>(false);
  const handleLockClick = useCallback((status: boolean) => {
    if (status) {
      cropper.enable();
      setLock(false);
    } else {
      cropper.disable();
      setLock(true);
    }
  }, []);

  /* 执行图片左/右旋转操作 */
  const handleRotateClick = useCallback((status: boolean) => {
    if (status) {
      cropper.rotate(-15);
    } else {
      cropper.rotate(15);
    }
  }, []);

  /* 执行图片水平/垂直翻转操作 */
  const [scaleX, setScaleX] = useState<boolean>(true);
  const [scaleY, setScaleY] = useState<boolean>(true);
  const handleFlipClick = useCallback(
    (status: boolean) => {
      if (status) {
        setScaleX(!scaleX);
        cropper.scaleX(scaleX ? -1 : 1);
      } else {
        setScaleY(!scaleY);
        cropper.scaleY(scaleY ? -1 : 1);
      }
    },
    [scaleX, scaleY]
  );

  /* 执行图片上/下/左/右平移操作 */
  const handleMoveClick = useCallback((x: number, y: number) => cropper.move(x, y), []);

  /* 键盘控制事件 */
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp' /* 向上键 */:
          handleMoveClick(0, -10);
          break;
        case 'ArrowDown' /* 向下键 */:
          handleMoveClick(0, 10);
          break;
        case 'ArrowLeft' /* 向左键 */:
          handleMoveClick(-10, 0);
          break;
        case 'ArrowRight' /* 向右键 */:
          handleMoveClick(10, 0);
          break;
        default:
          break;
      }
    });
  }, [handleMoveClick]);

  return (
    <div className={classes}>
      {/* 操作事件 */}
      <div className="doga-cropper-picture-handle">
        {/* 还原 */}
        <div className="doga-cropper-picture-handle-icon" onClick={() => handleRestoreClick()}>
          <div className="doga-cropper-picture-handle-tip">还原图片</div>
          <i className="iconfont icon-recover" />
        </div>
        {/* 水平翻转 */}
        <div className="doga-cropper-picture-handle-icon" onClick={() => handleFlipClick(true)}>
          <div className="doga-cropper-picture-handle-tip">水平翻转</div>
          <i className="iconfont icon-horizontal" />
        </div>
        {/* 垂直翻转 */}
        <div className="doga-cropper-picture-handle-icon" onClick={() => handleFlipClick(false)}>
          <div className="doga-cropper-picture-handle-tip">垂直翻转</div>
          <i className="iconfont icon-vertical" />
        </div>
        {/* 左旋 */}
        <div className="doga-cropper-picture-handle-icon" onClick={() => handleRotateClick(true)}>
          <div className="doga-cropper-picture-handle-tip">向左旋转</div>
          <i className="iconfont icon-rotate-left" />
        </div>
        {/* 右旋 */}
        <div className="doga-cropper-picture-handle-icon" onClick={() => handleRotateClick(false)}>
          <div className="doga-cropper-picture-handle-tip">向右旋转</div>
          <i className="iconfont icon-rotate-right" />
        </div>
      </div>
      {/* 图片 */}
      <img className="doga-cropper-picture" ref={cropperPictureRef} alt="" src={src} />

      {/* 开启/关闭锁 */}
      <div className="doga-cropper-picture-handle-lock" onClick={() => handleLockClick(lock)}>
        {lock && <i className="iconfont icon-lock" />}
        {!lock && <i className="iconfont icon-unlock" />}
      </div>
    </div>
  );
};

export default Cropper;
