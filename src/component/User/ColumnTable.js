import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect } from 'react';
import { deleteUser } from "../../services/userService";
import { toast } from "react-toastify";

const ColumnTable = (props) => {

    const column = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'firstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'lastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'group',
            dataIndex: 'group',
            key: 'group',
            render: (_, { group }) => {
                return (
                    <p>
                        {group.name}
                    </p>
                );
            },
        },
        {
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) =>
            (

                <>
                    <Button className="mx-2"
                        style={{ background: "#f46e65" }}
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={(e) => handleUpdateUser(record)}
                    />
                    <Button
                        style={{ background: "#f78e3d" }}
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={(e) => handleDeleteUser(record)}

                    />
                </>
            )

        },
    ]

    useEffect(() => {
        props.setcolumn(column)
    }, [])

    const handleDeleteUser = async (record) => {
        let res = await deleteUser(record);
        if (res) {
            if (res.ec === 0) {
                toast.success(res.em);
                props.fetchAlluser()
            } else {
                toast.error(res.em)
            }
        } else {
            toast.error("is not authorization")
        }

    }

    const handleUpdateUser = async (record) => {
        await props.setuserUpdate(record);
        props.showDrawer()
    }

};

export default ColumnTable;




