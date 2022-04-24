import React, { FC, useCallback, useState } from 'react';
import Input from './components/Input';
import CloudUpload from './components/CloudUpload';
import Image from './components/Image';
import AutoComplete from './components/AutoComplete';
import Menu from './components/Menu';
import Upload from './components/Upload';
import ColorPicker from './components/ColorPicker';
import Switch from './components/Switch';
import Select from './components/Select';
import Json from './components/Json';

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
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items);
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const dataSource = {
    biPv: '',
    degrade: false,
    groupId: '06170055',
    groupName: '京东酒行Tab-产区名酒多Tab',
    stageId: '17063062',
    stageName: '',
    deliveryType: '1',
    styleId: '66',
    time: 1650717449349,
    list: [
      {
        advertId: '2701615458',
        pictureUrl: '',
        name: '今日特惠',
        comments: ['06170087'],
        link: '//pro.m.jd.com/mall/active/i1vvh2Z1Sh9P2FDqqufDFsqxSEs/index.html',
        linkType: '',
        desc: '',
        biClk: '9##',
        mcInfo: '06170055-17063062-2701615458-N#0-1101---66--#1-0-#1-43998269#mainActivity',
        extension: {
          noPageSwitch: null,
          pcLink: null,
          groupId: '06170055',
          stageId: '17063062',
          useBi: '0',
        },
        beginTime: '2000-01-01 00:00:00',
        endTime: '2000-01-01 00:00:00',
        picHeight: 0,
        picWidth: 0,
        next: [],
        bi: {
          testid: '2',
        },
        more: {
          exposalUrl: null,
        },
      },
      {
        advertId: '2701615458',
        pictureUrl: '',
        name: '今日特惠',
        comments: ['06170087'],
        link: '//pro.m.jd.com/mall/active/i1vvh2Z1Sh9P2FDqqufDFsqxSEs/index.html',
        linkType: '',
        desc: '',
        biClk: '9##',
        mcInfo: '06170055-17063062-2701615458-N#0-1101---66--#1-0-#1-43998269#mainActivity',
        extension: {
          noPageSwitch: null,
          pcLink: null,
          groupId: '06170055',
          stageId: '17063062',
          useBi: '0',
        },
        beginTime: '2000-01-01 00:00:00',
        endTime: '2000-01-01 00:00:00',
        picHeight: 0,
        picWidth: 0,
        next: [],
        bi: {
          testid: '2',
        },
        more: {
          exposalUrl: null,
        },
      },
    ],
  };

  return (
    <div style={{ margin: '30px' }}>
      <Json selectedList={[{ name: 'biPv', namespace: [], type: 'string', value: '' }]} dataSource={dataSource} onChange={val => console.log(val)} />
      <br />
      <br />
      <br />
      <AutoComplete fetchSuggestions={handleFetch} onSelect={e => console.log(e)} placeholder="输入你的Github账号试试？" />
      {count}
      <Input prependIcon={<i className="iconfont icon-loading" />} appendIcon={<i className="iconfont icon-down" />} />
      <Input.Number value={count} onChange={val => handleChange(val)} />
      <Select
        checked='"SimSun","STSong"'
        options={[
          { index: 0, value: '"SimSun","STSong"', label: '宋体宋体宋体宋体', icon: <i className="iconfont icon-loading" /> },
          { index: 1, value: '"SimHei","STHeiti"', label: '黑体', icon: <i className="iconfont icon-loading" /> },
          { index: 2, value: '"KaiTi","STKaiti"', label: '楷体楷体', icon: <i className="iconfont icon-loading" /> },
          { index: 3, value: '"FangSong","STFangsong"', label: '仿宋', icon: <i className="iconfont icon-loading" /> },
          { index: 4, value: '"SimHei","STHeiti"', label: '黑体', icon: <i className="iconfont icon-loading" /> },
          { index: 5, value: '"KaiTi","STKaiti"', label: '楷体', icon: <i className="iconfont icon-loading" /> },
          { index: 6, value: '"FangSong","STFangsong"', label: '仿宋', icon: <i className="iconfont icon-loading" /> },
          { index: 7, value: '"SimHei","STHeiti"', label: '黑体', icon: <i className="iconfont icon-loading" /> },
        ]}
        prependIcon={<i className="iconfont icon-up" />}
        appendIcon={<i className="iconfont icon-down" />}
      />
      <Select
        checked='"SimSun","STSong"'
        options={[
          { index: 0, label: '宋体' },
          { index: 1, label: '黑体' },
          { index: 2, label: '楷体' },
          { index: 3, label: '仿宋' },
          { index: 4, label: '黑体' },
          { index: 5, label: '楷体' },
          { index: 6, label: '仿宋' },
          { index: 7, label: '黑体' },
          { index: 8, label: '楷体' },
          { index: 9, label: '仿宋' },
          { index: 10, label: '黑体' },
          { index: 11, label: '楷体' },
          { index: 12, label: '仿宋' },
        ]}
        prependIcon={<i className="iconfont icon-up" />}
        appendIcon={<i className="iconfont icon-down" />}
        onChange={index => console.log('>>>>', index)}
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
      <Switch checked={false} onChange={val => console.log(val)} />
      <Switch.Icon checked={false} icon={<i className="iconfont icon-color" />} />
      <Switch.IconMore
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
