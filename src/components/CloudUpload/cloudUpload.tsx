/*
 * @Author: 东林
 * @Date: 2022-03-14 18:34:02
 * @description: 云上传函数组件
 */
import React, { FC, ReactNode, ChangeEvent, useCallback, useRef } from 'react';
import { cloudUploadFile } from '../../utils';
import { CloudProps } from '../Image/Cropper';
import Dragger from './dragger';

/* 上传文件状态 */
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

/* CloudUpload属性接口定义 */
export interface CloudUploadProps {
  /* 云对象存储参数 */
  cloud: CloudProps;
  /* 支持格式 */
  accept?: string;
  /* 多选 */
  multiple?: boolean;
  /* 拖拽 */
  drag?: boolean;
  /* 内容 */
  children?: ReactNode;
  /* 前置校验 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /* 上传进度 */
  onProgress?: (percentage: number, file: File) => void;
  /* 上传成功 */
  onSuccess?: (data: any, file: File) => void;
  /* 上传失败 */
  onError?: (err: any, file: File) => void;
  /* 更新操作 */
  onChange?: (data: any) => void;
  /* 删除操作 */
  onRemove?: (file: File) => void;
}

/* CloudUpload函数组件 */
export const CloudUpload: FC<CloudUploadProps> = props => {
  const {
    cloud,
    accept,
    multiple,
    drag,
    beforeUpload,
    onChange,
    onProgress,
    onError,
    // onSuccess, onRemove,
    children,
  } = props || {};
  /* 文件上传控件 */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* 上传文件逻辑 */
  const onPostFile = useCallback(
    async (file: File) => {
      const result = await cloudUploadFile(file, cloud, onProgress, onError);
      if (onChange) {
        onChange(result);
      }
    },
    [cloud, onChange, onProgress, onError]
  );

  /* 执行点击上传控件操作 */
  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  /* 执行上传文件操作 */
  const handleUploadFiles = useCallback(
    (files: FileList) => {
      const postFiles = Array.from(files);
      postFiles.forEach(file => {
        if (!beforeUpload) {
          onPostFile(file);
        } else {
          const result = beforeUpload(file);
          if (result && result instanceof Promise) {
            result.then(processedFile => {
              onPostFile(processedFile);
            });
          } else if (result !== false) {
            onPostFile(file);
          }
        }
      });
    },
    [beforeUpload, onPostFile]
  );

  /* 执行删除文件操作 */
  // const handleRemove = useCallback(
  //   (file: File) => {
  //     if (file) {
  //       if (onRemove) {
  //         onRemove(file);
  //       }
  //     }
  //   },
  //   [onRemove],
  // );

  /* 监听文件变化 */
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) {
        return;
      }
      /* 上传文件 */
      handleUploadFiles(files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleUploadFiles]
  );

  return (
    <div className="doga-cloud-upload">
      <div className="doga-cloud-upload-input" onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={files => {
              handleUploadFiles(files);
            }}
          >
            {children ? (
              children
            ) : (
              <>
                <i className="iconfont icon-cloud-upload" />
                <p>将文件拖到此处上传</p>
              </>
            )}
          </Dragger>
        ) : (
          children
        )}
        <input className="doga-cloud-upload-file-input" style={{ display: 'none' }} type="file" ref={fileInputRef} accept={accept} multiple={multiple} onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default CloudUpload;
