import React, { useState } from 'react';
import './Login.scss'
import { login } from '../../services/userService'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../redux/UserSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")

    const handleLogin = async () => {
        let data = {
            email: email,
            password: password
        }

        let res = await login(data)
        if (res && res.ec === 0) {
            await dispatch(fechUserToken())
            navigate("/")
        } else {
            toast.error(res.em)
        }
    }

    const handleformRegister = () => {
        navigate("/register")
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
                                placeholder="Email address or phone number"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input type="password" className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary form-control mt-3'
                            onClick={() => handleLogin()}

                        >Login</button>
                        <a href='' className='forgot-password mt-3'>Forgotten password?</a>
                        <hr />
                        <button className='btn btn-success mt-3'
                            onClick={() => handleformRegister()}
                        >Create new account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;