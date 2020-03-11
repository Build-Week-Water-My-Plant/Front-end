import React, { useState } from "react";
import { Form } from './Styles';
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = props => {

    const { addCurrentUser, toggleAuthentication, addToken, notify, toggleLoading, history } = props

    const initialExistingUser = {
        "username": '',
        "password": ''
    }

    const [ existingUser, setExistingUser] = useState(initialExistingUser);
    const { username, password } = existingUser;
    const [userID, setUserID] = useState("")
    console.log(existingUser)


    const userLogIn = (user) => { 
        axios
            .post(
                "https://api-watermyplants.herokuapp.com/auth/login", existingUser
            )
            .then(res => { 
                addToken(res.data.access_token);
                console.log(res)
                localStorage.setItem("userID", res.data.user.id)
                console.log("current user id:",localStorage.getItem("userID"))
                toggleLoading(false); 
                toggleAuthentication();
                history.push('/');
            })
            .catch(err => { 
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
        if(username && password) {
            e.preventDefault();
            toggleLoading(true);
            addCurrentUser(username)

            userLogIn(existingUser);
            setExistingUser(initialExistingUser);
        }
    }
    
    return (
        <Form autoComplete="off">
            <div className="form-header">
                <h1>Login</h1>
                <p>Keep your plants alive</p>
            </div>

            <div className="form-inputs">
                <label htmlFor="username">Username</label>
                <input type='text' id="username" name='username' onChange={handleInputChange} value={username} placeholder='Username' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="password">Password</label>
                <input type='password' id="password" name='password' onChange={handleInputChange} value={password} placeholder='Password' required/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                <Link to="/">Login</Link>
            </button>

            <p className="text-link">Not a member yet? <Link to="/register">Register here</Link></p>
        </Form>
    )
}

export default LoginForm;