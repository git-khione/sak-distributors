import React from 'react';
import style from './Login.module.scss';

//Shared Components
import useForm from '../../components/useForm';
import TextField from '../../shared/TextField/TextField';

//Logo
import logo from '../../images/logo.svg';

//Material UI Exports
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Connecting to Backend
// import axios from 'axios';

export default function Login() {

    const postData = () => {
        window.location.replace("http://localhost:3000/sales-representative/dashboard");
    }

    const initialFieldValues = {
        username: '',
        password: '',
        showPassword: false,
    }

    const {
        values,
        handleInputChange,
        handleClickShowPassword,
        handleMouseDownPassword
    } = useForm({ initialFieldValues })

    return (
        <div className={style.container}>

            <div className={style.login}>
                <div className={style.top}>
                    <div className={style.logo}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={style.heading}>
                        <span>Login</span>
                    </div>
                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Username"
                            onChange={handleInputChange}
                            value={values.username}
                            name="username"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Password"
                            name="password"
                            onChange={handleInputChange}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="inherit"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={style.div}>
                        <div className={style.forgotPassword}>
                            <a href="http://localhost:3000/forgot-password">Forgot Password?</a>
                        </div>
                        <Button
                            className={style.button}
                            color="primary"
                            onClick={postData}
                            variant="contained">
                            Submit
                        </Button>
                    </div>
                </div>
                <div className={style.copyright}>
                    © 2021 SAK Distributors. All rights reserved.
                </div>
            </div>
        </div>
    )
}
