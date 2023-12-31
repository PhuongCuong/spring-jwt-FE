import React, { useEffect, useState } from 'react';
import { getAllGroup } from '../../services/groupService';

const UpdateForm = (props) => {

    const [listgroup, setlistgroup] = useState([])


    const fetchAllgroup = async () => {
        let res = await getAllGroup();
        if (res && res.ec === 0) {
            setlistgroup(res.dt)
        }
    }

    useEffect(() => {
        fetchAllgroup()
    }, [])


    return (
        <div className='create-form-container'>
            <div className='row'>
                <div className="form-group col-6">
                    <label>first Name</label>
                    <input type="text"
                        className="form-control"
                        placeholder="first Name"
                        value={props.user.firstName}
                        onChange={(e) => props.handleOnchange(e.target.value, 'firstName')}
                    />
                </div>
                <div className="form-group col-6">
                    <label>last Name</label>
                    <input type="text"
                        className="form-control"
                        placeholder="last Name"
                        value={props.user.lastName}
                        onChange={(e) => props.handleOnchange(e.target.value, 'lastName')}

                    />
                </div>
                <div className="form-group col-6">
                    <label>Email address</label>
                    <input type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={props.user.email}
                        onChange={(e) => props.handleOnchange(e.target.value, 'email')}
                        disabled

                    />
                </div>
                <div className="form-group col-6 d-none">
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Password"
                        value={props.user.password}
                        onChange={(e) => props.handleOnchange(e.target.value, 'password')}
                    />
                </div>
                <div className="form-group col-6">
                    <label>Phone number</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Phone number"
                        value={props.user.phone}
                        onChange={(e) => props.handleOnchange(e.target.value, 'phone')}
                        disabled

                    />
                </div>
                <div className="form-group col-6">
                    <label>Role</label>
                    <select className="form-select"
                        defaultValue={props.user && props.user.group ? props.user.group.id : ''}
                        onChange={(e) => props.handleOnchange(e.target.value, 'group')}

                    >
                        {
                            listgroup && listgroup.length > 0
                            &&
                            listgroup.map((item, index) => {
                                return (
                                    <option
                                        key={`group ${index}`}
                                        value={item.id}
                                        selected={item.id === props.user.group.id}
                                    >
                                        {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>address</label>
                    <input type="text"
                        className="form-control"
                        placeholder="address"
                        value={props.user.address}
                        onChange={(e) => props.handleOnchange(e.target.value, 'address')}

                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateForm;