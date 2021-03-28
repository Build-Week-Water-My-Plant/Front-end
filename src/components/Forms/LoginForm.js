import React, { useState } from "react";
import { Form } from './Styles';
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = props => {

    const { addCurrentUser, toggleAuthentication, addToken, notify, toggleLoading, history } = props

    const initialExistingUser = {
        loginUsername: '',
        loginPassword: ''
    }

    const [ existingUser, setExistingUser] = useState(initialExistingUser);
    const { loginUsername, loginPassword } = existingUser;


    const userLogIn = (user) => { 
        axios
            .post(
                "https://nchampag-watermyplants.herokuapp.com/login", 
                `grant_type=password&username=${user.loginUsername}&password=${user.loginPassword}`,
                {
                    headers: {
                    Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            .then(res => { 
                addToken(res.data.access_token);
                toggleLoading(false); 
                toggleAuthentication();
                history.push('/');
            })
            .catch(err => { 
                toggleLoading(false); 
                notify('Unsuccessful! Try Again', 'error')
            });
   };


    // Handler Functions
    const handleInputChange = (e) => {
        setExistingUser({
            ...existingUser,
            [e.target.id]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        if(loginUsername && loginPassword) {
            e.preventDefault();
            toggleLoading(true);
            addCurrentUser(loginUsername)

            userLogIn(existingUser);
            setExistingUser(initialExistingUser);
        }
    }
    
    return (
        <Form autoComplete="off">
            <div className="form-header">
                <h1>Login</h1>
                <p>Keep your plants alive!</p>
                <h1>Track all of your watering schedules in one spot.</h1>
            </div>

            <div className="form-inputs">
                <label htmlFor="username">Username</label>
                <input type='text' id="loginUsername" name='username' onChange={handleInputChange} value={loginUsername} placeholder='Username' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="password">Password</label>
                <input type='password' id="loginPassword" name='password' onChange={handleInputChange} value={loginPassword} placeholder='Password' required/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                Login
            </button>

            <p className="text-link">Not a member yet? <Link to="/register">Register here</Link></p>
        </Form>
    )
}

export default LoginForm;
