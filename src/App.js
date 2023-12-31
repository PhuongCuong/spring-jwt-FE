import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavHeader from './component/Nav/NavHeader';
import { Menu, Layout, Button, Row, Col } from 'antd';
import "./App.scss"
import AppRoute from './component/routes/AppRoute';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Content, Header } from 'antd/es/layout/layout';
import HeaderInfor from './component/Nav/HeaderInfor';



const { Sider } = Layout;

function App() {
  const dataredux = useSelector((state) => state.userisaccess)


  return (
    <BrowserRouter>
      {
        dataredux && dataredux.isAuthenticated ?
          <Layout>
            <Sider className='menu-backgroup'>
              <NavHeader />
            </Sider>
            <Layout>
              <Header className='header-bacground'>
                <HeaderInfor />
              </Header>
              <Content>
                <AppRoute />
              </Content>
            </Layout>
          </Layout>
          :
          <AppRoute />

      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
