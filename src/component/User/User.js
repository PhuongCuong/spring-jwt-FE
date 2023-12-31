import { Button, Layout, Table } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import './User.scss'
import column from './ColumnTable'
import { getAllUser } from '../../services/userService';
import { PlusCircleOutlined } from '@ant-design/icons';
import DrawerCreateUser from './DrawerCreateUser';
import ColumnTable from './ColumnTable';
import DrawerUpdateUser from './DrawerUpdateUser';
import _ from 'lodash';

const User = () => {

    const [listuser, setlistuser] = useState([]);

    const [open, setOpen] = useState(false);

    const [column, setcolumn] = useState([]);

    const [userUpdate, setuserUpdate] = useState({})

    const [openUpdate, setopenUpdate] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const showDrawerUpdate = () => {
        setopenUpdate(true);
    };
    const onCloseUpdate = () => {
        setopenUpdate(false);
    };

    const fetchAlluser = async () => {
        let res = await getAllUser();
        if (res && res.ec === 0) {
            setlistuser(res.data)
        }
    }



    useEffect(() => {
        fetchAlluser()
    }, [])


    return (
        <Layout className='layout-container'>
            <Header className='header-user'>
                <h4>Manager User</h4>
            </Header>
            <Content>
                <div className='container'>
                    <Button className='mb-3' type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => showDrawer()}
                    >
                        Add new user
                    </Button>
                    <Table dataSource={listuser && listuser.length > 0 ? listuser : null} columns={column} rowKey={record => record.id} />
                </div>
            </Content>
            <DrawerCreateUser
                open={open}
                showDrawer={showDrawer}
                onClose={onClose}
                fetchAlluser={fetchAlluser}
            />
            <DrawerUpdateUser
                open={openUpdate}
                showDrawer={showDrawerUpdate}
                onClose={onCloseUpdate}
                fetchAlluser={fetchAlluser}
                userUpdate={userUpdate}
            />
            <ColumnTable
                setcolumn={setcolumn}
                fetchAlluser={fetchAlluser}
                showDrawer={showDrawerUpdate}
                setuserUpdate={setuserUpdate}
            />
        </Layout>
    );
};

export default User;