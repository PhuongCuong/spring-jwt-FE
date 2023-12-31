import { Button, Drawer, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateForm from './CreateForm';
import _ from 'lodash';
import { addnewUser, updateUser } from '../../services/userService';
import { toast } from 'react-toastify';
import UpdateForm from './UpdateForm';

const DrawerUpdateUser = (props) => {

    const [user, setuser] = useState({});


    const handleOnchange = (value, name) => {
        let _defaultdata = _.cloneDeep(user);
        _defaultdata[name] = value;
        setuser(_defaultdata)
    }

    const handleUpdateUser = async () => {
        let cpuser = _.cloneDeep(user);
        if (cpuser && !_.isEmpty(cpuser)) {
            if (typeof cpuser.group === 'object') {
                cpuser = {
                    ...user, group: user.group.id
                }
            }
            let res = await updateUser(cpuser);
            if (res) {
                if (res.ec === 0) {
                    toast.success(res.em)
                    await props.onClose()
                    props.fetchAlluser()
                } else {
                    toast.error(res.em)
                }
            }
            else {
                toast.error("is not authorization")

            }
        }

    }


    useEffect(() => {
        setuser(props.userUpdate)
    }, [props.userUpdate])

    return (
        <>
            <Drawer
                title="Update a new user"
                placement='right'
                width={720}
                onClose={props.onClose}
                open={props.open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}

            >
                <div className='container'>
                    <div>
                        <UpdateForm
                            handleOnchange={handleOnchange}
                            user={user}
                        />
                    </div>
                    <div className='mt-3 d-flex justify-content-end'>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button className='ms-2'
                            onClick={() => handleUpdateUser()}
                            type="primary"

                        >
                            Submit
                        </Button>
                    </div>

                </div>

            </Drawer>
        </>
    );
};

export default DrawerUpdateUser;