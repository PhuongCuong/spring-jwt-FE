import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useEffect } from 'react';

const ColumnTableRole = (props) => {


    const column = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'url',
            dataIndex: 'url',
            key: 'url',
        },

        {
            title: 'method',
            key: 'method',
            dataIndex: 'method',
            render: (_, { method }) => {
                let color;
                if (method === 'get') {
                    color = 'green';
                } else if (method === 'post') {
                    color = 'volcano';
                } else if (method === "put") {
                    color = 'geekblue';
                } else if (method === 'delete') {
                    color = 'orange';
                } else {
                    color = 'defaultColor';
                }

                return (
                    <Tag color={color} key={method}>
                        {method.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'descriptions',
            dataIndex: 'descriptions',
            key: 'descriptions',
        },
        {
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) =>
            (

                <>

                    <Button
                        style={{ background: "#f78e3d" }}
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={(e) => handleDeletRole(record)}

                    />
                </>
            )

        },
    ]

    useEffect(() => {
        props.setcolumn(column)
    }, [])

    const handleDeletRole = (role) => {
        props.deleterole(role)
    }

};

export default ColumnTableRole;