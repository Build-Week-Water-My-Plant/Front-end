import React from 'react';
import { Link } from "react-router-dom";
import { Onboarding } from './Styles';


const Login = props => {

  const { existingUser, handleInputChange, handleFormSubmit } = props;
  const { loginUsername, loginPassword } = existingUser;

  return (
    <Onboarding>
      <div className="hero-background"></div>

      <form autoComplete="off">
        <div className="form-header">
          <h1>Login</h1>
          <p>Keep your plants alive</p>
        </div>

        <div className="form-inputs">
          <label htmlFor="username">Username</label>
          <input type='text' id="loginUsername" name='username' onChange={(e) => handleInputChange(e, 'login')} value={loginUsername} placeholder='Username' required/>
        </div>

        <div className="form-inputs">
          <label htmlFor="password">Password</label>
          <input type='password' id="loginPassword" name='password' onChange={(e) => handleInputChange(e, 'login')} value={loginPassword} placeholder='Password' required/>
        </div>

        <button type='submit' onClick={(e) => handleFormSubmit(e, 'login')}>
          Login
        </button>

        <p className="text-link">Not a member yet? <Link to="/">Register here</Link></p>
      </form>
    </Onboarding>
  );
};

export default Login;