import React, { useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, BugOutlined } from '@ant-design/icons';
import { Menu, Layout, Button, Col, Row } from 'antd';
import './NavHeader.scss'
import { items } from './ListItemMenu';
import { useNavigate } from 'react-router-dom';


const { Header, Content, Footer } = Layout;

const NavHeader = () => {
    const navigate = useNavigate();


    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handlePath = ({ key }) => {
        navigate(key)
    }

    return (
        <Layout className='menu-container'>
            <Header className='header-menu'>
                <div className='title-menu'>
                    <h4>Admin</h4>
                    <span className='icon-admin'><BugOutlined /></span>
                </div>
            </Header>
            <Content>
                <Menu className='menu'
                    onClick={(key) => handlePath(key)}
                    defaultSelectedKeys={window.location.pathname ? window.location.pathname : '/'}
                    defaultOpenKeys={"/"}
                    mode="inline"
                    items={items}
                />
            </Content>
        </Layout>


    );
};

export default NavHeader;