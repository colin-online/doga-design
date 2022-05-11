/*
 * @Author: 东林
 * @Date: 2022-03-16 17:39:20
 * @description: 图片函数组件
 */
import classNames from 'classnames';
import React, { createRef, FC, useCallback, useRef, useState } from 'react';
import Button from '../Button';
import CloudUpload from '../CloudUpload';
import Popup from '../Popup';
import Cropper, { CloudProps } from './Cropper';

/* 图片组件属性接口定义 */
export interface ImageProps {
  /* 图片 */
  src?: string;
  /* OSS对象存储参数 */
  cloud?: CloudProps;
  /* 是否可更换 */
  isReplace?: boolean;
  /* 是否可裁剪 */
  isCropper?: boolean;
  /* 是否可调色 */
  isTint?: boolean;
  /* 是否可还原 */
  isRestore?: boolean;
  /* 是否可删除 */
  isRemove?: boolean;
  /* 更新操作 */
  onChange?: (data: any) => void;
}

/* Image函数组件 */
export const Image: FC<ImageProps> = props => {
  /* 属性 */
  const { src = '', cloud, isReplace, isCropper, isTint, isRestore, isRemove, onChange } = props || {};
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
  const handleUploadSuccessClick = useCallback(
    (data: any) => {
      if (data) {
        setPicture(data);
        setCropperPicture(data);
        if (onChange) onChange(data);
      }
    },
    [onChange]
  );

  /* 执行显示裁剪面板操作 */
  const handleCropperChange = useCallback(() => {
    if (!picture) return;
    setIsShowCropper(!isShowCropper);
  }, [picture, isShowCropper]);

  /* 执行裁剪成功操作 */
  const handleCropperClick = useCallback(async () => {
    if (childrenRef.current) {
      const cropperURL = await childrenRef.current.handleCropperSuccessClick();
      setCropperPicture(cropperURL);
      if (onChange) onChange(cropperURL);
      setIsShowCropper(false);
    }
  }, [childrenRef, onChange]);

  /* 执行还原照片操作 */
  const handleRestoreClick = useCallback(() => {
    setCropperPicture(picture);
    if (onChange) onChange(picture);
  }, [picture, onChange]);

  /* 执行照片删除操作 */
  const handleRemoveClick = useCallback(() => {
    setPicture('');
    setCropperPicture('');
    if (onChange) onChange('');
  }, [onChange]);

  return (
    <div className={classes}>
      {/* 图片 */}
      {picture && (
        <div className="doga-image-picture">
          <img alt="" src={cropperPicture} ref={pictureRef} />
        </div>
      )}
      {/* 更换功能 */}
      {isReplace && cloud && (
        <CloudUpload cloud={cloud} onChange={data => handleUploadSuccessClick(data)} accept="image/*">
          <Button block>{picture ? '更换' : '上传'}图片</Button>
        </CloudUpload>
      )}
      {/* 功能组 */}
      <div className="doga-image-handle">
        {/* 裁剪功能 */}
        {isCropper && cloud && (
          <>
            <Popup title="裁剪图片" maskClosable onClose={handleCropperChange} visible={isShowCropper} width={520}>
              <Cropper src={picture} cloud={cloud} childrenRef={childrenRef} />
              <div className="doga-cropper-handle">
                <Button btnType="text" onClick={handleCropperChange}>
                  取消
                </Button>
                <Button onClick={handleCropperClick}>保存</Button>
              </div>
            </Popup>
            <Button block onClick={handleCropperChange}>
              裁剪
            </Button>
          </>
        )}
        {isCropper && isTint && <span className="doga-cropper-space" />}
        {/* 调色功能 */}
        {isTint && <Button block>调色</Button>}
      </div>
      {/* 功能组 */}
      <div className="doga-image-handle">
        {/* 还原功能 */}
        {isRestore && (
          <Button block onClick={() => handleRestoreClick()}>
            还原
          </Button>
        )}
        {isRestore && isRemove && <span className="doga-cropper-space" />}
        {/* 删除功能 */}
        {isRemove && (
          <Button block onClick={() => handleRemoveClick()}>
            删除
          </Button>
        )}
      </div>
    </div>
  );
};

export default Image;
