/*
 * @Author: 东林
 * @Date: 2022-03-16 17:39:20
 * @description: 图片函数组件
 */
import classNames from 'classnames';
import React, { createRef, FC, useCallback, useRef, useState } from 'react';
import Botton from '../Botton';
import CloudUpload from '../CloudUpload';
import Popup from '../Popup';
import Cropper, { CloudProps } from './Cropper';

/* 图片组件属性接口定义 */
export interface ImageProps {
  /* 图片 */
  src: string;
  /* OSS对象存储参数 */
  cloud?: CloudProps;
  /* 是否可更换 */
  isReplace?: boolean;
  /* 是否可裁剪 */
  isCropper?: boolean;
  /* 是否可还原 */
  isRestore?: boolean;
  /* 更新操作 */
  onChange?: (data: any) => void;
}

/* Image函数组件 */
export const Image: FC<ImageProps> = (props) => {
  /* 属性 */
  const { src, cloud, isReplace, isRestore, isCropper, onChange } = props || {};
  /* 显示图片 */
  const [picture, setPicture] = useState<any>(src);
  /* 裁剪图片 */
  const [cropperPicture, setCropperPicture] = useState<any>(src);
  /* 图片Ref */
  const pictureRef = useRef<HTMLImageElement | null>(null);
  /* 裁剪组件显示状态 */
  const [isShowCropper, setIsShowCropper] = useState(false);
  /* 裁剪组件Ref */
  const childrenRef = createRef<any>();
  /* 样式 */
  const classes = classNames('doga-image', {});

  /* 上传成功 */
  const handleUploadSuccessClick = useCallback((data: any) => {
    if (data) {
      setPicture(data);
      setCropperPicture(data);
    }
  }, []);

  /* 执行显示裁剪面板操作 */
  const handleCropperChange = useCallback(() => setIsShowCropper(!isShowCropper), [isShowCropper]);

  /* 执行裁剪成功操作 */
  const handleCropperClick = useCallback(async () => {
    if (childrenRef.current) {
      const cropperURL = await childrenRef.current.handleCropperSuccessClick();
      setCropperPicture(cropperURL);
      if (onChange) {
        onChange(cropperURL);
      }
      setIsShowCropper(false);
    }
  }, [childrenRef, onChange]);

  /* 执行还原照片操作 */
  const handleRestoreClick = useCallback(() => {
    setCropperPicture(picture);
    if (onChange) {
      onChange(picture);
    }
  }, [picture, onChange]);

  return (
    <div className={classes}>
      {/* 图片 */}
      {picture && (
        <div className='doga-image-picture'>
          <img alt='' src={cropperPicture} ref={pictureRef} />
        </div>
      )}
      {/* 更换功能 */}
      {isReplace && cloud && (
        <CloudUpload cloud={cloud} onChange={(data) => handleUploadSuccessClick(data)} accept='image/*'>
          <Botton block>更换图片</Botton>
        </CloudUpload>
      )}
      {/* 功能组 */}
      <div className='doga-image-handle'>
        {/* 裁剪功能 */}
        {isCropper && cloud && (
          <>
            <Popup title='裁剪图片' maskClosable onClose={handleCropperChange} visible={isShowCropper} width={520}>
              <Cropper src={picture} cloud={cloud} childrenRef={childrenRef} />
              <div className='doga-cropper-handle'>
                <Botton btnType='text' onClick={handleCropperChange}>
                  取消
                </Botton>
                <Botton onClick={handleCropperClick}>保存</Botton>
              </div>
            </Popup>
            <Botton block onClick={handleCropperChange}>
              裁剪
            </Botton>
          </>
        )}
        {isCropper && isRestore && <span className='doga-cropper-space' />}
        {/* 还原功能 */}
        {isRestore && (
          <Botton block onClick={() => handleRestoreClick()}>
            还原
          </Botton>
        )}
      </div>
    </div>
  );
};

export default Image;
