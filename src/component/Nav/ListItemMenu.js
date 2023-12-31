import React from 'react';
import {
    HomeOutlined, UserOutlined, FundProjectionScreenOutlined,
    AlibabaOutlined, CompassOutlined, HourglassOutlined
} from '@ant-design/icons';


export const items = [

    {
        label: "Home",
        key: "/",
        icon: <HomeOutlined />
    },
    {
        label: 'User',
        icon: <UserOutlined />,
        key: '/user',
    },
    {
        label: 'Project',
        icon: <FundProjectionScreenOutlined />,
        key: '/project',
    },
    {
        label: 'About',
        icon: <AlibabaOutlined />,
        key: '/about',
    },
    {
        label: 'Role',
        icon: <CompassOutlined />,
        key: '/role',
    },
    {
        label: 'Group',
        icon: <HourglassOutlined />,
        key: '/group',
    },
];
