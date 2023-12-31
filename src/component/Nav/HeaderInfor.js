import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React from 'react';
import './HeaderInfor.scss'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { logout } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { fechUserToken } from '../../redux/UserSlice';

const HeaderInfor = () => {

    const navigate = useNavigate();

    const dataredux = useSelector(state => state.userisaccess)

    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logout();
        await dispatch(fechUserToken());
        navigate("/login")
    }

    return (
        <div className='header-infor-container'>
            <div className='header-infor-user-infor'>
                <span className='user-text'>
                    {dataredux && dataredux.accout && !_.isEmpty(dataredux.accout) ? dataredux.accout.email : ''}
                </span>
                <Avatar icon={<UserOutlined />} />
            </div>
            <div className='header-infor-logout'>
                <Button type="primary" icon={<LogoutOutlined />}
                    onClick={() => handleLogout()}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default HeaderInfor;