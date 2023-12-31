import React, { useState } from 'react';
import './Register.scss'
import { login, register } from '../../services/userService'
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';

const Register = () => {

    const defaultdata = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        confirmpassword: ''
    }

    const [user, setuser] = useState(defaultdata)


    const navigate = useNavigate();

    const handleRegister = async () => {
        let check = isCheckVaild();
        if (check) {
            if (user.password === user.confirmpassword) {
                let res = await register(user)
                if (res) {
                    if (res.ec === 0) {
                        toast.success("Create new account success!")
                    }
                    else {
                        toast.error(res.em)
                    }
                }

            } else {
                toast.error("Password or confirmpassword not exact")
            }
        }

    }

    const isCheckVaild = () => {
        let check = true;
        let arr = ['email', 'password', 'confirmpassword', 'phone'];
        for (let i = 0; i < arr.length; i++) {
            if (!user[arr[i]]) {
                toast.error(`Empty input ${arr[i]}`)
                check = false;
                break;
            }
        }

        return check;
    }

    const handleformLogin = () => {
        navigate("/login")
    }

    const handleOnchangeInput = (value, name) => {
        let _defaultdata = _.cloneDeep(user);
        _defaultdata[name] = value;
        setuser(_defaultdata);
    }


    return (
        <div className='container'>
            <div className='login-container row'>
                <div className='login-left d-none col-12 col-md-7 d-md-flex'>
                    <div className='title-infor'>
                        <h4 className='title'>FaceBook</h4>
                        <span className='title-desc'>Facebook helps you connect and share with the people in your life.</span>
                    </div>

                </div>
                <div className='col-12 col-md-5 login-right'>
                    <div className='form-login col-12 col-md-10 p-3 '>
                        <h4 className='title d-block d-md-none'>FaceBook</h4>

                        <div className="form-group mt-3">
                            <input type="email" className="form-control"
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => handleOnchangeInput(e.target.value, "email")}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="form-control"
                                placeholder="firstname"
                                value={user.firstName}
                                onChange={(e) => handleOnchangeInput(e.target.value, "firstName")}


                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="form-control"
                                placeholder="lastname"
                                value={user.lastName}
                                onChange={(e) => handleOnchangeInput(e.target.value, "lastName")}

                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="form-control"
                                placeholder="address"
                                value={user.address}
                                onChange={(e) => handleOnchangeInput(e.target.value, "address")}

                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="form-control"
                                placeholder="phone number"
                                value={user.phone}
                                onChange={(e) => handleOnchangeInput(e.target.value, "phone")}

                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="password" className="form-control"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => handleOnchangeInput(e.target.value, "password")}

                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="password" className="form-control"
                                placeholder="Confirm Password"
                                value={user.confirmpassword}
                                onChange={(e) => handleOnchangeInput(e.target.value, "confirmpassword")}

                            />
                        </div>
                        <button className='btn btn-primary form-control mt-3'
                            onClick={() => handleRegister()}

                        >Register</button>
                        <button className='btn btn-success mt-3'
                            onClick={() => handleformLogin()}
                        >Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;