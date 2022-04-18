/*
 * @Author: 东林
 * @Date: 2022-03-17 12:20:11
 * @description: 常用工具
 */
import COS from 'cos-js-sdk-v5';
import { CloudProps } from '../components/Image/Cropper';

/* 获取文件名称 */
export const getPictureName = (folderName = 'UI-Component/cropper-component', fileName = '') => {
  // 随机数
  function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const date = new Date();
  const pictureName = `${folderName}/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}/` + new Date().getTime() + rand(1000, 9999) + `${fileName}`;
  return pictureName;
};

/* 上传图片到腾讯云 */
export const cloudUploadFile = (file: File, cloud: CloudProps, onProgress?: any, onError?: any): any => {
  // 初始化实例
  const cos = new COS({
    SecretId: cloud?.SecretId,
    SecretKey: cloud?.SecretKey,
  });
  const promise = new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: cloud?.Bucket /* 必须 */,
        Region: cloud?.Region /* 存储桶所在地域，必须字段 */,
        Key: getPictureName(cloud?.folderName, file.name) /* 必须 */,
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function (info: any) {
          /* 进度 */
          // const percent = (parseInt(info.percent, 10) * 10000) / 100;
          // const speed = ((parseInt(info.speed, 10) / 1024 / 1024) * 100) / 100;
          // console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
          onProgress(info);
        },
      },
      (err, data) => {
        if (err && !data) {
          onError(err);
          reject(err);
        }
        resolve(`https://${data.Location}`);
      }
    );
  });
  return promise;
};
