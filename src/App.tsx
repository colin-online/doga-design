import React, { FC } from 'react';
// import Upload from './components/Upload';
import './styles/index.scss';

// const Bucket = 'doga-design-1309714699'; /* 存储桶，必须字段 */
// const Region = 'ap-shanghai'; /* 存储桶所在地域，必须字段 */
// SecretId: 'AKIDoRpysWv4yc1A4i7GAoIXXHl00kETSBft',
// SecretKey: '1mHXZMuCF2asviFXZLtBD0cz67uRjlY5',

export const App: FC<any> = (props) => {
  return (
    <div style={{ margin: '30px' }}>
      {/* <Image
        src='https://fengyuanchen.github.io/cropperjs/images/picture.jpg'
        cloud={{
          Bucket: 'doga-design-1309714699',
          Region: 'ap-shanghai',
          SecretId: 'AKIDoRpysWv4yc1A4i7GAoIXXHl00kETSBft',
          SecretKey: '1mHXZMuCF2asviFXZLtBD0cz67uRjlY5',
          folderName: 'UI-Component/cropper-component',
        }}
        isReplace
        isCropper
        isRestore
      /> */}
      {/* <Upload
        action='https://jsonplaceholder.typicode.com/posts'
        name='file'
        onProgress={(e) => console.log('onProgress', e)}
        onSuccess={() => console.log('onSuccess')}
        onError={() => console.log('onError')}
        onChange={() => console.log('onChange')}
        onRemove={() => console.log('onRemove')}
        beforeUpload={(file) => {
          console.log(file);
          return true;
        }}
        accept='.jpg'
        multiple
      >
        <Botton>替换图片</Botton>
      </Upload> */}
    </div>
  );
};

export default App;
