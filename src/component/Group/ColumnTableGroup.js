import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect } from 'react';

const ColumnTableGroup = (props) => {

    const column = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'role',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
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
                        onClick={(e) => handleUpdateGroup(record)}
                    />

                </>
            )

        },
    ]

    useEffect(() => {
        props.setcolumn(column)
    }, [])

    const handleUpdateGroup = (group) => {
        props.editgroup(group)
    }

};

export default ColumnTableGroup;