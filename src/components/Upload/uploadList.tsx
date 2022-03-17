/*
 * @Author: 东林
 * @Date: 2022-03-14 20:33:39
 * @description: 上传列表函数组件
 */
import React, { FC } from 'react';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';
import { UploadFileProps } from './upload';

interface UploadListProps {
  fileList: UploadFileProps[];
  onRemove: (_file: UploadFileProps) => void;
}

/* UploadList函数组件 */
export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className='doga-upload-list'>
      {fileList.map((item) => {
        return (
          <li className='doga-upload-list-item' key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon='file-alt' theme='secondary' />
              {item.name}
            </span>
            <span className='file-status'>
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon='spinner' spin theme='primary' />}
              {item.status === 'success' && <Icon icon='check-circle' theme='success' />}
              {item.status === 'error' && <Icon icon='times-circle' theme='danger' />}
            </span>
            <span className='file-actions'>
              <Icon
                icon='times'
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
