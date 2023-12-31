import React, { useEffect, useState } from 'react';
import './Role.scss'
import { Button, Layout, Table } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { PlusCircleOutlined } from '@ant-design/icons';
import ColumnTableRole from './ColumnTableRole';
import { addnewRole, deleteRole, getAllRole } from '../../services/roleService';
import RoleModal from './RoleModal';
import { toast } from 'react-toastify';
const Role = () => {

    const [column, setcolumn] = useState([]);
    const [listgroup, setlistgroup] = useState([]);

    const [showmodal, setshowmodal] = useState(false);

    const handleShowModal = () => {
        setshowmodal(!showmodal)
    }

    const fetchAllRole = async () => {
        let res = await getAllRole();
        if (res && res.ec === 0) {
            setlistgroup(res.dt)
        }

    }

    const createNewRole = async (data) => {
        let res = await addnewRole(data);
        if (res) {
            if (res.ec === 0) {
                toast.success(res.em)
                fetchAllRole()
            } else {
                toast.error(res.em)
            }
        }
        else {
            toast.error("is not authorizaiton")
        }

    }

    const deleterole = async (data) => {
        let res = await deleteRole(data)
        if (res) {
            if (res.ec === 0) {
                toast.success(res.em)
                fetchAllRole()
            } else {
                toast.error(res.em)
            }
        } else {
            toast.error("is not authorizaiton")
        }
    }

    useEffect(() => {
        fetchAllRole()
    }, [])


    return (
        <Layout className='layout-container'>
            <Header className='header-role'>
                <h4>Manager Role URL</h4>
            </Header>
            <Content>
                <div className='container'>
                    <Button className='mb-3' type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => handleShowModal()}
                    >
                        Add new role
                    </Button>
                    <Table dataSource={listgroup && listgroup.length > 0 ? listgroup : null} columns={column} rowKey={record => record.id} />
                </div>
            </Content>
            <ColumnTableRole
                setcolumn={setcolumn}
                deleterole={deleterole}
            />
            <RoleModal
                showmodal={showmodal}
                handleShowModal={handleShowModal}
                createNewRole={createNewRole}
            />
        </Layout>
    );
};

export default Role;