import { Button, Drawer, Space } from 'antd';
import React, { useState } from 'react';
import CreateForm from './CreateForm';
import _ from 'lodash';
import { addnewUser } from '../../services/userService';
import { toast } from 'react-toastify';

const DrawerCreateUser = (props) => {

    const defaultdata = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        group: '1'
    }

    const [user, setuser] = useState(defaultdata);

    const handleOnchange = (value, name) => {
        let _defaultdata = _.cloneDeep(user);
        _defaultdata[name] = value;
        setuser(_defaultdata)
    }

    const handleSaveUser = async () => {
        if (user && !_.isEmpty(user)) {
            let res = await addnewUser(user);
            if (res) {
                if (res.ec === 0) {
                    toast.success(res.em)
                    await props.onClose()
                    props.fetchAlluser();
                    setuser(defaultdata)
                } else {
                    toast.error(res.em)
                }
            }
        } else {
            toast.error("is not authorization")

        }
    }

    return (
        <>
            <Drawer
                title="Create a new user"
                placement='left'
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
                        <CreateForm
                            handleOnchange={handleOnchange}
                            user={user}
                        />
                    </div>
                    <div className='mt-3 d-flex justify-content-end'>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button className='ms-2'
                            onClick={() => handleSaveUser()}
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

export default DrawerCreateUser;