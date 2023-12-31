import { Form, Input, Modal, Switch, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import './ModalGroupRole.scss'
import { getAllRole } from '../../services/roleService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getGroupRolebyId } from '../../services/groupService';

const ModalGroupRole = (props) => {

    const [listrole, setlistrole] = useState([]);

    const [listcheckrole, setlistcheckrole] = useState([]);

    const [listGroupRole, setlistGroupRole] = useState([]);

    const [isCheckAll, setisCheckAll] = useState(false);

    const fetchAllRole = async () => {
        let res = await getAllRole();
        if (res) {
            if (res.ec === 0) {
                setlistrole(res.dt)
            }
        } else {
            toast.error('is not authorization')
        }
    }
    const handleSave = () => {
        let data = customData()
        props.handleSaveGroupRole(data);
    }

    const customData = () => {
        let listData = [];
        let _listcheckrole = _.cloneDeep(listcheckrole);
        if (_listcheckrole && _listcheckrole.length > 0) {
            _listcheckrole.map((item, index) => {
                if (item.checked === true) {
                    let data = {
                        groupId: +props.groupId,
                        roleId: item.id
                    };
                    listData.push(data);
                }
            })
        }

        return listData;
    }

    const customOnSwitch = () => {
        let cplistcheck = _.cloneDeep(listcheckrole);
        if (cplistcheck && cplistcheck.length > 0) {
            cplistcheck.map((item, index) => {
                if (listGroupRole.some(obj2 => obj2.roleId === item.id)) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
                return item;
            })
            setlistcheckrole(cplistcheck);
            let check = validCheckALL(cplistcheck);
            setisCheckAll(check);
        } else {
            return;
        }
    }

    const validCheckALL = (data) => {
        let check = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                check = true;
            } else {
                check = false;
                break;
            }
        }
        return check;
    }

    const customListRole = () => {
        let cplistrole = _.cloneDeep(listrole);
        if (cplistrole && cplistrole.length > 0) {
            cplistrole.map((item, index) => {
                item.checked = false;
                return item;
            })
            setlistcheckrole(cplistrole)
        }
    }

    useEffect(() => {
        fetchAllRole()
    }, [])

    useEffect(() => {
        customListRole()
    }, [listrole])


    const handleCheckAll = (checked) => {
        let cpchecklistrole = _.cloneDeep(listcheckrole);
        if (cpchecklistrole && cpchecklistrole.length > 0) {
            cpchecklistrole.map((item, index) => {
                item.checked = checked;
                return item;
            })
            setisCheckAll(!isCheckAll)
            setlistcheckrole(cpchecklistrole);
        }
    }

    const handleOnchangeCheck = (checked, index) => {
        let cpchecklistrole = _.cloneDeep(listcheckrole);
        cpchecklistrole[index].checked = checked;
        setlistcheckrole(cpchecklistrole);
        let check = validCheckALL(cpchecklistrole);
        setisCheckAll(check);
    }

    const handleGetGroupRoleById = async (groupId) => {
        let res = await getGroupRolebyId(groupId)
        if (res) {
            if (res.ec === 0) {
                if (res.dt && res.dt.length > 0) {
                    setlistGroupRole(res.dt)
                } else {
                    setlistGroupRole([])
                }
            } else {
                console.log(res.em); // In thông báo lỗi ra console hoặc có thể hiển thị thông báo lỗi trên giao diện người dùng
            }
        }
    }


    useEffect(() => {
        handleGetGroupRoleById(+props.groupId)
    }, [props.groupId])

    useEffect(() => {
        customOnSwitch()
    }, [listGroupRole])


    useEffect(() => {
        if (!props.showmodalRole) {
            let cplistcheck = _.cloneDeep(listcheckrole);
            if (cplistcheck && cplistcheck.length > 0) {
                cplistcheck.map((item, index) => {
                    item.checked = false;
                    return item;
                })
                setlistcheckrole(cplistcheck)
                props.setgroupId('');
            } else {
                return;
            }
        }
    }, [props.showmodalRole])

    const handleCancel = () => {
        props.handleShowModalRole()
    }


    return (
        <>
            <Modal
                title="Add Group Role"
                open={props.showmodalRole}
                onOk={() => handleSave()}
                onCancel={() => handleCancel()}
                okText="Save"
                cancelText="Cancel"
            >
                <div className='group-role-all'>
                    <span className='group-role-all-text'>Check ALL:</span>
                    <Switch checked={isCheckAll} onChange={(checked) => handleCheckAll(checked)} />
                </div>
                <div className='list-role mt-3'>
                    {
                        listcheckrole && listcheckrole.length > 0
                        && listcheckrole.map((item, index) => {
                            let color;
                            if (item.method === 'get') {
                                color = 'green';
                            } else if (item.method === 'post') {
                                color = 'volcano';
                            } else if (item.method === "put") {
                                color = 'geekblue';
                            } else if (item.method === 'delete') {
                                color = 'orange';
                            } else {
                                color = 'defaultColor';
                            }
                            return (
                                <div className='role-item' key={`role-list-${index}`}>
                                    <div className='role-url'>
                                        <span className='role-url-text'>{item.url}</span>
                                    </div>
                                    <div>
                                        <Tag color={color} className='role-method'>{item.method.toUpperCase()}</Tag>
                                    </div>
                                    <div className='action-role'>
                                        <Switch checked={item.checked}
                                            onChange={(checked) => handleOnchangeCheck(checked, index)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal >
        </>
    );
};

export default ModalGroupRole;