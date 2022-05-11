import React, { FC, useState, useCallback } from 'react';
import AutoComplete from './components/AutoComplete';
import Radio from './components/Radio';
import CloudUpload from './components/CloudUpload';
import Upload from './components/Upload';
import Input from './components/Input';
import Button from './components/Button';
import ColorPicker from './components/ColorPicker';
import Image from './components/Image';
import Json from './components/Json';
import Menu from './components/Menu';
import Select from './components/Select';
import Slider from './components/Slider';
import Switch from './components/Switch';
import Empty from './components/Empty';

import './styles/index.scss';

export const App: FC<any> = () => {
  const [count, setCount] = useState(0);

  const children = {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px 0',
  };

  const title = {
    fontSize: '14px',
    color: '#666',
    margin: '10px 0 5px 0',
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

  const handleAutoCompleteFetch = useCallback((query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items);
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  }, []);

  const handleColorChange = useCallback((colorList: any, colorIndex: any) => {
    console.log(colorList, colorIndex);
  }, []);

  return (
    <div style={{ margin: '30px' }}>
      <div style={children}>
        <div style={title}>空状态</div>
        <Empty visible={true} icon={<i className="iconfont icon-empty-full" />} />
      </div>
      <div style={children}>
        <div style={title}>单选框</div>
        <Radio
          checked="1"
          options={[
            { label: '文本', value: '1' },
            { label: '收藏', value: '2' },
            { label: '草稿', value: '3' },
          ]}
          onChange={val => console.log(val)}
        />
      </div>
      <div style={children}>
        <div style={title}>自动填充</div>
        <AutoComplete fetchSuggestions={handleAutoCompleteFetch} onSelect={e => console.log(e)} placeholder="输入你的Github账号试试？" />
      </div>
      <div style={children}>
        <div style={title}>数字框</div>
        <Input.Number min={0} max={5} value={count} onChange={val => setCount(val)} />
      </div>
      <div style={children}>
        <div style={title}>按钮</div>
      </div>
      <Button>Default</Button>
      <div style={children}>
        <div style={title}>云上传</div>
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
      </div>
      <div style={children}>
        <div style={title}>上传</div>
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
          普通上传
        </Upload>
      </div>
      <div style={children}>
        <div style={title}>颜色选择器</div>
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
          direction="right"
          onChange={({ colorList, colorIndex }) => handleColorChange(colorList, colorIndex)}
        />
      </div>
      <div style={children}>
        <div style={title}>图片选择器</div>
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
      </div>
      <div style={children}>
        <div style={title}>输入框</div>
        <Input prependIcon={<i className="iconfont icon-loading" />} appendIcon={<i className="iconfont icon-down" />} />
      </div>
      <div style={children}>
        <div style={title}>JSON选择器</div>
        <Json selectedList={[{ name: 'biPv', namespace: [], type: 'string', value: '' }]} dataSource={dataSource} onChange={val => console.log(val)} />
      </div>
      <div style={children}>
        <div style={title}>下拉菜单</div>
        <Menu defaultIndex="0" defaultOpenSubMenus={[]} mode="horizontal">
          <Menu.Item>下拉选项</Menu.Item>
          <Menu.Item>下拉选项</Menu.Item>
          <Menu.Item disabled>禁用</Menu.Item>
          <Menu.SubMenu title="下拉选项">
            <Menu.Item>下拉选项一</Menu.Item>
            <Menu.Item>下拉选项二</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      <div style={children}>
        <div style={title}>下拉选择器</div>
        <Select
          checked='"SimSun","STSong"'
          options={[
            { index: 0, value: '"SimSun","STSong"', label: '宋体', icon: <i className="iconfont icon-loading" /> },
            { index: 1, value: '"SimHei","STHeiti"', label: '黑体', icon: <i className="iconfont icon-loading" /> },
            { index: 2, value: '"KaiTi","STKaiti"', label: '楷体', icon: <i className="iconfont icon-loading" /> },
            { index: 3, value: '"FangSong","STFangsong"', label: '仿宋', icon: <i className="iconfont icon-loading" /> },
            { index: 4, value: '"SimHei","STHeiti"', label: '黑体', icon: <i className="iconfont icon-loading" /> },
          ]}
          prependIcon={<i className="iconfont icon-up" />}
          appendIcon={<i className="iconfont icon-down" />}
        />
      </div>
      <div style={children}>
        <div style={title}>滑动条</div>
        <Slider
          min={0}
          max={10}
          step={1}
          value={count}
          append="px"
          onChange={val => {
            console.log(val);
            setCount(val);
          }}
        />
      </div>
      <div style={children}>
        <div style={title}>切换选择器</div>
        {/* 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'; */}
        <Switch checked={false} theme="primary" onChange={val => console.log(val)} />
        <div style={title}>Icon切换选择器</div>
        <Switch.Icon checked={false} icon={<i className="iconfont icon-color" />} />
        <div style={title}>多Icon切换选择器</div>
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
    </div>
  );
};

export default App;
