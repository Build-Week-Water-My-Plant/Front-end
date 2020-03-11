import React, { useState } from "react";
import { Form } from './Styles';
import { Link } from "react-router-dom";
import axios from "axios";


const RegisterForm = props => {

    const { history, notify, toggleLoading } = props;

    const userSignUp = (newUser) =>{
        axios
            .post("https://api-watermyplants.herokuapp.com/auth/register", newUser)
            .then(res => {
                toggleLoading(false);
                history.push('/login')
            })
            .catch(error => notify('Unsuccessful! Try Again', 'error'));    
    } 

    const initialNewUser = {
        username: '',
        firstName: '',
        lastName:'',
        phoneNumber: '',
        password: ''
    }

    const [ newUser, setNewUser] = useState(initialNewUser);
    const { username, firstName, lastName, phoneNumber, password } = newUser;

    // Handler Functions
    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.id]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {    
        if(username && phoneNumber && password) {
            e.preventDefault();
            toggleLoading(true);
            userSignUp(newUser);
            setNewUser(initialNewUser);
        }
    }


    return (
        <Form autoComplete="off">
            <div className="form-header">
                <h1>Register</h1>
                <p>Become a Member</p>
            </div>

            <div className="form-inputs">
                <label htmlFor="username">Username</label>
                <input type='text' id="username" name='username' onChange={handleInputChange} value={username} placeholder='Username' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="firstName">First Name</label>
                <input type='text' id="firstName" name='firstName' onChange={handleInputChange} value={firstName} placeholder='First Name' required/>
            </div>
            <div className="form-inputs">
                <label htmlFor="lastName">Last Name</label>
                <input type='text' id="lastName" name='lastName' onChange={handleInputChange} value={lastName} placeholder='Last Name' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type='phoneNumber' id="phoneNumber" name='phoneNumber' onChange={handleInputChange} value={phoneNumber} placeholder='Phone Number' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="password">Password</label>
                <input type='password' id="password" name='password' onChange={handleInputChange} value={password} placeholder='Password' required/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                Register
            </button>

            <p className="text-link">Already a member, <Link to="/login">Login here</Link></p>
        </Form>
    )
}

export default RegisterForm;