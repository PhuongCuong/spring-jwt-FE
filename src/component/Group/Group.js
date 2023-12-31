import React, { useEffect, useState } from 'react';
import './Group.scss'
import { Button, Layout, Table } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { PlusCircleOutlined } from '@ant-design/icons';
import { addnewGroup, addnewGroupRole, deleteGroup, getAllGroup } from '../../services/groupService';
import ColumnTableGroup from './ColumnTableGroup';
import GroupModal from './GroupModal';
import { toast } from 'react-toastify';
import ModalGroupRole from './ModalGroupRole';

const Group = () => {

    const [column, setcolumn] = useState([]);
    const [listgroup, setlistgroup] = useState([]);
    const [groupId, setgroupId] = useState("")

    const [showmodal, setshowmodal] = useState(false);

    const handleShowModal = () => {
        setshowmodal(!showmodal)
    }

    const [showmodalRole, setshowmodalRole] = useState(false);

    const handleShowModalRole = () => {
        setshowmodalRole(!showmodalRole)
    }


    const fetchAllGroup = async () => {
        let res = await getAllGroup();
        if (res && res.ec === 0) {
            setlistgroup(res.dt)
        }

    }

    const createNewGroup = async (data) => {
        let res = await addnewGroup(data);
        if (res) {
            if (res.ec === 0) {
                toast.success(res.em)
                fetchAllGroup()
            } else {
                toast.error(res.em)
            }
        }
        else {
            toast.error("is not authorizaiton")
        }

    }

    const handleSaveGroupRole = async (data) => {
        let res = await addnewGroupRole(data)
        if (res) {
            if (res.ec === 0) {
                toast.success(res.em)
                handleShowModalRole()
            } else {
                toast.error(res.em)
            }
        }
    }

    const editgroup = async (data) => {
        setgroupId(data.id)
        handleShowModalRole()
    }

    useEffect(() => {
        fetchAllGroup()
    }, [])

    return (
        <Layout className='layout-container'>
            <Header className='header-group'>
                <h4>Manager Group</h4>
            </Header>
            <Content>
                <div className='container'>
                    <Button className='mb-3' type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => handleShowModal()}
                    >
                        Add new group
                    </Button>
                    <Table dataSource={listgroup && listgroup.length > 0 ? listgroup : null} columns={column} rowKey={record => record.id} />
                </div>
            </Content>
            <ColumnTableGroup
                setcolumn={setcolumn}
                editgroup={editgroup}
            />
            <GroupModal
                createNewGroup={createNewGroup}
                handleShowModal={handleShowModal}
                showmodal={showmodal}
            />
            <ModalGroupRole
                handleShowModalRole={handleShowModalRole}
                showmodalRole={showmodalRole}
                groupId={groupId}
                handleSaveGroupRole={handleSaveGroupRole}
                setgroupId={setgroupId}
            />
        </Layout>
    );
};

export default Group;