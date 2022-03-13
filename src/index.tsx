import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Botton';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Button>default</Button>
      <Button btnType='primary'>primary</Button>
      <Button btnType='success'>success</Button>
      <Button btnType='warning'>warning</Button>
      <Button btnType='info'>info</Button>
      <Button btnType='danger'>danger</Button>
      <Button btnType='text'>text</Button>
      <Button btnType='link' href='http://baidu.com'>
        link
      </Button>
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
