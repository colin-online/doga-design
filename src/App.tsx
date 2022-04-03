import React, { FC, useCallback, useState } from 'react';
import Input from './components/Input';
import CloudUpload from './components/CloudUpload';
import Image from './components/Image';
import Menu from './components/Menu';
import Upload from './components/Upload';


import './styles/index.scss';

export const App: FC<any> = (props) => {
  const [count, setCount] = useState(0)

  const handleChange = useCallback((val) => {
    console.log(val)
    setCount(val)
  }, [])
  return (
    <div style={{ margin: '30px' }}>
      {count}
      <Input prependIcon={<i className="iconfont icon-loading" />} appendIcon={<i className="iconfont icon-caret-down" />} />
      <Input.Number value={count} onChange={(val) => handleChange(val)} />
      <CloudUpload cloud={
          {
            Bucket: 'xxxxxx',
            Region: 'xxxxxx',
            SecretId: 'xxxxxx',
            SecretKey: 'xxxxxx',
            folderName: 'xxxxxx',
          }
        }
        onProgress={e => console.log(e)}
        onError={e => console.log(e)}
        onChange={e => console.log(e)}
        accept="image/*"
        drag
      />
      <Image cloud= {
        {
          Bucket: 'xxxxxx',
          Region: 'xxxxxx',
          SecretId: 'xxxxxx',
          SecretKey: 'xxxxxx',
          folderName: 'xxxxxx',
        }
    } isReplace isCropper isRestore />
    <Menu defaultIndex='0' defaultOpenSubMenus={[]} mode='horizontal' onSelect={function noRefCheck() {}}>
      <Menu.Item>下拉选项</Menu.Item>
      <Menu.Item>下拉选项</Menu.Item>
      <Menu.Item disabled>禁用</Menu.Item>
      <Menu.SubMenu title='下拉选项'>
        <Menu.Item>下拉选项一</Menu.Item>
        <Menu.Item>下拉选项二</Menu.Item>
      </Menu.SubMenu>
    </Menu>
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      name='file'
      onProgress={(e) => console.log('onProgress', e)}
      onSuccess={() => console.log('onSuccess')}
      onError={() => console.log('onError')}
      onChange={() => console.log('onChange')}
      onRemove={() => console.log('onRemove')}
      multiple
      isShowList
    >
      ...
    </Upload>
    </div>
  );
};

export default App;
