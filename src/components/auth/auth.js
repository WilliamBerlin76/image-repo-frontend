import React, { useState } from 'react'
import auth from './auth.module.scss';
import ReactLoading from "react-loading";

import axios from 'axios';

const Auth = ({ method, history }) => {
    const [user, setUser] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const changeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    };
    
    const submitForm = e => {
        setIsFetching(true);
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_BE_CONNECTION}/auth/${method}`, {...user})
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token);
                res.data.newUser ? localStorage.setItem('userId', res.data.newUser.id) : localStorage.setItem('userId', res.data.user.id);
                history.push('/dashboard');
            })
            .catch(err => {
                setIsFetching(false);
                console.log(err);
            })
    };

    return (
        <div className={auth.container}>
            <h2>{method}</h2>
            <form
                className={auth.form}
                onSubmit={submitForm}
            >
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />
                {method === "register" && (
                    <input 
                        type='text'
                        placeholder="Username"
                        name='username'
                        onChange={handleChange}
                    />
                )}
                <input 
                    type='password'
                    placeholder="Password"
                    name='password'
                    onChange={handleChange}
                />
                {(user.password && confirmPassword) && 
                (user.password !== confirmPassword) && (
                    <div>*Passwords must match</div>
                )}
                {method === "register" && (
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={changeConfirmPassword}
                    />
                )}
                {isFetching ? <ReactLoading type="spin" color="#222222" height={50} width={50}/> : <button>{method}!</button>}
                
            </form>
        </div>
    )
}

export default Auth;