import React, { FC, useCallback, useState } from 'react';
import Input from './components/Input';
import CloudUpload from './components/CloudUpload';
import Image from './components/Image';
import Menu from './components/Menu';
import Upload from './components/Upload';
import ColorPicker from './components/ColorPicker';
import Switch from './components/Switch';
import Select from './components/Select';

import './styles/index.scss';

export const App: FC<any> = () => {
  const [count, setCount] = useState(0);

  const handleChange = useCallback(val => {
    console.log(val);
    setCount(val);
  }, []);

  const handleColorChange = useCallback((colorList, colorIndex) => {
    console.log(colorList, colorIndex);
  }, []);

  return (
    <div style={{ margin: '30px' }}>
      {count}
      <Input prependIcon={<i className="iconfont icon-loading" />} appendIcon={<i className="iconfont icon-caret-down" />} />
      <Input.Number value={count} onChange={val => handleChange(val)} />
      <Select
        checked='"SimSun","STSong"'
        options={[
          { value: '"SimSun","STSong"', label: '宋体' },
          { value: '"SimHei","STHeiti"', label: '黑体' },
          { value: '"KaiTi","STKaiti"', label: '楷体' },
          { value: '"FangSong","STFangsong"', label: '仿宋' },
          { value: '"SimHei","STHeiti"', label: '黑体' },
          { value: '"KaiTi","STKaiti"', label: '楷体' },
          { value: '"FangSong","STFangsong"', label: '仿宋' },
          { value: '"SimHei","STHeiti"', label: '黑体' },
          { value: '"KaiTi","STKaiti"', label: '楷体' },
          { value: '"FangSong","STFangsong"', label: '仿宋' },
          { value: '"SimHei","STHeiti"', label: '黑体' },
          { value: '"KaiTi","STKaiti"', label: '楷体' },
          { value: '"FangSong","STFangsong"', label: '仿宋' },
        ]}
      />
      <CloudUpload
        cloud={{
          Bucket: 'xxxxxx',
          Region: 'xxxxxx',
          SecretId: 'xxxxxx',
          SecretKey: 'xxxxxx',
          folderName: 'xxxxxx',
        }}
        onProgress={e => console.log(e)}
        onError={e => console.log(e)}
        onChange={e => console.log(e)}
        accept="image/*"
        drag
      />
      <Image
        cloud={{
          Bucket: 'xxxxxx',
          Region: 'xxxxxx',
          SecretId: 'xxxxxx',
          SecretKey: 'xxxxxx',
          folderName: 'xxxxxx',
        }}
        isReplace
        isCropper
        isRestore
      />
      <Menu defaultIndex="0" defaultOpenSubMenus={[]} mode="horizontal">
        <Menu.Item>下拉选项</Menu.Item>
        <Menu.Item>下拉选项</Menu.Item>
        <Menu.Item disabled>禁用</Menu.Item>
        <Menu.SubMenu title="下拉选项">
          <Menu.Item>下拉选项一</Menu.Item>
          <Menu.Item>下拉选项二</Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        name="file"
        onProgress={e => console.log('onProgress', e)}
        onSuccess={() => console.log('onSuccess')}
        onError={() => console.log('onError')}
        onChange={() => console.log('onChange')}
        onRemove={() => console.log('onRemove')}
        multiple
        isShowList
      >
        上传
      </Upload>

      <ColorPicker
        defaultColor="#dddddd"
        defaultColorList={[
          { hex: '#ffffff', rgba: 'rgba(255,255,255,1)' },
          { hex: '#666666', rgba: 'rgba(102,102,102,1)' },
          { hex: '#000000', rgba: 'rgba(0,0,0,1)' },
          { hex: '#e0404a', rgba: 'rgba(224,64,74,1)' },
          { hex: '#ff7752', rgba: 'rgba(255,119,82,1)' },
          { hex: '#feeb3c', rgba: 'rgba(254,235,60,1)' },
          { hex: '#5ac26d', rgba: 'rgba(90,194,109,1)' },
          { hex: '#3478f7', rgba: 'rgba(52,120,247,1)' },
          { hex: '#50b4f7', rgba: 'rgba(80,180,247,1)' },
          { hex: '#9c26b0', rgba: 'rgba(156,38,176,1)' },
        ]}
        onChange={({ colorList, colorIndex }) => handleColorChange(colorList, colorIndex)}
      />
      <Switch checked={false} icon={<i className="iconfont icon-color" />} />
      <Switch.More
        checked="center"
        options={[
          { icon: <i className="iconfont icon-color" />, value: 'left' },
          { icon: <i className="iconfont icon-cloud-upload" />, value: 'center' },
          { icon: <i className="iconfont icon-upload" />, value: 'right' },
        ]}
        onChange={val => console.log(val)}
      />
    </div>
  );
};

export default App;
