/*
 * @Author: 东林
 * @Date: 2022-03-14 18:34:02
 * @description: 上传函数组件
 */
import axios from 'axios';
import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import Icon from '../Icon';
import Dragger from './dragger';
import UploadList from './uploadList';

/* 上传文件状态 */
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
/* 上传文件接口定义 */
export interface UploadFile {
  uid: string /* 唯一标识 */;
  size: number /* 大小 */;
  name: string /* 名称 */;
  status?: UploadFileStatus /* 状态 */;
  percent?: number /* 进度 */;
  raw?: File /* 文件 */;
  response?: any /* 返回数据 */;
  error?: any /* 错误 */;
}

/* Upload属性接口定义 */
export interface UploadProps {
  /* 上传链接 */
  action: string;
  /* 请求头配置 */
  headers?: { [key: string]: any };
  /* 名称 */
  name?: string;
  /* 扩展数据 */
  data?: { [key: string]: any };
  /* 凭证 */
  withCredentials?: boolean;
  /* 支持格式 */
  accept?: string;
  /* 多选 */
  multiple?: boolean;
  /* 拖拽 */
  drag?: boolean;
  /* 默认文件列表 */
  defaultFileList?: UploadFile[];
  /* 前置校验 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /* 上传进度 */
  onProgress?: (percentage: number, file: File) => void;
  /* 上传成功 */
  onSuccess?: (data: any, file: File) => void;
  /* 上传失败 */
  onError?: (err: any, file: File) => void;
  /* 更新操作 */
  onChange?: (file: File) => void;
  /* 删除操作 */
  onRemove?: (file: UploadFile) => void;
}

/* Upload函数组件 */
export const Upload: FC<UploadProps> = (props) => {
  const { name, data, headers, withCredentials, accept, multiple, drag, action, defaultFileList, beforeUpload, onProgress, onSuccess, onError, onChange, onRemove, children } = props || {};
  /* 文件上传控件 */
  const fileInputRef = useRef<HTMLInputElement>(null);
  /* 文件列表 */
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  /* 执行更新列表操作 */
  const updateFileList = useCallback((updateFile: UploadFile, updateObject: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObject };
        } else {
          return file;
        }
      });
    });
  }, []);

  /* 上传文件逻辑 */
  const onPostFile = useCallback(
    (file: File) => {
      let _file: UploadFile = {
        uid: `doga_upload_file_${Date.now()}`,
        status: 'ready',
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file,
      };
      setFileList((prevList) => {
        return [_file, ...prevList];
      });
      const formData = new FormData();
      formData.append(name || 'file', file);
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      axios
        .post(action, formData, {
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials,
          onUploadProgress: (e) => {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              updateFileList(_file, {
                percent: percentage,
                status: 'uploading',
              });
              if (onProgress) {
                onProgress(percentage, file);
              }
            }
          },
        })
        .then((response) => {
          updateFileList(_file, {
            status: 'success',
            response: response?.data,
          });
          if (onSuccess) {
            onSuccess(response.data, file);
          }
        })
        .catch((error) => {
          console.error(error);
          updateFileList(_file, {
            status: 'error',
            error,
          });
          if (onError) {
            onError(error, file);
          }
        })
        .finally(() => {
          if (onChange) {
            onChange(file);
          }
        });
    },
    [name, data, headers, withCredentials, action, onProgress, onSuccess, onError, onChange, updateFileList],
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
      let postFiles = Array.from(files);
      postFiles.forEach((file) => {
        if (!beforeUpload) {
          onPostFile(file);
        } else {
          const result = beforeUpload(file);
          if (result && result instanceof Promise) {
            result.then((processedFile) => {
              onPostFile(processedFile);
            });
          } else if (result !== false) {
            onPostFile(file);
          }
        }
      });
    },
    [beforeUpload, onPostFile],
  );

  /* 执行删除文件操作 */
  const handleRemove = useCallback(
    (file: UploadFile) => {
      setFileList((prevList) => {
        return prevList.filter((item) => item.uid !== file.uid);
      });
      if (onRemove) {
        onRemove(file);
      }
    },
    [onRemove],
  );

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
    [handleUploadFiles],
  );

  return (
    <div className='doga-upload'>
      <div className='doga-upload-input' style={{ display: 'inline-block' }} onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              handleUploadFiles(files);
            }}
          >
            {children ? (
              children
            ) : (
              <>
                <Icon icon='upload' size='5x' theme='secondary' />
                <br />
                <p>将文件拖到此处上传</p>
              </>
            )}
          </Dragger>
        ) : (
          children
        )}
        <input className='doga-file-input' style={{ display: 'none' }} type='file' ref={fileInputRef} accept={accept} multiple={multiple} onChange={handleFileChange} />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

/* Upload默认属性设置 */
Upload.defaultProps = {
  name: 'file',
};

export default Upload;
