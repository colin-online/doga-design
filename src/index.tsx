import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './components/AutoComplete';
import { DataSourceType } from './components/AutoComplete/autoComplete';
import Button from './components/Botton';
import Input from './components/Input';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
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

ReactDOM.render(
  // <React.StrictMode>
  <div style={{ margin: '30px' }}>
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
