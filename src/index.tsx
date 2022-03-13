import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Botton';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <div style={{ margin: '30px' }}>
      <br />
      <br />
      <br />
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
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
