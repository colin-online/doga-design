<p align="center">
 <img width="200" style="border-radius: 50%;" src="./public/logo.png">
</p>

<h1 align="center">Doga Design，世界非你所见！</h1>
<div align="center">
<p>世界上有两件东西能够深深地震撼人们的心灵，一件是我们头顶上灿烂的星空，另一件就是doga-design UI组件库。</p>
<p align="right">——web前端工程师 东林</p>

</div>

## 🐶 简介

doga-design 是基于 Doga Design 设计体系的 UI 组件库，主要用于研发企业级产品，献给那些热爱前端开发的程序猿们。

## ✨ 特性

- 📦 开箱即用的高质量 React UI 组件
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件
- 🎨 一个懂设计的前端开发工程师倾力打造

### 🛡 TypeScript

使用 TypeScript 开发，提供完整的类型定义文件，建议在 [ TypeScript ](https://www.tslang.cn/index.html)项目中使用

创建项目：

```bash
npx create-react-app doga-demo-ts --template typescript
```

## 📦 安装

运行命令：

```bash
npm install doga-design --save
```

```bash
yarn add doga-design
```

引入样式：

```jsx
import 'doga-design/dist/index.css';
```

## 🔨 组件示例

#### 🔘 Button 按钮

```jsx
import { Button } from 'doga-design';

const App = () => (
  <>
    <Button>Default Button</Button>
    <Button btnType='primary' size='lg'>
      Primary Button
    </Button>
    <Button btnType='text'>Text Button</Button>
    <Button btnType='link' href='https://github.com/colin-online/doga-design'>
      Link Button
    </Button>
  </>
);
```

| 属性    | 说明                                                           |                                                                             类型                                                                              | 默认值  |
| :------ | :------------------------------------------------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: |
| btnType | 设置按钮类型                                                   | <code>primary</code> <code>success</code> <code>info</code> <code>warning</code> <code>danger</code> <code>link</code> <code>text</code> <code>default</code> | default |
| size    | 设置按钮大小                                                   |                                                                <code>lg</code> <code>sm</code>                                                                |    -    |
| href    | 点击跳转的地址，指定此属性 button 的 btnType 需同步设置为 link |                                                                            string                                                                             |    -    |
| onClick | 点击按钮时的回调                                               |                                                                           function                                                                            |    -    |

#### 🖊️ Inpu 输入框

```jsx
import { Input } from 'doga-design';

const App = () => (
  <>
    <Input value='东林' />
    <Input disabled />
    <Input size='lg' />
    <Input icon='search' />
    <Input prepend='http://' append='.com' />
  </>
);
```

| 属性     | 说明                 |              类型               | 默认值 |
| :------- | :------------------- | :-----------------------------: | :----: |
| icon     | 设置输入框的图标组件 |             string              |   -    |
| size     | 设置按钮大小         | <code>lg</code> <code>sm</code> |   -    |
| prepend  | 设置前置标签         |             string              |   -    |
| append   | 设置后置标签         |             string              |   -    |
| disabled | 是否禁用状态         |             boolean             | false  |

#### 🔍 AutoComplete 自动完成

```jsx
import { AutoComplete } from 'doga-design';

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items);
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
    });
};

const App = () => (
  <>
    <AutoComplete fetchSuggestions={handleFetch} onSelect={(e) => console.log(e)} placeholder='输入你的Github账号试试？' />
  </>
);
```

| 属性             | 说明                                                                           |   类型   | 默认值 |
| :--------------- | :----------------------------------------------------------------------------- | :------: | :----: |
| fetchSuggestions | 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise | function |   -    |
| onSelect         | 点击选中建议项时触发的回调                                                     | function |   -    |
| renderOption     | 支持自定义渲染下拉项，返回 ReactElement                                        |  array   |   -    |

#### 📂 Menu 导航菜单

```jsx
import { Menu } from 'doga-design';

const App = () => (
  <>
    <Menu defaultIndex='0' defaultOpenSubMenus={[]} mode='horizontal' onSelect={function noRefCheck() {}}>
      <Menu.Item>下拉选项</Menu.Item>
      <Menu.Item>下拉选项</Menu.Item>
      <Menu.Item disabled>禁用</Menu.Item>
      <Menu.SubMenu title='下拉选项'>
        <Menu.Item>下拉选项一</Menu.Item>
        <Menu.Item>下拉选项二</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </>
);
```

#### Menu

| 属性                | 说明                                    |                     类型                      |         默认值          |
| :------------------ | :-------------------------------------- | :-------------------------------------------: | :---------------------: |
| defaultIndex        | 默认 active 的菜单项的索引值            |                    string                     |            -            |
| mode                | 菜单类型 横向或者纵向                   | <code>horizontal</code> <code>vertical</code> | <code>horizontal</code> |
| defaultOpenSubMenus | 设置子菜单的默认打开 只在纵向模式下生效 |                     array                     |            -            |
| className           | 下拉菜单的扩展类名                      |                    string                     |            -            |

#### MenuItem

| 属性      | 说明                   |  类型   | 默认值 |
| :-------- | :--------------------- | :-----: | :----: |
| index     | -                      | string  |   -    |
| disabled  | 选项是否被禁用         | boolean |   -    |
| className | 下拉菜单选项的扩展类名 | string  |   -    |

#### SubMenu

| 属性      | 说明                     |  类型  | 默认值 |
| :-------- | :----------------------- | :----: | :----: |
| title     | 下拉菜单选项的文字       | string |   -    |
| className | 下拉菜单子菜单的扩展类名 | string |   -    |

#### 📤 Upload 上传(手动/拖拽)

```jsx
import { Menu } from 'doga-design';

const App = () => (
  <>
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      name='file'
      onProgress={(e) => console.log('onProgress', e)}
      onSuccess={() => console.log('onSuccess')}
      onError={() => console.log('onError')}
      onChange={() => console.log('onChange')}
      onRemove={() => console.log('onRemove')}
      beforeUpload={(file) => console.log(file)}
      accept='.jpg'
      multiple
      drag
    >
      ...
    </Upload>
  </>
);
```

| 属性            | 说明                                                                       |   类型   | 默认值 |
| :-------------- | :------------------------------------------------------------------------- | :------: | :----: |
| action          | 必选参数, 上传的地址                                                       |  string  |   -    |
| defaultFileList | 上传的文件列表向                                                           |  array   |   -    |
| headers         | 设置上传的请求头部                                                         |  object  |   -    |
| name            | 上传的文件字段名称                                                         |  string  |   -    |
| data            | 上传时附带的额外参数                                                       |  object  |   -    |
| withCredentials | 支持发送 cookie 凭证信息                                                   | boolean  |   -    |
| accept          | 可选参数, 接受上传的文件类型                                               |  string  |   -    |
| multiple        | 是否支持多选文件                                                           | boolean  |   -    |
| drag            | 是否支持拖拽上传                                                           | boolean  |   -    |
| beforeUpload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 | boolean  |   -    |
| onProgress      | 文件上传时的钩子，获取进度等                                               | function |   -    |
| onSuccess       | 文件上传成功时的钩子                                                       | function |   -    |
| onError         | 文件上传失败时的钩子                                                       | function |   -    |
| onChange        | 文件状态改变时的钩子，上传成功或者失败时都会被调用                         | function |   -    |
| onRemove        | 文件列表移除文件时的钩子                                                   | function |   -    |

## 📧 召唤作者

如果您在使用的过程中碰到问题，可直接通过以下方式联系我

电子邮箱：80868215@qq.com
