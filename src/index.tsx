import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './components/AutoComplete';
import { DataSourceType } from './components/AutoComplete/autoComplete';
import Button from './components/Botton';
import Input from './components/Input';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Upload from './components/Upload';
import { UploadFile } from './components/Upload/upload';
import './styles/index.scss';
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const renderOption = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<GithubUserProps>;
  return (
    <>
      <h2>Name: {itemWithGithub.value}</h2>
      <p>url: {itemWithGithub.url}</p>
    </>
  );
};
const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items);
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
    });
};

// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     console.log('超过最大限制');
//     return false;
//   }
//   console.log('刚刚好');
//   return true;
// };

const filePromise = (file: File) => {
  const newFile = new File([file], file.name, { type: file.type });
  return Promise.resolve(newFile);
};
const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
];

ReactDOM.render(
  // <React.StrictMode>
  <div style={{ margin: '30px' }}>
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      defaultFileList={defaultFileList}
      onProgress={(e) => console.log('onProgress', e)}
      onSuccess={() => console.log('onSuccess')}
      onError={() => console.log('onError')}
      onChange={() => console.log('onChange')}
      beforeUpload={(file) => filePromise(file)}
      accept='.jpg'
      multiple
      drag
    />
    <br />
    <br />
    <br />
    <Input
      size='lg'
      icon='search'
      // prepend='https://'
      // append='.com'
      onChange={(e) => {
        console.log(e.target.value);
      }}
    />
    <br />
    <br />
    <AutoComplete fetchSuggestions={handleFetch} onSelect={(e) => console.log(e)} renderOption={renderOption} />
    <br />
    <br />
    <Menu mode='vertical' defaultIndex={'2'} onSelect={(index) => console.log('index', index)} defaultOpenSubMenus={['0', '1', '2', '3']}>
      <MenuItem>one</MenuItem>
      <MenuItem disabled>two</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem>three</MenuItem>
    </Menu>
    <br />
    <br />
    <br />
    <br />
    <Button disabled>default</Button> <Button btnType='primary'>primary</Button> <Button btnType='success'>success</Button> <Button btnType='warning'>warning</Button>{' '}
    <Button btnType='info'>info</Button> <Button btnType='danger'>danger</Button> <Button btnType='text'>text</Button>{' '}
    <Button btnType='link' href='http://baidu.com'>
      link
    </Button>
  </div>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
